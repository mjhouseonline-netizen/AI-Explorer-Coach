
import React, { useState, useEffect, useMemo } from 'react';
import { Track, Mission, Message, AppState, Profile } from './types';
import { TRACKS, MISSIONS_KIDS, MISSIONS_ADULTS, SYSTEM_INSTRUCTION_KIDS, SYSTEM_INSTRUCTION_ADULTS } from './constants';
import { startNewChatSession, sendMessageStreamToGemini, resumeChatSession } from './services/geminiService';
import { TrackCard } from './components/TrackCard';
import { MissionSelector } from './components/MissionSelector';
import { ChatInterface } from './components/ChatInterface';
import { Confetti } from './components/Confetti';
import { AchievementsModal } from './components/AchievementsModal';
import { AdminPortal } from './components/AdminPortal';
import { NotificationContainer, Notification, NotificationType } from './components/Notification';
import { playSound } from './utils/audio';
import { Brain, Trophy, User, Users, ChevronLeft, Plus, UserCircle, Trash2, Play, LogOut, Settings, ShieldCheck, Mail, Flame, Star, Zap } from 'lucide-react';

const COLORS = ['bg-indigo-500', 'bg-emerald-500', 'bg-rose-500', 'bg-amber-500', 'bg-cyan-500', 'bg-violet-500'];
const ADMIN_EMAIL = 'bubblesfox@gmail.com';
const XP_PER_LEVEL = 500;

