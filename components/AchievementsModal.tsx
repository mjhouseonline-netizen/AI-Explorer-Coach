
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

  // Calculate track progress
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/50">
          <div>
            <h2 className="text-2xl font-fredoka font-bold text-white flex items-center gap-3">
              <Award className="w-8 h-8 text-yellow-400" />
              Achievements Gallery
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Master a track to unlock its Badge. You have {totalBadges} / {TRACKS.length} badges.
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Grid */}
        <div className="p-6 overflow-y-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {trackStatus.map(({ track, isComplete, progress }) => (
            <div 
              key={track}
              className={`
                relative p-4 rounded-xl border flex flex-col items-center justify-center text-center gap-3 aspect-square transition-all
                ${isComplete 
                  ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-yellow-500/50 shadow-lg shadow-yellow-900/20' 
                  : 'bg-slate-900/50 border-slate-800 grayscale opacity-70'
                }
              `}
            >
              <div className={`
                w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-transform duration-500
                ${isComplete ? 'bg-gradient-to-br from-yellow-400 to-orange-500 scale-110' : 'bg-slate-800'}
              `}>
                {isComplete ? (
                   <Award className="w-8 h-8 text-white animate-bounce" style={{ animationDuration: '3s' }} />
                ) : (
                   <Lock className="w-6 h-6 text-slate-600" />
                )}
              </div>
              
              <div>
                <h3 className={`font-bold font-fredoka ${isComplete ? 'text-yellow-400' : 'text-slate-500'}`}>
                  {track} Master
                </h3>
                <span className="text-xs text-slate-500 mt-1 block font-mono">
                  {isComplete ? 'UNLOCKED' : `${progress} Missions`}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900 text-center">
            <button 
                onClick={onClose}
                className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold transition-colors"
            >
                Close
            </button>
        </div>
      </div>
    </div>
  );
};
