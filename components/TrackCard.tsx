
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
  'Basics': <Lightbulb className="w-6 h-6 md:w-8 md:h-8" />,
  'Prompts': <Terminal className="w-6 h-6 md:w-8 md:h-8" />,
  'Creative Stories': <BookOpen className="w-6 h-6 md:w-8 md:h-8" />,
  'Creative Images': <ImageIcon className="w-6 h-6 md:w-8 md:h-8" />,
  'Video': <Film className="w-6 h-6 md:w-8 md:h-8" />,
  'Music': <Music className="w-6 h-6 md:w-8 md:h-8" />,
  'Coding': <Code2 className="w-6 h-6 md:w-8 md:h-8" />,
  'Research': <Search className="w-6 h-6 md:w-8 md:h-8" />,
  'Data': <BarChart className="w-6 h-6 md:w-8 md:h-8" />,
  'Automation': <Cpu className="w-6 h-6 md:w-8 md:h-8" />,
  'Business': <Briefcase className="w-6 h-6 md:w-8 md:h-8" />,
  'Projects': <Rocket className="w-6 h-6 md:w-8 md:h-8" />,
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
        relative rounded-2xl text-left transition-all duration-300 shadow-lg group w-full overflow-hidden
        ${COLORS[track]} text-white
        ${isSelected ? 'ring-4 ring-white ring-opacity-50 scale-[1.01]' : 'hover:scale-[1.01]'}
        active:scale-[0.98]
      `}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-2 -bottom-2 opacity-15 transform rotate-12 group-hover:scale-125 transition-transform duration-500">
          {React.cloneElement(ICONS[track] as React.ReactElement, { className: "w-20 h-20 md:w-24 md:h-24" })}
        </div>
      </div>
      
      <div className="relative z-10 flex flex-col gap-1.5 p-4 md:p-5">
        <div className="flex justify-between items-start">
          <div className="p-1.5 md:p-2 bg-white/20 rounded-xl transition-colors group-hover:bg-white/30 backdrop-blur-sm">
            {ICONS[track]}
          </div>

          <div className={`
            flex items-center gap-1 text-[10px] md:text-xs font-black px-2.5 py-1 rounded-full transition-all
            ${isCompleted ? 'bg-white text-emerald-600 shadow-lg' : 'bg-black/20 text-white/90'}
          `}>
            {isCompleted && <Check className="w-3 h-3 stroke-[4]" />}
            <span>{completedCount}/{totalCount}</span>
          </div>
        </div>
        
        <div className="mt-1 md:mt-2">
            <h3 className="text-base md:text-lg font-bold font-fredoka leading-tight tracking-tight">{track}</h3>
            <p className="text-[10px] md:text-xs font-nunito opacity-80 mt-0.5 font-bold uppercase tracking-wider">
              {isCompleted ? 'Complete!' : 'Exploration'}
            </p>
        </div>

        <div className="mt-3 w-full h-1.5 bg-black/15 rounded-full overflow-hidden backdrop-blur-sm">
          <div 
            className={`h-full transition-all duration-1000 ease-out shadow-sm ${isCompleted ? 'bg-white' : 'bg-white/80'}`}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={percentage}
          />
        </div>
      </div>
    </button>
  );
};
