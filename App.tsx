
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Track, Mission, Message, AppState, Profile, Audience } from './types';
import { TRACKS, MISSIONS_KIDS, MISSIONS_ADULTS, SYSTEM_INSTRUCTION_KIDS, SYSTEM_INSTRUCTION_ADULTS } from './constants';
import { initializeGemini, startNewChatSession, sendMessageStreamToGemini, resumeChatSession } from './services/geminiService';
import { TrackCard } from './components/TrackCard';
import { MissionSelector } from './components/MissionSelector';
import { ChatInterface } from './components/ChatInterface';
import { Confetti } from './components/Confetti';
import { AchievementsModal } from './components/AchievementsModal';
import { NotificationContainer, Notification, NotificationType } from './components/Notification';
import { playSound } from './utils/audio';
import { Brain, Key, Trophy, User, Users, ChevronLeft, Plus, UserCircle, Trash2, Play, LogOut, Settings } from 'lucide-react';

const COLORS = ['bg-indigo-500', 'bg-emerald-500', 'bg-rose-500', 'bg-amber-500', 'bg-cyan-500', 'bg-violet-500'];

const App: React.FC = () => {
  // --- STATE INITIALIZATION ---
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem('ai_explorer_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...parsed, isChatLoading: false };
      }
      const defaultId = Date.now().toString();
      return {
        profiles: [{
          id: defaultId,
          name: 'Explorer 1',
          avatarColor: COLORS[0],
          completedMissions: [],
          audience: 'kids',
          currentMissionId: null,
          chatHistory: []
        }],
        currentProfileId: defaultId,
        isChatLoading: false,
        userApiKey: process.env.API_KEY || null
      };
    } catch (e) {
      return { profiles: [], currentProfileId: '', isChatLoading: false, userApiKey: null };
    }
  });

  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [showApiKeyModal, setShowApiKeyModal] = useState(!state.userApiKey);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isDashboardVisible, setIsDashboardVisible] = useState(true);
  const [tempApiKey, setTempApiKey] = useState('');
  const [newProfileName, setNewProfileName] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // --- PERSISTENCE ---
  useEffect(() => {
    localStorage.setItem('ai_explorer_v2', JSON.stringify(state));
  }, [state]);

  // --- DERIVED DATA ---
  const currentProfile = useMemo(() => 
    state.profiles.find(p => p.id === state.currentProfileId) || state.profiles[0]
  , [state.profiles, state.currentProfileId]);

  const activeMissions = currentProfile.audience === 'kids' ? MISSIONS_KIDS : MISSIONS_ADULTS;
  const currentMission = activeMissions.find(m => m.id === currentProfile.currentMissionId) || null;

  // --- AI INITIALIZATION ---
  useEffect(() => {
    if (state.userApiKey) {
      initializeGemini(state.userApiKey);
      if (currentMission && currentProfile.chatHistory.length > 0) {
        const inst = currentProfile.audience === 'kids' ? SYSTEM_INSTRUCTION_KIDS : SYSTEM_INSTRUCTION_ADULTS;
        resumeChatSession(currentProfile.chatHistory, inst);
      }
    }
  }, [state.userApiKey, state.currentProfileId]);

  // --- HELPERS ---
  const addNotification = (type: NotificationType, message: string) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, type, message }]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const updateCurrentProfile = (updates: Partial<Profile>) => {
    setState(prev => ({
      ...prev,
      profiles: prev.profiles.map(p => p.id === prev.currentProfileId ? { ...p, ...updates } : p)
    }));
  };

  const trackProgressMap = useMemo(() => {
    const stats: Record<string, { completed: number; total: number }> = {};
    TRACKS.forEach(t => stats[t] = { completed: 0, total: 0 });
    activeMissions.forEach(m => {
      stats[m.track].total += 1;
      if (currentProfile.completedMissions.includes(m.id)) stats[m.track].completed += 1;
    });
    return stats;
  }, [activeMissions, currentProfile.completedMissions]);

  // --- HANDLERS ---
  const handleCreateProfile = () => {
    if (!newProfileName.trim()) return;
    const newId = Date.now().toString();
    const newProf: Profile = {
      id: newId,
      name: newProfileName,
      avatarColor: COLORS[state.profiles.length % COLORS.length],
      completedMissions: [],
      audience: 'kids',
      currentMissionId: null,
      chatHistory: []
    };
    setState(prev => ({
      ...prev,
      profiles: [...prev.profiles, newProf],
      currentProfileId: newId
    }));
    setNewProfileName('');
    setShowProfileModal(false);
    setIsDashboardVisible(true);
    addNotification('success', `Welcome, ${newProf.name}!`);
  };

  const handleMissionSelect = async (mission: Mission) => {
    if (soundEnabled) playSound('success');
    updateCurrentProfile({ currentMissionId: mission.id, chatHistory: [] });
    setState(prev => ({ ...prev, isChatLoading: true }));
    setIsDashboardVisible(false);

    try {
      const missionContext = `TITLE: ${mission.title}\nGOAL: ${mission.goal}\nAUDIENCE: ${currentProfile.audience.toUpperCase()}`;
      const inst = currentProfile.audience === 'kids' ? SYSTEM_INSTRUCTION_KIDS : SYSTEM_INSTRUCTION_ADULTS;
      const resp = await startNewChatSession(missionContext, inst, mission.track);
      
      const initMsg: Message = { id: Date.now().toString(), role: 'model', content: resp, timestamp: Date.now() };
      updateCurrentProfile({ chatHistory: [initMsg] });
    } catch (e: any) {
      addNotification('error', e.message);
      updateCurrentProfile({ currentMissionId: null });
      setIsDashboardVisible(true);
    } finally {
      setState(prev => ({ ...prev, isChatLoading: false }));
    }
  };

  const handleSendMessage = async (text: string) => {
    if (soundEnabled) playSound('message');
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, timestamp: Date.now() };
    const botId = (Date.now() + 1).toString();
    const botMsg: Message = { id: botId, role: 'model', content: '', timestamp: Date.now() + 1 };

    const newHistory = [...currentProfile.chatHistory, userMsg, botMsg];
    updateCurrentProfile({ chatHistory: newHistory });
    setState(prev => ({ ...prev, isChatLoading: true }));

    try {
      const stream = sendMessageStreamToGemini(text);
      let full = '';
      for await (const chunk of stream) {
        full += chunk;
        setState(prev => ({
          ...prev,
          profiles: prev.profiles.map(p => p.id === prev.currentProfileId ? {
            ...p,
            chatHistory: p.chatHistory.map(m => m.id === botId ? { ...m, content: full } : m)
          } : p)
        }));
      }
    } catch (err) {
      addNotification('error', "Lost connection. Please try again.");
    } finally {
      setState(prev => ({ ...prev, isChatLoading: false }));
    }
  };

  const completeMission = () => {
    if (!currentMission) return;
    if (soundEnabled) playSound('complete');
    const mid = currentMission.id;
    updateCurrentProfile({
      completedMissions: currentProfile.completedMissions.includes(mid) ? currentProfile.completedMissions : [...currentProfile.completedMissions, mid],
      currentMissionId: null,
      chatHistory: []
    });
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
    setIsDashboardVisible(true);
    addNotification('success', "Mission Accomplished! Badge earned.");
  };

  const quitMission = () => {
    if (window.confirm("Abandon this mission? Your current conversation will be cleared.")) {
      updateCurrentProfile({ currentMissionId: null, chatHistory: [] });
      setIsDashboardVisible(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 overflow-hidden h-full flex flex-col text-slate-100 selection:bg-cyan-500/30">
      <NotificationContainer notifications={notifications} onDismiss={removeNotification} />
      {showConfetti && <Confetti />}
      
      {/* API Key Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 z-[200] bg-slate-900/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-800 p-6 md:p-8 rounded-2xl border border-slate-700 max-w-md w-full shadow-2xl">
            <Key className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-center mb-2 font-fredoka">Connect to Gemini</h2>
            <p className="text-slate-400 text-sm text-center mb-6">Enter your API Key to enable the AI Coach.</p>
            <input 
              type="password" 
              value={tempApiKey} 
              onChange={e => setTempApiKey(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mb-4 text-white focus:ring-2 focus:ring-cyan-500 transition-all outline-none"
              placeholder="AIza..."
            />
            <button 
              onClick={() => { setState(s => ({...s, userApiKey: tempApiKey})); setShowApiKeyModal(false); }}
              className="w-full bg-cyan-600 hover:bg-cyan-500 py-3 rounded-lg font-bold transition-all transform active:scale-[0.98]"
            >Let's Explore!</button>
          </div>
        </div>
      )}

      {/* Profile Switcher Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-[150] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4 font-fredoka flex items-center gap-2">
              <UserCircle className="w-6 h-6 text-indigo-400" /> Choose Explorer
            </h2>
            <div className="flex-1 space-y-2 mb-6 overflow-y-auto pr-1 scrollbar-hide">
              {state.profiles.map(p => (
                <div key={p.id} className="flex items-center gap-2 group">
                  <button 
                    onClick={() => { setState(s => ({...s, currentProfileId: p.id})); setShowProfileModal(false); }}
                    className={`flex-1 flex items-center gap-3 p-3 rounded-xl transition-all border ${p.id === state.currentProfileId ? 'bg-indigo-600 border-indigo-400 shadow-lg shadow-indigo-900/20' : 'bg-slate-800 border-slate-700 hover:bg-slate-700'}`}
                  >
                    <div className={`w-10 h-10 rounded-full ${p.avatarColor} flex items-center justify-center font-bold text-white shadow-inner shrink-0`}>{p.name[0]}</div>
                    <div className="text-left overflow-hidden">
                      <div className="font-bold truncate text-sm md:text-base">{p.name}</div>
                      <div className="text-[10px] opacity-70 uppercase font-bold tracking-tighter">{p.audience} mode</div>
                    </div>
                  </button>
                  {state.profiles.length > 1 && (
                    <button 
                      onClick={() => {
                        if(window.confirm(`Delete ${p.name}'s profile?`)) {
                          setState(s => {
                            const remaining = s.profiles.filter(prof => prof.id !== p.id);
                            return { ...s, profiles: remaining, currentProfileId: s.currentProfileId === p.id ? remaining[0].id : s.currentProfileId };
                          });
                        }
                      }} 
                      className="p-3 text-slate-500 hover:text-red-400 transition-colors shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={newProfileName} 
                onChange={e => setNewProfileName(e.target.value)} 
                placeholder="New Name"
                className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <button onClick={handleCreateProfile} className="bg-indigo-600 hover:bg-indigo-500 p-2 rounded-lg text-white transition-colors"><Plus className="w-5 h-5" /></button>
            </div>
            <button onClick={() => setShowProfileModal(false)} className="w-full mt-4 py-2 text-slate-500 hover:text-slate-300 text-sm font-medium">Close</button>
          </div>
        </div>
      )}

      {!isDashboardVisible && currentMission ? (
        <ChatInterface 
          mission={currentMission} 
          history={currentProfile.chatHistory} 
          isLoading={state.isChatLoading} 
          onSendMessage={handleSendMessage} 
          onEndSession={() => setIsDashboardVisible(true)} 
          onCompleteMission={completeMission}
        />
      ) : (
        <div className="flex-1 overflow-y-auto w-full scroll-smooth">
          <div className="max-w-6xl mx-auto p-4 md:p-8">
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 lg:mb-12">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 shadow-xl shadow-indigo-900/20`}>
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold font-fredoka tracking-tight">AI Explorer Coach</h1>
                  <div className="flex items-center gap-2 mt-1.5">
                    <button onClick={() => setShowProfileModal(true)} className="flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full text-xs hover:bg-slate-700 transition-all border border-slate-700 group ring-offset-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none">
                      <div className={`w-3 h-3 rounded-full ${currentProfile.avatarColor} shadow-inner`} />
                      <span className="font-bold text-slate-300 group-hover:text-white transition-colors">{currentProfile.name}</span>
                      <ChevronLeft className="w-3 h-3 -rotate-90 opacity-40 group-hover:opacity-100 transition-opacity" />
                    </button>
                    <span className="text-slate-800 text-xs">|</span>
                    <button 
                      onClick={() => updateCurrentProfile({ audience: currentProfile.audience === 'kids' ? 'adults' : 'kids' })}
                      className="text-[11px] uppercase tracking-wider text-indigo-400 hover:text-indigo-300 font-extrabold transition-colors px-1"
                    >
                      {currentProfile.audience === 'kids' ? 'Pro Mode' : 'Kids Mode'}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto items-center">
                {currentMission && (
                  <button 
                    onClick={() => setIsDashboardVisible(false)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-indigo-600 px-5 py-2.5 rounded-xl border border-indigo-500 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-900/40 active:scale-[0.98]"
                  >
                    <Play className="w-4 h-4 text-white fill-current" />
                    <span className="font-bold text-sm">Resume</span>
                  </button>
                )}
                <button onClick={() => setShowAchievements(true)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-800 px-4 py-2.5 rounded-xl border border-slate-700 hover:bg-slate-700 transition-all active:scale-[0.98]">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span className="font-bold text-sm">Badges</span>
                </button>
                <button onClick={() => setShowApiKeyModal(true)} className="p-2.5 bg-slate-800 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-all" title="Settings">
                    <Settings className="w-5 h-5" />
                </button>
              </div>
            </header>

            <div className="grid lg:grid-cols-12 gap-8 pb-12">
              <div className={`${selectedTrack ? 'hidden lg:block lg:col-span-4' : 'col-span-12 lg:col-span-4'} space-y-6`}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold font-fredoka flex items-center gap-2">
                    <Users className="w-5 h-5 text-cyan-400" /> Choose a Track
                    </h2>
                </div>
                <div className={`grid gap-4 ${selectedTrack ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-1'}`}>
                  {TRACKS.map(t => (
                    <TrackCard 
                      key={t} 
                      track={t} 
                      onClick={setSelectedTrack} 
                      isSelected={selectedTrack === t} 
                      completedCount={trackProgressMap[t].completed} 
                      totalCount={trackProgressMap[t].total} 
                    />
                  ))}
                </div>
              </div>
              
              <div className={`${selectedTrack ? 'col-span-12 lg:col-span-8' : 'hidden lg:flex lg:col-span-8'} animate-fadeIn flex flex-col`}>
                {selectedTrack ? (
                  <>
                    <button onClick={() => setSelectedTrack(null)} className="lg:hidden flex items-center gap-2 text-slate-400 mb-6 hover:text-white transition-colors group">
                      <div className="bg-slate-800 p-2 rounded-lg group-hover:bg-slate-700 transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                      </div>
                      <span className="font-bold">Back to Tracks</span>
                    </button>
                    
                    {currentMission && currentMission.track === selectedTrack && (
                       <div className="mb-6 p-5 bg-indigo-600/10 border border-indigo-500/30 rounded-2xl flex items-center justify-between shadow-inner">
                          <div className="min-w-0 pr-4">
                            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">In Progress</p>
                            <h4 className="text-white font-bold truncate text-sm md:text-base">{currentMission.title}</h4>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button 
                              onClick={() => setIsDashboardVisible(false)}
                              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
                            >Resume</button>
                            <button 
                              onClick={quitMission}
                              className="bg-slate-800 hover:bg-red-500/20 text-slate-500 hover:text-red-400 p-2 rounded-xl transition-all"
                              title="Quit Mission"
                            ><LogOut className="w-4 h-4" /></button>
                          </div>
                       </div>
                    )}

                    <MissionSelector 
                      selectedTrack={selectedTrack} 
                      missions={activeMissions} 
                      onSelectMission={handleMissionSelect} 
                      completedMissionIds={currentProfile.completedMissions} 
                    />
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-800 rounded-[2.5rem] bg-slate-900/50">
                     <div className="p-6 bg-slate-800 rounded-full mb-6 opacity-40">
                        <RocketIcon className="w-16 h-16 text-slate-600" />
                     </div>
                     <h3 className="text-xl font-fredoka text-slate-400 mb-2">Ready for Lift Off?</h3>
                     <p className="text-sm text-slate-600 max-w-xs">Select an AI learning track on the left to begin your guided exploration.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showAchievements && (
        <AchievementsModal 
          isOpen={true} 
          onClose={() => setShowAchievements(false)} 
          completedMissions={currentProfile.completedMissions} 
          allMissions={activeMissions} 
        />
      )}
    </div>
  );
};

const RocketIcon = ({className}: {className?: string}) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export default App;
