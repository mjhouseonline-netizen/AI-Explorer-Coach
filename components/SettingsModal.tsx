
import React from 'react';
import { X, Volume2, VolumeX, Trash2, ShieldAlert, Info, Github, HardDrive, Sparkles } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onResetAll: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ 
  isOpen, 
  onClose, 
  soundEnabled, 
  onToggleSound, 
  onResetAll 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/50 rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl flex flex-col transform transition-all scale-100">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-800/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-xl font-fredoka font-bold text-white tracking-tight">App Settings</h2>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-0.5">Customize your experience</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
          
          {/* Audio Section */}
          <section className="space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Audio & Feedback</h3>
            <div className="flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl group transition-all hover:bg-slate-800/60">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg transition-colors ${soundEnabled ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-700 text-slate-500'}`}>
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </div>
                <div>
                  <div className="font-bold text-sm text-slate-200">Interface Sounds</div>
                  <div className="text-[10px] text-slate-500 font-medium">Click, mission start, and notification alerts</div>
                </div>
              </div>
              <button 
                onClick={onToggleSound}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ring-offset-slate-900 focus:ring-2 focus:ring-indigo-500 ${soundEnabled ? 'bg-indigo-600' : 'bg-slate-700'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${soundEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          </section>

          {/* Data Section */}
          <section className="space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">Privacy & Storage</h3>
            <div className="p-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-slate-700 rounded-lg text-slate-400">
                  <HardDrive className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-sm text-slate-200">Local Persistence</div>
                  <div className="text-[10px] text-slate-500 font-medium">Your progress and profile are stored locally on this browser.</div>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-700/50">
                <button 
                  onClick={onResetAll}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/30 rounded-xl text-xs font-black uppercase tracking-widest transition-all group"
                >
                  <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  Factory Reset (Delete All)
                </button>
              </div>
            </div>
            <div className="flex items-start gap-2 px-2">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500 mt-0.5" />
              <p className="text-[10px] text-slate-500 font-medium leading-relaxed italic">Warning: Resetting will permanently erase all explorer profiles, badges, and progress. This cannot be undone.</p>
            </div>
          </section>

          {/* About Section */}
          <section className="space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">About</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl">
                 <div className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">Version</div>
                 <div className="text-white font-bold text-sm">2.1.0-Explorer</div>
              </div>
              <div className="p-4 bg-slate-800/40 border border-slate-700/50 rounded-2xl">
                 <div className="text-slate-500 text-[9px] font-black uppercase tracking-widest mb-1">Engine</div>
                 <div className="text-white font-bold text-sm flex items-center gap-1.5">
                   <sparkles className="w-3 h-3 text-cyan-400" /> Gemini Pro
                 </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6 pt-2">
              <a href="#" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-400 transition-colors">
                <Info className="w-4 h-4" /> Help Center
              </a>
              <a href="#" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-400 transition-colors">
                <Github className="w-4 h-4" /> Source Code
              </a>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/50">
          <button 
            onClick={onClose}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-900/20 active:scale-95"
          >
            Save & Return
          </button>
        </div>
      </div>
    </div>
  );
};
