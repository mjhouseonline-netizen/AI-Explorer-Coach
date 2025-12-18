
import React, { useState, useEffect } from 'react';
import { Mission, Track } from '../types';
import { Play, Clock, CheckCircle, Filter } from 'lucide-react';

interface MissionSelectorProps {
  selectedTrack: Track;
  missions: Mission[];
  onSelectMission: (mission: Mission) => void;
  completedMissionIds: string[];
}

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
        <h2 className="text-xl md:text-2xl font-bold font-fredoka text-white">
          <span className="text-cyan-400">{selectedTrack}</span> Missions
        </h2>

        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700 w-full sm:w-auto shadow-lg backdrop-blur-sm">
            <div className="px-2 text-slate-500 hidden md:block"><Filter className="w-3.5 h-3.5" /></div>
            {(['all', 1, 2, 3] as const).map((level) => (
                <button
                    key={level}
                    onClick={() => setFilterLevel(level)}
                    className={`
                        px-3 py-2 text-[10px] md:text-xs font-black rounded-lg transition-all flex-1 sm:flex-none text-center uppercase tracking-wider
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
      
      {displayedMissions.length === 0 ? (
         <div className="text-center py-12 px-6 border-2 border-dashed border-slate-800 rounded-3xl bg-slate-800/20">
            <p className="text-slate-400 font-medium text-sm">No level {filterLevel} missions available here yet.</p>
            <button 
                onClick={() => setFilterLevel('all')}
                className="mt-3 text-cyan-400 hover:text-cyan-300 font-bold text-sm transition-colors"
            >
                See all levels
            </button>
         </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {displayedMissions.map((mission) => {
            const isCompleted = completedMissionIds.includes(mission.id);
            
            return (
                <button 
                  key={mission.id}
                  disabled={isCompleted}
                  onClick={() => onSelectMission(mission)}
                  className={`
                      relative border rounded-2xl p-5 transition-all duration-300 group text-left
                      ${isCompleted 
                      ? 'bg-slate-800/40 border-slate-700/40 opacity-60 cursor-default' 
                      : 'bg-slate-800/50 border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800 hover:shadow-2xl hover:shadow-cyan-900/10 active:scale-[0.98]'
                      }
                  `}
                >
                  <div className="flex justify-between items-start mb-3 gap-2">
                      <h3 className={`text-base md:text-lg font-bold font-fredoka transition-colors flex items-center gap-2 ${isCompleted ? 'text-slate-500' : 'text-white group-hover:text-cyan-400'}`}>
                        {mission.title}
                        {isCompleted && <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />}
                      </h3>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg shrink-0 ${isCompleted ? 'bg-slate-800/50 text-slate-600 border border-slate-700/50' : 'bg-slate-700/50 text-slate-300 border border-slate-600/30'}`}>
                        Lv {mission.level}
                      </span>
                  </div>
                  
                  <p className={`text-xs md:text-sm mb-5 line-clamp-2 leading-relaxed ${isCompleted ? 'text-slate-600' : 'text-slate-400'}`}>
                      {mission.goal}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                      <div className={`flex items-center gap-1.5 text-[10px] md:text-xs font-bold ${isCompleted ? 'text-slate-600' : 'text-slate-500'}`}>
                        <Clock className="w-3.5 h-3.5" />
                        {mission.duration_minutes} min
                      </div>
                      
                      {isCompleted ? (
                        <div className="text-[10px] font-black uppercase tracking-widest text-emerald-500/60">
                            Completed
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-cyan-400 text-[10px] md:text-xs font-black uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                            Start <Play className="w-3 h-3 fill-current" />
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
