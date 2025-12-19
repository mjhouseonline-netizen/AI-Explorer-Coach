
import React, { useState, useEffect } from 'react';
import { Mission, Track } from '../types';
import { Play, Clock, CheckCircle, Filter, Zap } from 'lucide-react';

interface MissionSelectorProps {
  selectedTrack: Track;
  missions: Mission[];
  onSelectMission: (mission: Mission) => void;
  completedMissionIds: string[];
}

const LEVEL_CONFIG: Record<number, { label: string; color: string; badge: string }> = {
  1: { label: 'Beginner', color: 'bg-emerald-500', badge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
  2: { label: 'Intermediate', color: 'bg-amber-500', badge: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  3: { label: 'Advanced', color: 'bg-rose-500', badge: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
};

export const MissionSelector: React.FC<MissionSelectorProps> = ({ selectedTrack, missions, onSelectMission, completedMissionIds }) => {
  const [filterLevel, setFilterLevel] = useState<'all' | number>('all');

  useEffect(() => {
    setFilterLevel('all');
  }, [selectedTrack]);

  const trackMissions = missions.filter(m => m.track === selectedTrack);
  const displayedMissions = trackMissions.filter(m => filterLevel === 'all' || m.level === filterLevel);

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl md:text-2xl font-bold font-fredoka text-white flex items-center gap-3">
          <span className="p-2 bg-slate-800 rounded-xl border border-slate-700">
             <Zap className="w-5 h-5 text-cyan-400" />
          </span>
          <span className="text-cyan-400">{selectedTrack}</span> Missions
        </h2>

        <div className="flex flex-col gap-2">
            <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-1 hidden sm:block">Filter by Difficulty</span>
            <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700 w-full sm:w-auto shadow-lg backdrop-blur-sm">
                {(['all', 1, 2, 3] as const).map((level) => (
                    <button
                        key={level}
                        onClick={() => setFilterLevel(level)}
                        className={`
                            px-3 py-2 text-[10px] md:text-xs font-black rounded-lg transition-all flex-1 sm:flex-none text-center uppercase tracking-wider min-w-[60px]
                            ${filterLevel === level 
                                ? 'bg-cyan-600 text-white shadow-md' 
                                : 'text-slate-400 hover:text-white hover:bg-slate-700'
                            }
                        `}
                    >
                        {level === 'all' ? 'All' : `Lvl ${level}`}
                    </button>
                ))}
            </div>
        </div>
      </div>
      
      {displayedMissions.length === 0 ? (
         <div className="text-center py-16 px-6 border-2 border-dashed border-slate-800 rounded-[2.5rem] bg-slate-800/20">
            <div className="mb-4 text-slate-700">
                <Filter className="w-12 h-12 mx-auto opacity-20" />
            </div>
            <p className="text-slate-400 font-bold font-fredoka text-lg">No level {filterLevel} missions found.</p>
            <p className="text-slate-600 text-sm mt-1 max-w-xs mx-auto">Try selecting a different level or explore another track!</p>
            <button 
                onClick={() => setFilterLevel('all')}
                className="mt-6 bg-slate-800 hover:bg-slate-700 px-6 py-2.5 rounded-xl text-cyan-400 font-black text-xs uppercase tracking-widest transition-all border border-slate-700"
            >
                Show All Missions
            </button>
         </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {displayedMissions.map((mission) => {
            const isCompleted = completedMissionIds.includes(mission.id);
            const levelInfo = LEVEL_CONFIG[mission.level as keyof typeof LEVEL_CONFIG] || LEVEL_CONFIG[1];
            
            return (
                <button 
                  key={mission.id}
                  disabled={isCompleted}
                  onClick={() => onSelectMission(mission)}
                  className={`
                      relative border rounded-3xl p-6 transition-all duration-300 group text-left flex flex-col h-full
                      ${isCompleted 
                      ? 'bg-slate-800/40 border-slate-700/40 opacity-60 cursor-default grayscale' 
                      : 'bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] active:scale-[0.98]'
                      }
                  `}
                >
                  <div className="flex justify-between items-start mb-4 gap-2">
                      <div className="space-y-1">
                          <div className={`text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded border w-fit ${levelInfo.badge}`}>
                            Level {mission.level}: {levelInfo.label}
                          </div>
                          <h3 className={`text-base md:text-lg font-bold font-fredoka transition-colors flex items-center gap-2 leading-tight ${isCompleted ? 'text-slate-500' : 'text-white group-hover:text-cyan-400'}`}>
                            {mission.title}
                          </h3>
                      </div>
                      {isCompleted && (
                        <div className="p-1.5 bg-emerald-500/20 rounded-full">
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                        </div>
                      )}
                  </div>
                  
                  <p className={`text-xs md:text-sm mb-6 line-clamp-3 leading-relaxed flex-grow ${isCompleted ? 'text-slate-600' : 'text-slate-400'}`}>
                      {mission.goal}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                      <div className={`flex items-center gap-1.5 text-[10px] md:text-xs font-bold ${isCompleted ? 'text-slate-600' : 'text-slate-500'}`}>
                        <Clock className="w-3.5 h-3.5" />
                        {mission.duration_minutes} min
                      </div>
                      
                      {isCompleted ? (
                        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500/60">
                            Badge Earned
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-cyan-400 text-[10px] md:text-xs font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                            Start Mission <Play className="w-3 h-3 fill-current" />
                        </div>
                      )}
                  </div>
                </button>
            );
            })}
        </div>
      )}
    </div>
  );
};
