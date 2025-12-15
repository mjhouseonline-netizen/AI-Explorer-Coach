
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

  // Reset filter when track changes
  useEffect(() => {
    setFilterLevel('all');
  }, [selectedTrack]);

  const trackMissions = missions.filter(m => m.track === selectedTrack);
  const displayedMissions = trackMissions.filter(m => filterLevel === 'all' || m.level === filterLevel);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-fredoka text-white">
          Select a Mission for <span className="text-cyan-400">{selectedTrack}</span>
        </h2>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-lg border border-slate-700 w-fit">
            <Filter className="w-4 h-4 text-slate-400 ml-2 mr-1" />
            {(['all', 1, 2, 3] as const).map((level) => (
                <button
                    key={level}
                    onClick={() => setFilterLevel(level)}
                    className={`
                        px-3 py-1.5 text-xs font-bold rounded transition-colors
                        ${filterLevel === level 
                            ? 'bg-cyan-600 text-white shadow-sm' 
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
         <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-xl bg-slate-800/20">
            <p className="text-slate-400 font-medium">No missions found for Level {filterLevel} in this track.</p>
            <button 
                onClick={() => setFilterLevel('all')}
                className="mt-2 text-cyan-400 hover:underline text-sm"
            >
                View all missions
            </button>
         </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
            {displayedMissions.map((mission) => {
            const isCompleted = completedMissionIds.includes(mission.id);
            
            return (
                <div 
                key={mission.id}
                className={`
                    relative border rounded-xl p-5 transition-all duration-300 group overflow-visible
                    ${isCompleted 
                    ? 'bg-slate-800/30 border-slate-700/30 opacity-75 cursor-not-allowed' 
                    : 'bg-slate-800 border-slate-700 hover:border-cyan-500 hover:shadow-xl hover:-translate-y-1 cursor-pointer'
                    }
                `}
                onClick={() => !isCompleted && onSelectMission(mission)}
                >
                <div className="flex justify-between items-start mb-3">
                    <h3 className={`text-lg font-bold transition-colors flex items-center gap-2 ${isCompleted ? 'text-slate-400' : 'text-white group-hover:text-cyan-400'}`}>
                    {mission.title}
                    {isCompleted && <CheckCircle className="w-5 h-5 text-emerald-500" />}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded ${isCompleted ? 'bg-slate-800/50 text-slate-500 border border-slate-700/50' : 'bg-slate-700 text-slate-300'}`}>
                    Lvl {mission.level}
                    </span>
                </div>
                
                <p className={`text-sm mb-4 line-clamp-2 ${isCompleted ? 'text-slate-500' : 'text-slate-400'}`}>
                    {mission.goal}
                </p>

                <div className="flex items-center justify-between text-xs">
                    <div className={`flex items-center gap-1 ${isCompleted ? 'text-slate-600' : 'text-slate-500'}`}>
                    <Clock className="w-3 h-3" />
                    {mission.duration_minutes}m
                    </div>
                    
                    {isCompleted ? (
                    <div className="flex items-center gap-1 text-emerald-500/80 font-bold">
                        Completed
                    </div>
                    ) : (
                    <div className="flex items-center gap-1 text-cyan-500 font-semibold group-hover:underline">
                        Start Mission <Play className="w-3 h-3 ml-1 fill-current" />
                    </div>
                    )}
                </div>
                </div>
            );
            })}
        </div>
      )}
    </div>
  );
};
