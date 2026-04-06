import React from 'react';
import { Users, Ticket, CheckCircle, Flame, TrendingUp, ArrowUpRight } from 'lucide-react';

export default function StatsGrid({ customers, openTickets, resolutionRate, weightedBacklog }) {
  const stats = [
    { label: 'Ecosystem Growth', value: customers.length, icon: Users, color: 'indigo', detail: '+12% this month' },
    { label: 'Active Sector Tickets', value: openTickets.length, icon: Ticket, color: 'cyan', detail: '8 pending critical' },
    { label: 'Resolution Rate', value: `${Math.round(resolutionRate)}%`, icon: CheckCircle, color: 'emerald', detail: 'Above SLA target' },
    { label: 'Network Pressure', value: weightedBacklog, icon: Flame, color: 'rose', detail: 'High priority backlog' },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
      {stats.map((s, i) => (
        <div key={i} className="group relative overflow-hidden bg-white/80 backdrop-blur-xl border border-slate-200/50 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
          <div className={`absolute top-0 right-0 p-3 bg-${s.color}-500/10 rounded-bl-3xl translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform`}>
            <s.icon className={`text-${s.color}-500 group-hover:scale-110 transition-transform`} size={20} />
          </div>
          <div className="flex flex-col justify-between h-full">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
              <h3 className="text-3xl font-black text-slate-900 tracking-tighter leading-none">{s.value}</h3>
            </div>
            <div className="mt-4 flex items-center gap-1.5 overflow-hidden">
                <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-lg bg-${s.color}-50 text-[10px] font-black text-${s.color}-600 tracking-tighter`}>
                    <TrendingUp size={10} />
                    {s.detail}
                </span>
                <ArrowUpRight size={12} className="text-slate-300 ml-auto group-hover:text-indigo-500 transition-colors" />
            </div>
          </div>
          
          {/* Decorative Background Element */}
          <div className={`absolute -bottom-6 -left-6 h-24 w-24 bg-${s.color}-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`} />
        </div>
      ))}
    </div>
  );
}
