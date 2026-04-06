import React from 'react';
import { Clock3, Bell, Shield, User, Zap, Mail, ChevronRight, Activity } from 'lucide-react';

export default function ActivityLog({ activityFeed }) {
  const getActivityIcon = (type) => {
    const map = {
      KAFKA_BROKER_ALERT: { icon: Shield, color: 'rose' },
      TICKET_CREATED: { icon: Zap, color: 'indigo' },
      TICKET_UPDATED: { icon: Activity, color: 'cyan' },
      CUSTOMER_ONBOARDED: { icon: User, color: 'emerald' },
      NOTIFICATION: { icon: Bell, color: 'amber' }
    };
    return map[type] || { icon: Bell, color: 'indigo' };
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-1000">
      <div className="flex items-center justify-between bg-white/80 p-8 rounded-[2.5rem] border border-slate-200/50 shadow-sm backdrop-blur-xl">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Activity Grid</h2>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time Sector Telemetry</p>
        </div>
        <div className="flex -space-x-4">
            {[1,2,3,4].map(i => (
                <div key={i} className="h-12 w-12 rounded-2xl border-4 border-white bg-slate-100 flex items-center justify-center font-black text-xs text-slate-400 ring-2 ring-slate-100 italic">
                    #{i}
                </div>
            ))}
        </div>
      </div>

      <div className="space-y-6">
        {activityFeed.length > 0 ? activityFeed.map((a, i) => {
          const { icon: Icon, color } = getActivityIcon(a.type);
          return (
            <div 
                key={a.id} 
                className="group flex gap-8 p-8 rounded-[2.5rem] bg-white hover:bg-slate-50 transition-all duration-300 border border-slate-200/20 hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-x-2"
                style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`h-16 w-16 shrink-0 flex items-center justify-center rounded-[1.5rem] bg-${color}-50 text-${color}-600 border border-${color}-100 transition-all group-hover:scale-110 group-hover:rotate-6`}>
                <Icon size={24} />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-black uppercase tracking-widest text-slate-400">{a.type || 'SYSTEM SIGNAL'}</p>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Signal Captured</span>
                </div>
                <h4 className="text-lg font-black text-slate-900 tracking-tight mb-2 group-hover:text-indigo-600 transition-colors">{a.title || a.type}</h4>
                <p className="text-sm font-bold text-slate-500 leading-relaxed max-w-2xl">{a.detail || a.message}</p>
                
                <div className="mt-4 flex items-center gap-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-500 flex items-center gap-1.5 bg-indigo-50/50 px-2.5 py-1 rounded-lg">
                        <Clock3 size={10} />
                        Recently Detected
                    </span>
                    <button className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300 hover:text-indigo-600 transition-colors flex items-center gap-1">
                        Inspect Trace
                        <ChevronRight size={10} />
                    </button>
                </div>
              </div>
            </div>
          );
        }) : (
          <div className="text-center py-32 bg-white rounded-[3rem] border border-slate-100 shadow-inner">
            <div className="h-24 w-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                <Bell className="text-slate-200" size={48} />
            </div>
            <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-sm">No signals detected in the current sector.</p>
          </div>
        )}
      </div>

      <div className="pt-10 flex justify-center">
          <button className="px-10 py-5 bg-slate-950 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl hover:scale-105 active:scale-95 transition-all">
              Load Historical Archive
          </button>
      </div>
    </div>
  );
}
