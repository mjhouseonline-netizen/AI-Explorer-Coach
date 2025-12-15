
import React from 'react';
import { Track } from '../types';
import { Music, BookOpen, Image as ImageIcon, Rocket, Terminal, Lightbulb, Film, Code2, Search, Cpu, Check, BarChart, Briefcase } from 'lucide-react';

interface TrackCardProps {
  track: Track;
  onClick: (track: Track) => void;
  isSelected?: boolean;
  completedCount: number;
  totalCount: number;
}

const ICONS: Record<Track, React.ReactNode> = {
  'Basics': <Lightbulb className="w-8 h-8" />,
  'Prompts': <Terminal className="w-8 h-8" />,
  'Creative Stories': <BookOpen className="w-8 h-8" />,
  'Creative Images': <ImageIcon className="w-8 h-8" />,
  'Video': <Film className="w-8 h-8" />,
  'Music': <Music className="w-8 h-8" />,
  'Coding': <Code2 className="w-8 h-8" />,
  'Research': <Search className="w-8 h-8" />,
  'Data': <BarChart className="w-8 h-8" />,
  'Automation': <Cpu className="w-8 h-8" />,
  'Business': <Briefcase className="w-8 h-8" />,
  'Projects': <Rocket className="w-8 h-8" />,
};

const COLORS: Record<Track, string> = {
  'Basics': 'bg-amber-500 hover:bg-amber-400',
  'Prompts': 'bg-emerald-500 hover:bg-emerald-400',
  'Creative Stories': 'bg-indigo-500 hover:bg-indigo-400',
  'Creative Images': 'bg-pink-500 hover:bg-pink-400',
  'Video': 'bg-rose-500 hover:bg-rose-400',
  'Music': 'bg-cyan-500 hover:bg-cyan-400',
  'Coding': 'bg-blue-600 hover:bg-blue-500',
  'Research': 'bg-teal-500 hover:bg-teal-400',
  'Data': 'bg-sky-600 hover:bg-sky-500',
  'Automation': 'bg-orange-500 hover:bg-orange-400',
  'Business': 'bg-zinc-600 hover:bg-zinc-500',
  'Projects': 'bg-violet-600 hover:bg-violet-500',
};

export const TrackCard: React.FC<TrackCardProps> = ({ 
  track, 
  onClick, 
  isSelected, 
  completedCount, 
  totalCount 
}) => {
  const percentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const isCompleted = totalCount > 0 && completedCount === totalCount;

  return (
    <button
      onClick={() => onClick(track)}
      className={`
        relative rounded-2xl text-left transition-all duration-300 shadow-lg group w-full
        ${COLORS[track]} text-white
        ${isSelected ? 'ring-4 ring-white ring-opacity-50 scale-[1.02]' : 'hover:scale-[1.02]'}
      `}
    >
      {/* Background Icon Container */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        <div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12 group-hover:scale-125 transition-transform duration-500">
          {React.cloneElement(ICONS[track] as React.ReactElement, { className: "w-24 h-24" })}
        </div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col gap-2 h-full p-5 md:p-6">
        <div className="flex justify-between items-start">
          
          {/* Icon with Tooltip */}
          <div className="relative group/icon" title={track}>
            <div className="p-2 bg-white/20 rounded-lg w-fit transition-colors hover:bg-white/30 backdrop-blur-sm">
              {ICONS[track]}
            </div>
            
            {/* Custom Tooltip */}
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-1.5 bg-slate-900/95 text-white text-xs font-bold rounded-lg opacity-0 group-hover/icon:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap border border-white/10 shadow-xl backdrop-blur-sm z-[100] translate-x-2 group-hover/icon:translate-x-0">
              {track}
            </div>
          </div>

          {/* Progress Badge */}
          <div className={`
            flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-colors
            ${isCompleted ? 'bg-white text-emerald-600 shadow-sm' : 'bg-black/20 text-white'}
          `}>
            {isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            <span>{completedCount}/{totalCount}</span>
          </div>
        </div>
        
        <div className="mt-3">
            <h3 className="text-xl font-bold font-fredoka leading-tight">{track}</h3>
            <p className="text-sm font-nunito opacity-90 mt-1">
              {isCompleted ? 'Track completed!' : 'Start your journey'}
            </p>
        </div>

        {/* Progress Bar */}
        <div className="mt-5 w-full h-2 bg-black/20 rounded-full overflow-hidden backdrop-blur-sm">
          <div 
            className={`h-full transition-all duration-1000 ease-out ${isCompleted ? 'bg-white' : 'bg-white/90'}`}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${track} progress`}
          />
        </div>
      </div>
    </button>
  );
};
