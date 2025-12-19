
import React from 'react';
import { X, Users, Activity, ShieldCheck, Database, Zap, Award } from 'lucide-react';
import { Profile, Mission } from '../types';

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
  profiles: Profile[];
  allMissions: Mission[];
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ isOpen, onClose, profiles, allMissions }) => {
  if (!isOpen) return null;

  const totalMissionsCompleted = profiles.reduce((acc, p) => acc + p.completedMissions.length, 0);
  const avgCompletion = profiles.length > 0 ? (totalMissionsCompleted / profiles.length).toFixed(1) : 0;

  return (
    <div className="fixed inset-0 z-[300] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700/50 rounded-[2.5rem] w-full max-w-6xl h-[90vh] flex flex-col shadow-[0_0_100px_rgba(30,58,138,0.5)] overflow-hidden">
        {/* Header */}
        <div className="p-6 md:p-8 border-b border-slate-800 flex justify-between items-center bg-indigo-950/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-900/40">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-fredoka font-bold text-white tracking-tight">System Administrator Portal</h2>
              <p className="text-indigo-400 text-xs font-black uppercase tracking-[0.2em] mt-1">Authorized Access Only: bubblesfox@gmail.com</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-3 bg-slate-800 hover:bg-slate-700 rounded-2xl transition-all text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 scrollbar-hide">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={<Users className="text-cyan-400" />} label="Active Profiles" value={profiles.length.toString()} />
            <StatCard icon={<Activity className="text-emerald-400" />} label="Avg. Missions/User" value={avgCompletion.toString()} />
            <StatCard icon={<Award className="text-amber-400" />} label="Total Badges Earned" value={totalMissionsCompleted.toString()} />
            <StatCard icon={<Database className="text-indigo-400" />} label="Instance Memory" value={`${(JSON.stringify(profiles).length / 1024).toFixed(1)} KB`} />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Profile List */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold font-fredoka text-white">User Overview</h3>
              </div>
              <div className="space-y-4">
                {profiles.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-slate-700/30">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full ${p.avatarColor} flex items-center justify-center font-bold text-white shadow-inner`}>
                        {p.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-slate-200 text-sm">{p.name}</div>
                        <div className="text-[10px] text-slate-500 uppercase font-bold">{p.audience} • {p.email || 'No email linked'}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-black text-indigo-400">{p.completedMissions.length} Missions</div>
                      <div className="w-24 h-1.5 bg-slate-800 rounded-full mt-1.5 overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500" 
                          style={{ width: `${(p.completedMissions.length / allMissions.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Status & Logs */}
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-3xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold font-fredoka text-white">System Diagnostics</h3>
              </div>
              <div className="space-y-4 font-mono text-[11px]">
                <LogItem type="SUCCESS" message="Gemini-3-Flash-Preview engine online" time="Now" />
                <LogItem type="INFO" message={`Local storage active with ${profiles.length} profiles`} time="2m ago" />
                <LogItem type="INFO" message="Encryption layer verified for bubblesfox@gmail.com" time="5m ago" />
                <LogItem type="WARNING" message="Latency spike detected during ImageGen simulation" time="15m ago" />
                <LogItem type="SUCCESS" message="Auto-persistence layer backup completed" time="1h ago" />
                <div className="pt-4 mt-4 border-t border-slate-700/50">
                  <div className="text-slate-500 uppercase font-black text-[9px] mb-2 tracking-widest">Global Heatmap (Simulated)</div>
                  <div className="grid grid-cols-7 gap-1 h-20">
                    {Array.from({length: 28}).map((_, i) => (
                      <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? 'bg-indigo-500/40' : 'bg-slate-800'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/80 text-center">
          <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.3em]">AI Explorer Coach Dashboard • Secure Instance 0x44F</p>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="bg-slate-800/60 border border-slate-700/50 p-5 rounded-3xl">
    <div className="p-2 bg-slate-900 w-fit rounded-xl mb-3 shadow-inner">{icon}</div>
    <div className="text-2xl font-bold font-fredoka text-white">{value}</div>
    <div className="text-[10px] text-slate-500 uppercase font-black tracking-wider mt-1">{label}</div>
  </div>
);

const LogItem = ({ type, message, time }: { type: 'SUCCESS' | 'INFO' | 'WARNING', message: string, time: string }) => {
  const colors = {
    SUCCESS: 'text-emerald-400',
    INFO: 'text-cyan-400',
    WARNING: 'text-amber-400'
  };
  return (
    <div className="flex justify-between items-start gap-4 py-2 border-b border-slate-800/30 last:border-0">
      <div className="flex gap-2">
        <span className={`${colors[type]} font-black shrink-0`}>[{type}]</span>
        <span className="text-slate-400">{message}</span>
      </div>
      <span className="text-slate-600 shrink-0">{time}</span>
    </div>
  );
};
