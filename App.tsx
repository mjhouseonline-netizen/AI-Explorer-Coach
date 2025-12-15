
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Track, Mission, Message, AppState, Audience } from './types';
import { TRACKS, MISSIONS_KIDS, MISSIONS_ADULTS, SYSTEM_INSTRUCTION_KIDS, SYSTEM_INSTRUCTION_ADULTS } from './constants';
import { initializeGemini, startNewChatSession, sendMessageToGemini, sendMessageStreamToGemini, resumeChatSession } from './services/geminiService';
import { TrackCard } from './components/TrackCard';
import { MissionSelector } from './components/MissionSelector';
import { ChatInterface } from './components/ChatInterface';
import { Confetti } from './components/Confetti';
import { AchievementsModal } from './components/AchievementsModal';
import { NotificationContainer, Notification, NotificationType } from './components/Notification';
import { playSound } from './utils/audio';
import { Brain, Sparkles, Key, Trophy, User, Users, Download, Upload, Volume2, VolumeX } from 'lucide-react';

// NOTE: In a real production app, you would handle API keys more securely or via a backend proxy.
// For this demo, we assume process.env.API_KEY is available or prompt the user if not.

const App: React.FC = () => {
  // Initialize state with lazy loading from localStorage
  const [state, setState] = useState<AppState>(() => {
    try {
      // 1. Try to load the full app state
      const savedState = localStorage.getItem('ai_explorer_state');
      // 2. Fallback to legacy key if needed
      const savedLegacyProgress = localStorage.getItem('completedMissions');

      if (savedState) {
        const parsed = JSON.parse(savedState);
        return {
          ...parsed,
          isChatLoading: false, // Always reset loading state on reload
          // Prioritize env key if available, otherwise use stored key
          userApiKey: process.env.API_KEY || parsed.userApiKey || null
        };
      }

      return {
        currentMission: null,
        chatHistory: [],
        missionStep: 'WARMUP',
        isChatLoading: false,
        userApiKey: process.env.API_KEY || null,
        completedMissions: savedLegacyProgress ? JSON.parse(savedLegacyProgress) : [],
        audience: 'kids'
      };
    } catch (e) {
      // Fallback if parsing fails
      return {
        currentMission: null,
        chatHistory: [],
        missionStep: 'WARMUP',
        isChatLoading: false,
        userApiKey: process.env.API_KEY || null,
        completedMissions: [],
        audience: 'kids'
      };
    }
  });

  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [showApiKeyModal, setShowApiKeyModal] = useState(!process.env.API_KEY && !state.userApiKey);
  const [tempApiKey, setTempApiKey] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Ref for file import
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Persist App State whenever it changes
  useEffect(() => {
    const stateToSave = {
      currentMission: state.currentMission,
      chatHistory: state.chatHistory,
      missionStep: state.missionStep,
      completedMissions: state.completedMissions,
      audience: state.audience,
      userApiKey: state.userApiKey
    };
    localStorage.setItem('ai_explorer_state', JSON.stringify(stateToSave));
  }, [state]);

  // Initialize Gemini and Resume Session
  useEffect(() => {
    if (state.userApiKey) {
      try {
        initializeGemini(state.userApiKey);
      } catch (e) {
        console.error("Failed to initialize AI", e);
      }

      // If we are reloading into an active mission, we need to reconnect the chat session
      if (state.currentMission && state.chatHistory.length > 0) {
        const systemInstruction = state.audience === 'kids' ? SYSTEM_INSTRUCTION_KIDS : SYSTEM_INSTRUCTION_ADULTS;
        try {
           resumeChatSession(state.chatHistory, systemInstruction);
        } catch (error) {
           console.error("Failed to resume session:", error);
           addNotification('error', "Could not restore previous chat session. You may need to restart the mission.");
        }
      }
    }
  }, [state.userApiKey]); // Run on mount or when API key is set

  // Notification Helper
  const addNotification = (type: NotificationType, message: string) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, type, message }]);
    if (soundEnabled && type === 'error') {
       // Optional: specific error sound? Using message sound for now
    }
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Derived state for current mission list
  const activeMissions = state.audience === 'kids' ? MISSIONS_KIDS : MISSIONS_ADULTS;

  // Memoized progress calculation for the dashboard
  const trackProgressMap = useMemo(() => {
    const stats: Record<string, { completed: number; total: number }> = {};
    
    // Initialize stats for all tracks
    TRACKS.forEach(track => {
      stats[track] = { completed: 0, total: 0 };
    });

    // Aggregate counts
    activeMissions.forEach(mission => {
      if (stats[mission.track]) {
        stats[mission.track].total += 1;
        if (state.completedMissions.includes(mission.id)) {
          stats[mission.track].completed += 1;
        }
      }
    });

    return stats;
  }, [activeMissions, state.completedMissions]);

  const handleApiKeySubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if(tempApiKey.trim().length > 10) {
          setState(prev => ({...prev, userApiKey: tempApiKey}));
          setShowApiKeyModal(false);
          addNotification('success', "API Key saved successfully!");
          if (soundEnabled) playSound('success');
      } else {
          addNotification('error', "Please enter a valid API key (usually starts with AIza...)");
      }
  };

  const toggleAudience = () => {
    setState(prev => ({
        ...prev,
        audience: prev.audience === 'kids' ? 'adults' : 'kids'
    }));
    setSelectedTrack(null);
    if (soundEnabled) playSound('click');
  };

  const handleTrackSelect = (track: Track) => {
    setSelectedTrack(track);
    if (soundEnabled) playSound('click');
  };

  const handleMissionSelect = async (mission: Mission) => {
    if (soundEnabled) playSound('success');
    setState(prev => ({ 
        ...prev, 
        currentMission: mission, 
        chatHistory: [], 
        isChatLoading: true 
    }));

    try {
      const missionContext = `
        TITLE: ${mission.title}
        TRACK: ${mission.track}
        LEVEL: ${mission.level}
        GOAL: ${mission.goal}
        ACTIVITY IDEA: ${mission.sample_activity_idea}
        TARGET AUDIENCE: ${state.audience.toUpperCase()}
      `;

      const systemInstruction = state.audience === 'kids' ? SYSTEM_INSTRUCTION_KIDS : SYSTEM_INSTRUCTION_ADULTS;
      
      // Pass the mission track so we can enable tools if needed
      const responseText = await startNewChatSession(missionContext, systemInstruction, mission.track);
      
      const initialMessage: Message = {
        id: Date.now().toString(),
        role: 'model',
        content: responseText,
        timestamp: Date.now()
      };

      setState(prev => ({
        ...prev,
        chatHistory: [initialMessage],
        isChatLoading: false
      }));

    } catch (error: any) {
      console.error("Failed to start mission", error);
      setState(prev => ({ ...prev, isChatLoading: false, currentMission: null })); // Reset to dashboard
      
      // Handle specific error types
      if (error.message.includes('API Key') || error.message.includes('403')) {
          addNotification('error', "Authentication failed. Please check your API Key.");
          setShowApiKeyModal(true); // Recovery option: Open modal
      } else {
          addNotification('error', error.message || "Failed to start mission. Please try again.");
      }
    }
  };

  const handleSendMessage = async (text: string) => {
    if (soundEnabled) playSound('message');
    // 1. Add user message optimistically
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: Date.now()
    };
    
    // 2. Add placeholder for AI message
    const botMsgId = (Date.now() + 1).toString();
    const botMsg: Message = {
      id: botMsgId,
      role: 'model',
      content: '', // Empty content to start
      timestamp: Date.now() + 1
    };

    setState(prev => ({
      ...prev,
      chatHistory: [...prev.chatHistory, userMsg, botMsg],
      isChatLoading: true
    }));

    try {
      // 3. Start stream
      const stream = sendMessageStreamToGemini(text);
      let fullContent = '';

      for await (const chunk of stream) {
        fullContent += chunk;
        
        // 4. Update the bot message with accumulated content
        setState(prev => ({
          ...prev,
          chatHistory: prev.chatHistory.map(msg => 
            msg.id === botMsgId ? { ...msg, content: fullContent } : msg
          )
        }));
      }

    } catch (err) {
      console.error("Stream failed", err);
      // Ensure the user sees the error in the chat bubble if the stream crashes entirely
      setState(prev => ({
          ...prev,
          chatHistory: prev.chatHistory.map(msg => 
            msg.id === botMsgId ? { ...msg, content: "**Error**: Failed to receive response. Please try again." } : msg
          )
      }));
      addNotification('error', "Lost connection during generation.");
    } finally {
      setState(prev => ({ ...prev, isChatLoading: false }));
    }
  };

  const endSession = () => {
    if (window.confirm("Are you sure you want to exit? Progress for this session won't be saved unless you mark it as complete.")) {
        setState(prev => ({
            ...prev,
            currentMission: null,
            chatHistory: [],
            missionStep: 'WARMUP'
        }));
        setSelectedTrack(null);
        if (soundEnabled) playSound('click');
    }
  };

  const completeMission = () => {
    if (!state.currentMission) return;
    
    if (soundEnabled) playSound('complete');

    // Add to completed list if not already there
    const missionId = state.currentMission.id;
    setState(prev => ({
        ...prev,
        completedMissions: prev.completedMissions.includes(missionId) 
            ? prev.completedMissions 
            : [...prev.completedMissions, missionId],
        currentMission: null,
        chatHistory: [],
        missionStep: 'WARMUP'
    }));

    // Trigger confetti
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
    addNotification('success', `Mission Complete: ${state.currentMission.title}`);
  };

  // --- SAVE / LOAD HANDLERS ---
  const handleSaveProgress = () => {
    const { userApiKey, isChatLoading, ...dataToSave } = state;
    const blob = new Blob([JSON.stringify(dataToSave, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-explorer-save-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addNotification('success', "Progress saved to file.");
    if (soundEnabled) playSound('success');
  };

  const handleLoadProgress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const loadedState = JSON.parse(content);
        
        if (!Array.isArray(loadedState.completedMissions)) {
          throw new Error("Invalid save file format");
        }

        if (window.confirm("This will overwrite your current progress. Are you sure?")) {
            if (state.userApiKey && loadedState.currentMission && loadedState.chatHistory?.length > 0) {
                 const systemInstruction = loadedState.audience === 'kids' ? SYSTEM_INSTRUCTION_KIDS : SYSTEM_INSTRUCTION_ADULTS;
                 try {
                     initializeGemini(state.userApiKey);
                     resumeChatSession(loadedState.chatHistory, systemInstruction);
                 } catch (err) {
                     console.error("Could not resume chat session from load", err);
                 }
            }

            setState(prev => ({
              ...prev,
              ...loadedState,
              userApiKey: prev.userApiKey, 
              isChatLoading: false
            }));
            if (soundEnabled) playSound('complete');
            addNotification('success', "Progress loaded successfully!");
        }
      } catch (err) {
        console.error(err);
        addNotification('error', "Failed to load progress file. It might be corrupted.");
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  // --- GLOBAL KEYBOARD SHORTCUTS ---
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Save: Ctrl+S or Cmd+S
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleSaveProgress();
      }
      
      // Load: Ctrl+L or Cmd+L
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        fileInputRef.current?.click();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state, soundEnabled]); // Depend on state to ensure save handler has latest data

  // --- RENDER ---
  
  // Render the Modal on top of everything
  const renderApiKeyModal = () => (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/90 backdrop-blur-sm p-4">
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 max-w-md w-full shadow-2xl animate-fadeIn">
            <div className="flex justify-center mb-6">
                <div className="bg-cyan-500/20 p-4 rounded-full">
                  <Key className="w-10 h-10 text-cyan-400" />
                </div>
            </div>
            <h1 className="text-2xl font-bold text-white text-center mb-2 font-fredoka">Enter API Key</h1>
            <p className="text-slate-400 text-center mb-6 text-sm">
                To start the AI Explorer Coach, please provide a valid Google Gemini API Key.
            </p>
            <form onSubmit={handleApiKeySubmit} className="space-y-4">
                <input 
                  type="password" 
                  value={tempApiKey}
                  onChange={(e) => setTempApiKey(e.target.value)}
                  placeholder="AIza..."
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                />
                <button 
                  type="submit" 
                  disabled={tempApiKey.length < 10}
                  className="w-full bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50"
                >
                    Unlock Coach
                </button>
            </form>
            {/* Close button only if we have a key already (e.g. changing key) */}
            {state.userApiKey && (
               <button 
                 onClick={() => setShowApiKeyModal(false)}
                 className="w-full mt-3 text-slate-400 hover:text-white text-sm"
               >
                 Cancel
               </button>
            )}
            <p className="text-xs text-slate-500 text-center mt-4">
                The key is stored only in your browser's memory for this session.
            </p>
        </div>
    </div>
  );

  // Active Mission View
  if (state.currentMission) {
    return (
      <>
        {showApiKeyModal && renderApiKeyModal()}
        <NotificationContainer notifications={notifications} onDismiss={removeNotification} />
        <ChatInterface 
          mission={state.currentMission}
          history={state.chatHistory}
          isLoading={state.isChatLoading}
          onSendMessage={handleSendMessage}
          onEndSession={endSession}
          onCompleteMission={completeMission}
        />
      </>
    );
  }

  // Dashboard / Selection View
  return (
    <div className="min-h-screen bg-slate-900 p-6 md:p-12 overflow-y-auto relative">
      <NotificationContainer notifications={notifications} onDismiss={removeNotification} />
      {showApiKeyModal && renderApiKeyModal()}
      {showConfetti && <Confetti />}
      <AchievementsModal 
        isOpen={showAchievements} 
        onClose={() => setShowAchievements(false)} 
        completedMissions={state.completedMissions}
        allMissions={activeMissions}
      />
      
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className={`
              p-3 rounded-xl shadow-lg transition-all duration-500
              ${state.audience === 'kids' ? 'bg-gradient-to-br from-indigo-500 to-cyan-500' : 'bg-gradient-to-br from-slate-600 to-slate-800 border border-slate-600'}
            `}>
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white font-fredoka tracking-wide">
                {state.audience === 'kids' ? 'AI Explorer Coach' : 'AI Pro Coach'}
              </h1>
              <p className="text-slate-400 font-nunito mt-1">
                {state.audience === 'kids' 
                  ? 'Your friendly guide to the world of Artificial Intelligence.'
                  : 'Practical GenAI skills for Teens & Adults.'
                }
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 items-center">
             
             {/* Save/Load Controls */}
             <div className="flex items-center gap-2">
                <button 
                  onClick={handleSaveProgress}
                  className="flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-white bg-slate-800 rounded-lg border border-slate-700 transition-colors text-sm font-medium"
                  title="Save Progress to JSON File (Ctrl+S)"
                >
                  <Download className="w-4 h-4" /> Save
                </button>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-white bg-slate-800 rounded-lg border border-slate-700 transition-colors text-sm font-medium"
                  title="Load Progress from JSON File (Ctrl+L)"
                >
                  <Upload className="w-4 h-4" /> Load
                </button>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept=".json" 
                    onChange={handleLoadProgress} 
                />
             </div>

             {/* Sound Toggle */}
             <button
               onClick={() => setSoundEnabled(!soundEnabled)}
               className="p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
               title={soundEnabled ? "Mute Sounds" : "Enable Sounds"}
             >
               {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
             </button>

             {/* Audience Toggle */}
            <div className="bg-slate-800 p-1 rounded-lg flex items-center border border-slate-700">
                <button
                    onClick={() => state.audience !== 'kids' && toggleAudience()}
                    className={`
                        flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-semibold transition-all
                        ${state.audience === 'kids' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}
                    `}
                >
                    <User className="w-3 h-3" /> Kids
                </button>
                <button
                    onClick={() => state.audience !== 'adults' && toggleAudience()}
                    className={`
                        flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-semibold transition-all
                        ${state.audience === 'adults' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'}
                    `}
                >
                    <Users className="w-3 h-3" /> Adults
                </button>
            </div>

            <button 
               onClick={() => {
                 setShowAchievements(true);
                 if (soundEnabled) playSound('click');
               }}
               className="flex items-center gap-2 bg-slate-800/50 hover:bg-slate-700/50 transition-colors px-4 py-2 rounded-full border border-slate-700 ml-2"
            >
               <Trophy className="w-4 h-4 text-yellow-400" />
               <span className="text-slate-300 text-sm font-semibold">
                 {state.completedMissions.filter(id => activeMissions.some(m => m.id === id)).length} Done
               </span>
            </button>
            
            {/* Settings / Key Reset */}
            <button 
              onClick={() => setShowApiKeyModal(true)}
              className="p-2 text-slate-500 hover:text-slate-300 transition-colors"
              title="Change API Key"
            >
              <Key className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left: Tracks Grid */}
          <div className={`lg:col-span-${selectedTrack ? '1' : '3'} transition-all duration-500`}>
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-200 font-fredoka">
                   {selectedTrack ? 'Tracks' : 'Choose a Track'}
                </h2>
                {selectedTrack && (
                   <button 
                     onClick={() => {
                       setSelectedTrack(null);
                       if (soundEnabled) playSound('click');
                     }}
                     className="text-xs text-slate-400 hover:text-white underline"
                   >
                     Show all
                   </button>
                )}
             </div>
             
             <div className={`grid gap-4 ${selectedTrack ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                {TRACKS.map(track => {
                  const stats = trackProgressMap[track] || { completed: 0, total: 0 };
                  return (
                    <TrackCard 
                      key={track} 
                      track={track} 
                      onClick={handleTrackSelect}
                      isSelected={selectedTrack === track}
                      completedCount={stats.completed}
                      totalCount={stats.total}
                    />
                  );
                })}
             </div>
          </div>

          {/* Right: Mission Selector (Only visible when track selected) */}
          {selectedTrack && (
            <div className="lg:col-span-2 animate-slideIn">
               <MissionSelector 
                 selectedTrack={selectedTrack} 
                 missions={activeMissions}
                 onSelectMission={handleMissionSelect}
                 completedMissionIds={state.completedMissions}
               />
            </div>
          )}
          
        </div>

      </div>
    </div>
  );
};

export default App;
