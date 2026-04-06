import React, { useState } from 'react';
import { ClipboardList, Plus, Search, Calendar, ChevronRight, CheckCircle2, Circle, MoreVertical, Star, Clock } from 'lucide-react';

export default function TaskManager() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Network Security Audit', priority: 'HIGH', due: '2026-04-10', status: 'TODO', completed: false, starred: true },
    { id: 2, title: 'Onboard Sector 7 Entities', priority: 'MEDIUM', due: '2026-04-12', status: 'IN_PROGRESS', completed: false, starred: false },
    { id: 3, title: 'Finalize SLA Documentation', priority: 'LOW', due: '2026-04-15', status: 'TODO', completed: false, starred: false },
    { id: 4, title: 'Quarterly Telemetry Review', priority: 'HIGH', due: '2026-04-08', status: 'COMPLETED', completed: true, starred: true },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const task = {
        id: Date.now(),
        title: newTaskTitle,
        priority: 'MEDIUM',
        due: new Date().toISOString().split('T')[0],
        status: 'TODO',
        completed: false,
        starred: false
    };
    setTasks([task, ...tasks]);
    setNewTaskTitle('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed, status: !t.completed ? 'COMPLETED' : 'TODO' } : t));
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/80 p-8 rounded-[2.5rem] border border-slate-200/50 shadow-sm backdrop-blur-xl">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Mission Control</h2>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Personal Operations Registry</p>
        </div>
        <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 font-black">
                {tasks.filter(t => !t.completed).length}
            </div>
            <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Backlog Index</p>
                <p className="text-xs font-bold text-slate-500">Sector missions pending</p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
            <form onSubmit={addTask} className="group relative">
                <Plus size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input 
                    value={newTaskTitle}
                    onChange={e => setNewTaskTitle(e.target.value)}
                    placeholder="Initialize new mission parameter..." 
                    className="w-full pl-16 pr-24 py-6 bg-white border border-slate-200 shadow-xl shadow-slate-200/20 rounded-[2rem] outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-lg font-bold tracking-tight"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg hover:scale-105 active:scale-95 transition-all">
                    Register Task
                </button>
            </form>

            <div className="space-y-4">
                {tasks.map(t => (
                    <div key={t.id} className={`group flex items-center gap-6 p-6 rounded-[2rem] border transition-all duration-300 ${t.completed ? 'bg-slate-50/50 border-slate-100' : 'bg-white border-white shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1'}`}>
                        <button onClick={() => toggleComplete(t.id)} className={`h-7 w-7 rounded-full flex items-center justify-center transition-all ${t.completed ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-slate-50 text-slate-300 border-2 border-slate-200 hover:border-indigo-400 hover:text-indigo-400'}`}>
                            {t.completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                        </button>
                        <div className="flex-1">
                            <h4 className={`text-lg font-bold tracking-tight transition-all duration-300 ${t.completed ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{t.title}</h4>
                            <div className="flex items-center gap-4 mt-1.5 overflow-hidden">
                                <span className={`text-[9px] font-black uppercase tracking-widest flex items-center gap-1 ${t.completed ? 'text-slate-300' : t.priority === 'HIGH' ? 'text-rose-500' : 'text-indigo-400'}`}>
                                    {t.priority}
                                </span>
                                <div className="h-1 w-1 rounded-full bg-slate-200" />
                                <span className="text-[9px] font-bold text-slate-400 flex items-center gap-1">
                                    <Calendar size={10} />
                                    {t.due}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all">
                            <Star size={18} className={t.starred ? 'fill-amber-400 text-amber-400' : 'text-slate-200 hover:text-amber-400 transition-colors cursor-pointer'} />
                            <MoreVertical size={18} className="text-slate-300 hover:text-slate-600 transition-colors cursor-pointer" />
                            <ChevronRight size={18} className="text-slate-200" />
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-950 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-xl font-black tracking-tighter mb-8">Asset Insights</h3>
                    <div className="space-y-6">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Efficiency Curve</p>
                                <p className="text-3xl font-black italic tracking-tighter">Accelerated</p>
                            </div>
                            <div className="h-10 w-24 bg-indigo-500/10 rounded-xl flex items-end gap-1 p-2">
                                <div className="w-full bg-indigo-500 h-[30%] rounded-sm" />
                                <div className="w-full bg-indigo-500 h-[60%] rounded-sm" />
                                <div className="w-full bg-indigo-500 h-[45%] rounded-sm" />
                                <div className="w-full bg-indigo-500 h-[90%] rounded-sm" />
                            </div>
                        </div>
                        <div className="flex justify-between items-end pt-4 border-t border-white/5">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Success Ratio</p>
                                <p className="text-3xl font-black tracking-tighter text-indigo-400">92.4%</p>
                            </div>
                            <TrendingUp className="text-emerald-500 mb-1" size={24} />
                        </div>
                    </div>
                </div>
                <div className="absolute top-0 right-0 h-40 w-40 bg-indigo-500/10 rounded-full blur-[80px]" />
            </div>

            <div className="bg-white border border-slate-200/50 p-8 rounded-[2.5rem] shadow-sm">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                    <Clock size={16} className="text-indigo-600" />
                    Timeline Overview
                </h3>
                <div className="space-y-6">
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="h-3 w-3 rounded-full bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.5)]" />
                            <div className="flex-1 w-0.5 bg-slate-100 my-2" />
                        </div>
                        <div className="pb-6">
                            <p className="text-xs font-black uppercase tracking-widest text-slate-900 leading-none">Task Initialization</p>
                            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">09:00 AM • System Start</p>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                            <div className="h-3 w-3 rounded-full bg-slate-200" />
                            <div className="flex-1 w-0.5 bg-slate-100 my-2" />
                        </div>
                        <div className="pb-6">
                            <p className="text-xs font-black uppercase tracking-widest text-slate-400 leading-none">Security Sprint</p>
                            <p className="text-[10px] font-bold text-slate-300 mt-1 uppercase">01:30 PM • Critical</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

function TrendingUp({ className, size }) {
  return (
    <svg 
      className={className} 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}