const App: React.FC = () => {
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
          chatHistory: [],
          xp: 0,
          level: 1,
          streak: 0,
          totalMessagesSent: 0
        }],
        currentProfileId: defaultId,
        isChatLoading: false,
        userApiKey: null // API_KEY handled via process.env exclusively
      };
    } catch (e) {
      return { profiles: [], currentProfileId: '', isChatLoading: false, userApiKey: null };
    }
  });

  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAdminPortal, setShowAdminPortal] = useState(false);
  const [isDashboardVisible, setIsDashboardVisible] = useState(true);
  const [newProfileName, setNewProfileName] = useState('');
  const [newProfileEmail, setNewProfileEmail] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  useEffect(() => {
    localStorage.setItem('ai_explorer_v2', JSON.stringify(state));
  }, [state]);

  const currentProfile = useMemo(() => 
    state.profiles.find(p => p.id === state.currentProfileId) || state.profiles[0]
  , [state.profiles, state.currentProfileId]);

  const isAdmin = currentProfile.email === ADMIN_EMAIL;
  const activeMissions = currentProfile.audience === 'kids' ? MISSIONS_KIDS : MISSIONS_ADULTS;
  const currentMission = activeMissions.find(m => m.id === currentProfile.currentMissionId) || null;

  // --- STREAK LOGIC ---
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (currentProfile.lastActiveDate !== today) {
      const last = currentProfile.lastActiveDate ? new Date(currentProfile.lastActiveDate) : null;
      const now = new Date(today);
      const diff = last ? (now.getTime() - last.getTime()) / (1000 * 3600 * 24) : null;
      
      let newStreak = currentProfile.streak;
      if (diff === 1) {
        newStreak += 1;
        addNotification('info', `Streak continued! Day ${newStreak} 🔥`);
      } else if (diff === null || diff > 1) {
        newStreak = 1;
        addNotification('info', "New streak started! Keep it up. 🔥");
      }
      
      updateCurrentProfile({ lastActiveDate: today, streak: newStreak });
    }
  }, [state.currentProfileId]);

  useEffect(() => {
    // Resume session if mission is active
    if (currentMission && currentProfile.chatHistory.length > 0) {
      const inst = currentProfile.audience === 'kids' ? SYSTEM_INSTRUCTION_KIDS : SYSTEM_INSTRUCTION_ADULTS;
      resumeChatSession(currentProfile.chatHistory, inst);
    }
  }, [state.currentProfileId]);

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

  const handleCreateProfile = () => {
    if (!newProfileName.trim()) return;
    const newId = Date.now().toString();
    const newProf: Profile = {
      id: newId,
      name: newProfileName,
      email: newProfileEmail.trim().toLowerCase(),
      avatarColor: COLORS[state.profiles.length % COLORS.length],
      completedMissions: [],
      audience: 'kids',
      currentMissionId: null,
      chatHistory: [],
      xp: 0,
      level: 1,
      streak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      totalMessagesSent: 0
    };
    setState(prev => ({
      ...prev,
      profiles: [...prev.profiles, newProf],
      currentProfileId: newId
    }));
    setNewProfileName('');
    setNewProfileEmail('');
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
    const newXp = currentProfile.xp + 5; // Curiosity bonus
    updateCurrentProfile({ 
      chatHistory: newHistory, 
      xp: newXp, 
      totalMessagesSent: currentProfile.totalMessagesSent + 1 
    });
    
    // Check level up from interaction
    if (Math.floor(newXp / XP_PER_LEVEL) + 1 > currentProfile.level) {
      updateCurrentProfile({ level: Math.floor(newXp / XP_PER_LEVEL) + 1 });
      addNotification('success', "Level Up! Your curiosity is growing.");
    }

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
    
    const xpReward = currentMission.level * 100;
    const mid = currentMission.id;
    const isFirstTime = !currentProfile.completedMissions.includes(mid);
    const newXp = currentProfile.xp + (isFirstTime ? xpReward : 10);
    const newLevel = Math.floor(newXp / XP_PER_LEVEL) + 1;

    updateCurrentProfile({
      completedMissions: isFirstTime ? [...currentProfile.completedMissions, mid] : currentProfile.completedMissions,
      currentMissionId: null,
      chatHistory: [],
      xp: newXp,
      level: newLevel
    });

    if (newLevel > currentProfile.level) {
      addNotification('success', `BOOM! Level ${newLevel} unlocked! 🚀`);
    }

    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
    setIsDashboardVisible(true);
    addNotification('success', `Mission Complete! +${xpReward} XP Earned.`);
  };

  const quitMission = () => {
    if (window.confirm("Abandon this mission? Progress will be saved locally.")) {
      updateCurrentProfile({ currentMissionId: null });
      setIsDashboardVisible(true);
    }
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

  const levelProgress = (currentProfile.xp % XP_PER_LEVEL) / XP_PER_LEVEL * 100;

  return (
    <div className="min-h-screen bg-slate-900 overflow-hidden h-full flex flex-col text-slate-100 selection:bg-cyan-500/30">
      <NotificationContainer notifications={notifications} onDismiss={removeNotification} />
      {showConfetti && <Confetti />}

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
                      <div className="text-[10px] opacity-70 uppercase font-bold tracking-tighter truncate max-w-full">Level {p.level || 1} • {p.email || `${p.audience} mode`}</div>
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
            
            <div className="space-y-3 bg-slate-800/40 p-4 rounded-2xl border border-slate-700">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Create Explorer</p>
              <div className="flex gap-2">
                <div className="p-2 bg-slate-900 rounded-lg text-slate-400"><User className="w-4 h-4" /></div>
                <input 
                  type="text" 
                  value={newProfileName} 
                  onChange={e => setNewProfileName(e.target.value)} 
                  placeholder="Explorer Name"
                  className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                <div className="p-2 bg-slate-900 rounded-lg text-slate-400"><Mail className="w-4 h-4" /></div>
                <input 
                  type="email" 
                  value={newProfileEmail} 
                  onChange={e => setNewProfileEmail(e.target.value)} 
                  placeholder="Email (Optional)"
                  className="flex-1 bg-slate-900/50 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              <button onClick={handleCreateProfile} className="w-full bg-indigo-600 hover:bg-indigo-500 py-2 rounded-xl text-white font-bold transition-all flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Add Explorer
              </button>
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
            <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 lg:mb-12">
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
              
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto items-stretch sm:items-center">
                {/* Gamification Bar */}
                <div className="flex items-center gap-4 bg-slate-800/50 px-4 py-2.5 rounded-2xl border border-slate-700/50 backdrop-blur-sm shadow-inner">
                   <div className="flex flex-col gap-1 min-w-[120px]">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <span>Level {currentProfile.level}</span>
                        <span className="text-cyan-400">{Math.floor(levelProgress)}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700/30">
                        <div 
                          className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.3)] transition-all duration-1000 ease-out" 
                          style={{ width: `${levelProgress}%` }} 
                        />
                      </div>
                   </div>
                   <div className="w-px h-8 bg-slate-700/50" />
                   <div className="flex items-center gap-2 group cursor-help" title="Daily Streak">
                      <div className="relative">
                        <Flame className={`w-5 h-5 ${currentProfile.streak > 0 ? 'text-orange-500 animate-pulse' : 'text-slate-600'}`} />
                        {currentProfile.streak > 0 && <div className="absolute inset-0 bg-orange-500/20 blur-lg rounded-full animate-ping" />}
                      </div>
                      <span className="font-black text-sm text-slate-200">{currentProfile.streak}</span>
                   </div>
                   <div className="flex items-center gap-2 text-amber-400">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="font-black text-sm">{currentProfile.xp} XP</span>
                   </div>
                </div>

                <div className="flex gap-2 flex-1 sm:flex-none">
                  {isAdmin && (
                    <button 
                      onClick={() => setShowAdminPortal(true)}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-800/80 px-4 py-2.5 rounded-xl border border-indigo-500/30 hover:bg-indigo-900/30 transition-all text-indigo-400 group"
                    >
                      <ShieldCheck className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="font-bold text-sm hidden sm:inline">Admin</span>
                    </button>
                  )}
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
                  <button className="p-2.5 bg-slate-800 rounded-xl border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-700 transition-all" title="Settings">
                      <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </header>

            <div className="grid lg:grid-cols-12 gap-8 pb-12">
              <div className={`${selectedTrack ? 'hidden lg:block lg:col-span-4' : 'col-span-12 lg:col-span-4'} space-y-6`}>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold font-fredoka flex items-center gap-2">
                    <Zap className="w-5 h-5 text-cyan-400" /> Choose a Track
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
          profiles={state.profiles}
          currentProfileId={state.currentProfileId}
        />
      )}

      {showAdminPortal && (
        <AdminPortal 
          isOpen={true}
          onClose={() => setShowAdminPortal(false)}
          profiles={state.profiles}
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
