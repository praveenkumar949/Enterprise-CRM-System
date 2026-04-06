import React, { useMemo } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { TrendingUp, ArrowUpRight, Zap, AlertTriangle, Target, Activity } from 'lucide-react';

export default function AnalyticsDashboard({ tickets, priorityData, ticketTrendData }) {
  const KpiCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white/80 border border-slate-200/50 p-6 rounded-3xl shadow-sm hover:shadow-lg transition-all">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl bg-${color}-50 text-${color}-600`}>
                <Icon size={20} />
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${trend > 0 ? 'text-emerald-600' : 'text-rose-600'} flex items-center gap-1`}>
                {trend > 0 ? '+' : ''}{trend}%
                <ArrowUpRight size={10} />
            </span>
        </div>
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{title}</p>
        <h4 className="text-2xl font-black text-slate-900 tracking-tighter">{value}</h4>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard title="Network Latency" value="142ms" icon={Zap} color="indigo" trend={12} />
            <KpiCard title="Anomaly Detection" value="4 Active" icon={AlertTriangle} color="rose" trend={-2} />
            <KpiCard title="Strategic Alignment" value="98.2%" icon={Target} color="emerald" trend={0.5} />
            <KpiCard title="Throughput Index" value="1.4k/s" icon={Activity} color="cyan" trend={8} />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="rounded-[2.5rem] bg-white border border-slate-200/50 p-8 shadow-sm lg:col-span-2">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tighter">Throughput Telemetry</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time sector performance</p>
                    </div>
                </div>
                <div className="h-[22rem]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={ticketTrendData}>
                            <defs>
                                <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <Tooltip 
                                contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', background: 'white' }}
                                itemStyle={{ fontWeight: '800', fontSize: '10px', textTransform: 'uppercase' }}
                            />
                            <Area type="monotone" dataKey="created" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorCreated)" />
                            <Area type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorResolved)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="rounded-[2.5rem] bg-slate-950 p-8 text-white shadow-2xl relative overflow-hidden group">
                <div className="relative z-10">
                    <h3 className="text-xl font-black tracking-tighter mb-2">Priority Matrix</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-8">Allocation by Urgency Vector</p>
                    
                    <div className="h-[18rem]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={priorityData} dataKey="value" innerRadius={70} outerRadius={100} paddingAngle={8} stroke="none">
                                    {priorityData.map((e, i) => <Cell key={i} fill={e.color} />)}
                                </Pie>
                                <Tooltip 
                                     contentStyle={{ borderRadius: '1rem', border: 'none', background: '#0f172a', color: 'white', fontSize: '10px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="space-y-3 mt-4">
                        {priorityData.map((d, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: d.color }}></div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{d.name}</span>
                                </div>
                                <span className="text-xs font-black">{d.value} Units</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Decorative Accent */}
                <div className="absolute top-0 right-0 h-32 w-32 bg-indigo-500/10 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-700" />
            </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
             <div className="rounded-[2.5rem] bg-white border border-slate-200/50 p-8 shadow-sm">
                <h3 className="text-xl font-black text-slate-900 tracking-tighter mb-8 flex items-center gap-4">
                    <TrendingUp className="text-indigo-600" />
                    Load Distribution
                </h3>
                <div className="h-[18rem]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={ticketTrendData.slice(0, 5)}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <Tooltip 
                                contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', background: 'white' }}
                            />
                            <Bar dataKey="created" fill="#6366f133" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-cyan-600 p-8 text-white shadow-xl flex flex-col justify-between">
                <div>
                    <h3 className="text-2xl font-black tracking-tighter mb-2">Performance Quotient</h3>
                    <p className="text-xs font-bold text-indigo-100 uppercase tracking-widest opacity-80">Composite efficiency index</p>
                </div>
                <div className="py-10">
                    <div className="text-7xl font-black tracking-tighter">94.2</div>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="h-1.5 w-32 bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full w-[94.2%] bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">+4.2% from mean</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/5">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Avg Response</p>
                        <p className="text-xl font-black">2.4m</p>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/5">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">SLA Breach</p>
                        <p className="text-xl font-black">0.05%</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
