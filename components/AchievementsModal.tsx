
import React from 'react';
import { Track } from '../types';
import { Award, Lock, X } from 'lucide-react';
import { TRACKS } from '../constants';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  completedMissions: string[];
  allMissions: { id: string; track: Track }[];
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({ isOpen, onClose, completedMissions, allMissions }) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-[2rem] w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        
        <div className="p-6 md:p-8 border-b border-slate-800 flex justify-between items-start md:items-center bg-slate-800/30">
          <div>
            <h2 className="text-xl md:text-2xl font-fredoka font-bold text-white flex items-center gap-3">
              <Award className="w-7 h-7 md:w-8 md:h-8 text-yellow-400" />
              Achievements Gallery
            </h2>
            <p className="text-slate-400 text-xs md:text-sm mt-1 font-medium">
              You've unlocked <span className="text-yellow-400 font-bold">{totalBadges}</span> / {TRACKS.length} master badges.
            </p>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white shrink-0">
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 scrollbar-hide">
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

        <div className="p-4 md:p-6 border-t border-slate-800 bg-slate-900/50 text-center">
            <button 
                onClick={onClose}
                className="w-full sm:w-auto px-10 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg active:scale-95"
            >
                Done
            </button>
        </div>
      </div>
    </div>
  );
};
