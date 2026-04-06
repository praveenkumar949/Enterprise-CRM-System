import React from 'react';
import { Search, Plus, Edit2, Trash2, Mail, Phone, Briefcase, ExternalLink, Filter } from 'lucide-react';

export default function CustomerPortfolio({ customers, setIsAddingCustomer, setEditingCustomer, handleDeleteCustomer, searchText, setSearchText }) {
  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(searchText.toLowerCase()) || 
    c.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/80 p-8 rounded-[2.5rem] border border-slate-200/50 shadow-sm backdrop-blur-xl">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Client Ecosystem</h2>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Strategic Asset Portfolio</p>
        </div>
        <div className="flex items-center gap-4">
            <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    placeholder="Search Portfolio..." 
                    className="pl-12 pr-6 py-3 bg-slate-50 border border-slate-200/60 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-medium w-64"
                />
            </div>
            <button 
                onClick={() => setIsAddingCustomer(true)} 
                className="group flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all"
            >
                <Plus size={16} />
                Onboard Client
            </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200/50 shadow-sm overflow-hidden backdrop-blur-xl">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Ledger Index</h3>
            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">
                <Filter size={12} />
                Advanced Filters
            </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Identity</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Organization</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Contact Vectors</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Market Segment</th>
                <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Management</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c) => (
                <tr key={c.id} className="group hover:bg-slate-50/50 transition-colors duration-200">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-slate-100 to-slate-200 flex items-center justify-center text-slate-600 font-black text-sm group-hover:from-indigo-100 group-hover:to-indigo-50 group-hover:text-indigo-600 transition-all duration-300">
                        {c.name[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 tracking-tight leading-none">{c.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">ID: #{String(c.id).padStart(4, '0')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Briefcase size={14} className="text-slate-300" />
                      <span className="text-sm font-bold tracking-tight">{c.company || 'Private Entity'}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                        <Mail size={12} className="text-slate-300" />
                        {c.email}
                      </div>
                      {c.phone && (
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                          <Phone size={12} className="text-slate-300" />
                          {c.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm font-black tracking-widest uppercase truncate max-w-[150px]">
                    <span className={`px-3 py-1 rounded-full text-[9px] ${
                        c.segment === 'ENTERPRISE' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' :
                        c.segment === 'SME' ? 'bg-cyan-50 text-cyan-600 border border-cyan-100' :
                        'bg-slate-50 text-slate-600 border border-slate-100'
                    }`}>
                        {c.segment || 'General'}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                      <button 
                        onClick={() => setEditingCustomer(c)} 
                        className="p-2.5 bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-xl border border-indigo-100 shadow-sm transition-all"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => handleDeleteCustomer(c.id)} 
                        className="p-2.5 bg-white text-rose-600 hover:bg-rose-600 hover:text-white rounded-xl border border-rose-100 shadow-sm transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                      <button className="p-2.5 bg-white text-slate-400 hover:bg-slate-900 hover:text-white rounded-xl border border-slate-100 shadow-sm transition-all">
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-20 text-center">
                <div className="h-16 w-16 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <Search className="text-slate-200" size={32} />
                </div>
                <p className="text-slate-400 font-bold tracking-tight">Zero matching entities in localized database.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
