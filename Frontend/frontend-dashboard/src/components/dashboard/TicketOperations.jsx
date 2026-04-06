import React from 'react';
import { Search, Edit2, Trash2, Clock, AlertTriangle, CheckCircle, BarChart, Send, Plus, Filter } from 'lucide-react';

const STATUS_OPTIONS = ['ALL', 'OPEN', 'IN_PROGRESS', 'WAITING', 'CLOSED'];
const PRIORITY_OPTIONS = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];

export default function TicketOperations({ 
  filteredTickets, 
  searchText, 
  setSearchText, 
  statusFilter, 
  setStatusFilter, 
  isAgent, 
  setEditingTicket, 
  handleDeleteTicket,
  handleCreateTicket,
  newTicket,
  setNewTicket,
  customers,
  user
}) {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/80 p-8 rounded-[2.5rem] border border-slate-200/50 shadow-sm backdrop-blur-xl group hover:shadow-2xl hover:shadow-indigo-500/5 transition-all">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Mission Control</h2>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time Operations Queue</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
        <div className="xl:col-span-8 space-y-8">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-4 p-4 bg-white/80 border border-slate-200/50 rounded-3xl backdrop-blur-xl shadow-sm">
                <div className="relative flex-1 min-w-[200px]">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                        value={searchText} 
                        onChange={e => setSearchText(e.target.value)} 
                        placeholder="Scan Sector IDs, Subjects, Urgency..." 
                        className="w-full pl-12 pr-6 py-3 bg-slate-50 border-0 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-medium"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter size={14} className="text-slate-400 ml-2" />
                    <select 
                        value={statusFilter} 
                        onChange={e => setStatusFilter(e.target.value)} 
                        className="bg-slate-50 border-0 rounded-2xl px-6 py-3 text-sm font-black uppercase tracking-widest text-indigo-600 outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all cursor-pointer"
                    >
                        {STATUS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-200/50 shadow-sm overflow-hidden backdrop-blur-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50">
                            <tr>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Telemetry Descriptor</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Urgency Protocol</th>
                                <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Current Phase</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredTickets.map(t => (
                                <tr key={t.id} className="group hover:bg-slate-50/50 transition-colors duration-200">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`h-10 w-10 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center font-black text-sm group-hover:scale-110 transition-all ${
                                                t.priority === 'CRITICAL' ? 'bg-rose-100 text-rose-600' : 
                                                t.priority === 'HIGH' ? 'bg-orange-100 text-orange-600' :
                                                'bg-indigo-100 text-indigo-600'
                                            }`}>
                                                {t.title?.[0]?.toUpperCase() || 'T'}
                                            </div>
                                            <div className="max-w-xs md:max-w-md overflow-hidden">
                                                <p className="font-black text-slate-900 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">{t.title}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 truncate">Origin ID: #{String(t.id).padStart(4, '0')} • Decrypted Description Leak: {t.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-black tracking-widest uppercase border transition-all duration-300 ${
                                            t.priority === 'CRITICAL' ? 'bg-rose-50 text-rose-600 border-rose-100 animate-pulse' :
                                            t.priority === 'HIGH' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                            'bg-indigo-50 text-indigo-600 border-indigo-100'
                                        }`}>
                                            {t.priority === 'CRITICAL' ? <AlertTriangle size={10} /> : <BarChart size={10} />}
                                            {t.priority}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-6">
                                            <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black tracking-[0.15em] uppercase border ${
                                                t.status === 'CLOSED' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 
                                                t.status === 'IN_PROGRESS' ? 'bg-cyan-50 text-cyan-600 border-cyan-100 shadow-[0_0_15px_rgba(6,182,212,0.1)]' :
                                                'bg-indigo-50 text-indigo-600 border-indigo-100'
                                            }`}>
                                                {t.status === 'CLOSED' ? <CheckCircle size={10} className="inline mr-1" /> : <Clock size={10} className="inline mr-1" />}
                                                {t.status}
                                            </span>
                                            {isAgent && (
                                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                                    <button onClick={() => setEditingTicket(t)} className="p-2.5 bg-white text-indigo-600 hover:bg-slate-900 hover:text-white rounded-xl border border-indigo-100 shadow-sm transition-all"><Edit2 size={12} /></button>
                                                    <button onClick={() => handleDeleteTicket(t.id)} className="p-2.5 bg-white text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl border border-rose-100 shadow-sm transition-all"><Trash2 size={12} /></button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredTickets.length === 0 && (
                        <div className="py-20 text-center">
                            <div className="h-20 w-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                                <Ticket className="text-slate-200" size={40} />
                            </div>
                            <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No signals found in the operational subspace.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

        <div className="xl:col-span-4 space-y-8">
            <form onSubmit={handleCreateTicket} className="bg-slate-950 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden group border border-white/5">
                <div className="relative z-10 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black text-white tracking-tighter">Fast Ticket</h3>
                        <div className="h-10 w-10 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                            <Send size={18} />
                        </div>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 -mt-4">Direct dispatch protocol</p>
                    
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                             <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2">Origin Vector</label>
                             <select 
                                value={newTicket.customerId} 
                                required 
                                onChange={e => setNewTicket({...newTicket, customerId: e.target.value})} 
                                className="w-full bg-slate-900 border border-white/5 rounded-2xl p-4 outline-none text-sm text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 font-bold appearance-none transition-all"
                            >
                                {isAgent ? (
                                    <>
                                        <option value="" disabled>Select Sector Entity...</option>
                                        {customers.length > 0 ? (
                                            customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)
                                        ) : (
                                            <option disabled>No sector signals found</option>
                                        )}
                                    </>
                                ) : (
                                    <option value={newTicket.customerId}>
                                        {newTicket.customerId ? user.email : `${user.email || 'Detecting Identity'} (ID Pending...)`}
                                    </option>
                                )}
                            </select>
                        </div>

                        <div className="space-y-1.5">
                             <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2">Signal Subject</label>
                             <input 
                                value={newTicket.title} 
                                required 
                                onChange={e => setNewTicket({...newTicket, title: e.target.value})} 
                                className="w-full bg-slate-900 border border-white/5 rounded-2xl p-4 outline-none text-sm text-white focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium placeholder:text-slate-700" 
                                placeholder="E.g. Network Entropy Pulse" 
                            />
                        </div>

                        <div className="space-y-1.5">
                             <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2">Telemetry Detail</label>
                             <textarea 
                                value={newTicket.description} 
                                onChange={e => setNewTicket({...newTicket, description: e.target.value})} 
                                className="w-full bg-slate-900 border border-white/5 rounded-2xl p-4 outline-none text-sm text-white focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium placeholder:text-slate-700 h-28" 
                                placeholder="Describe the anomaly..." 
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2">Urgency</label>
                                <select 
                                    value={newTicket.priority} 
                                    onChange={e => setNewTicket({...newTicket, priority: e.target.value})} 
                                    className="w-full bg-slate-900 border border-white/5 rounded-2xl p-4 outline-none text-[10px] font-black uppercase tracking-widest text-indigo-400 focus:ring-2 focus:ring-indigo-500/50 transition-all cursor-pointer"
                                >
                                    {PRIORITY_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-2">State</label>
                                <select 
                                    value={newTicket.status} 
                                    onChange={e => setNewTicket({...newTicket, status: e.target.value})} 
                                    className="w-full bg-slate-900 border border-white/5 rounded-2xl p-4 outline-none text-[10px] font-black uppercase tracking-widest text-indigo-400 focus:ring-2 focus:ring-indigo-500/50 transition-all cursor-pointer"
                                >
                                    {STATUS_OPTIONS.filter(o => o !== 'ALL').map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <button className="w-full mt-6 py-5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3">
                        <Send size={14} />
                        Dispatch Signal
                    </button>
                    <p className="text-center text-[9px] font-black uppercase tracking-[0.4em] text-slate-700 py-2">Operational Authorization Required</p>
                </div>

                {/* Cyber Background Accents */}
                <div className="absolute top-0 right-0 h-40 w-40 bg-indigo-500/10 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 h-40 w-40 bg-indigo-500/5 rounded-full blur-[100px] transition-transform duration-700" />
            </form>

            <div className="bg-white border border-slate-200/50 p-8 rounded-[2.5rem] shadow-sm relative overflow-hidden group">
                 <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">Security Integrity</h3>
                        <div className="text-4xl font-black tracking-tighter text-slate-900 mb-2">99.8%</div>
                        <p className="text-xs font-bold text-slate-500 tracking-tight">Active encryption protocols verified in all sectors.</p>
                    </div>
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
}
