
import React, { useState } from 'react';
import { Track, Profile } from '../types';
import { Award, Lock, X, Users, Flame, Star, Crown } from 'lucide-react';
import { TRACKS } from '../constants';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedMissions: string[];
  allMissions: { id: string; track: Track }[];
  profiles: Profile[];
  currentProfileId: string;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({ isOpen, onClose, completedMissions, allMissions, profiles, currentProfileId }) => {
  const [activeTab, setActiveTab] = useState<'badges' | 'leaderboard'>('badges');
  if (!isOpen) return null;

  const trackStatus = TRACKS.map(track => {
    const trackMissions = allMissions.filter(m => m.track === track);
    const completedCount = trackMissions.filter(m => completedMissions.includes(m.id)).length;
    const isComplete = trackMissions.length > 0 && completedCount === trackMissions.length;
    
    return {
      track,
      isComplete,
      progress: `${completedCount}/${trackMissions.length}`
    };
  });

  const totalBadges = trackStatus.filter(t => t.isComplete).length;
  const sortedProfiles = [...profiles].sort((a, b) => (b.xp || 0) - (a.xp || 0));

  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-800/30">
          <div>
            <h2 className="text-xl md:text-2xl font-fredoka font-bold text-white flex items-center gap-3">
              {activeTab === 'badges' ? <Award className="w-7 h-7 text-yellow-400" /> : <Users className="w-7 h-7 text-cyan-400" />}
              {activeTab === 'badges' ? 'Achievements Gallery' : 'Local Leaders'}
            </h2>
            <p className="text-slate-400 text-xs md:text-sm mt-1 font-medium">
              {activeTab === 'badges' 
                ? `You've mastered ${totalBadges} / ${TRACKS.length} tracks.`
                : `Ranking all ${profiles.length} explorers on this device.`}
            </p>
          </div>
          <div className="flex bg-slate-950/50 p-1 rounded-xl border border-slate-700 w-full sm:w-auto">
            <button 
              onClick={() => setActiveTab('badges')}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${activeTab === 'badges' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >Badges</button>
            <button 
              onClick={() => setActiveTab('leaderboard')}
              className={`flex-1 sm:flex-none px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${activeTab === 'leaderboard' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >Leaderboard</button>
          </div>
          <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-hide">
          {activeTab === 'badges' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {trackStatus.map(({ track, isComplete, progress }) => (
                <div 
                  key={track}
                  className={`
                    relative p-4 md:p-6 rounded-3xl border flex flex-col items-center justify-center text-center gap-3 aspect-square transition-all
                    ${isComplete 
                      ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-yellow-500/40 shadow-xl shadow-yellow-900/10' 
                      : 'bg-slate-800/20 border-slate-800 grayscale opacity-40'
                    }
                  `}
                >
                  <div className={`
                    w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-1 transition-transform duration-700
                    ${isComplete ? 'bg-gradient-to-br from-yellow-400 to-orange-500 scale-110 shadow-lg shadow-yellow-500/20' : 'bg-slate-800'}
                  `}>
                    {isComplete ? (
                       <Award className="w-6 h-6 md:w-8 md:h-8 text-white animate-pulse" />
                    ) : (
                       <Lock className="w-5 h-5 md:w-6 md:h-6 text-slate-600" />
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className={`text-xs md:text-sm font-black font-fredoka uppercase tracking-wide leading-tight ${isComplete ? 'text-yellow-400' : 'text-slate-500'}`}>
                      {track}
                    </h3>
                    <span className="text-[10px] font-black text-slate-500 block opacity-80">
                      {isComplete ? 'MASTERED' : progress}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4 max-w-2xl mx-auto">
              {sortedProfiles.map((p, index) => (
                <div 
                  key={p.id} 
                  className={`
                    flex items-center justify-between p-4 rounded-2xl border transition-all
                    ${p.id === currentProfileId 
                      ? 'bg-indigo-600/10 border-indigo-500 shadow-xl shadow-indigo-900/10' 
                      : 'bg-slate-800/40 border-slate-700/50'}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center justify-center w-8 shrink-0">
                      {index === 0 ? <Crown className="w-5 h-5 text-yellow-400 mb-0.5" /> : <span className="text-sm font-black text-slate-500">#{index + 1}</span>}
                    </div>
                    <div className={`w-12 h-12 rounded-full ${p.avatarColor} flex items-center justify-center font-bold text-white shadow-xl text-lg shrink-0`}>
                      {p.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-white flex items-center gap-2">
                        {p.name}
                        {p.id === currentProfileId && <span className="text-[10px] bg-indigo-500 px-1.5 py-0.5 rounded text-white font-black uppercase tracking-widest">You</span>}
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Explorer Lvl {p.level || 1}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 pr-2">
                    <div className="hidden sm:flex flex-col items-end">
                      <div className="flex items-center gap-1.5 text-orange-500 font-black text-sm">
                        <Flame className="w-4 h-4" />
                        {p.streak || 0}
                      </div>
                      <div className="text-[9px] text-slate-600 uppercase font-black">Streak</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1.5 text-amber-400 font-black text-sm">
                        <Star className="w-4 h-4 fill-current" />
                        {p.xp || 0}
                      </div>
                      <div className="text-[9px] text-slate-600 uppercase font-black">Total XP</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 md:p-6 border-t border-slate-800 bg-slate-900/50 text-center">
            <button 
                onClick={onClose}
                className="px-10 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg active:scale-95"
            >
                Done
            </button>
        </div>
      </div>
    </div>
  );
};
