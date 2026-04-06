import React from 'react';
import { Menu, Search, Bell, RefreshCw } from 'lucide-react';

export default function Header({ activeTab, isRefreshing, fetchDashboardData, setIsSidebarOpen, searchText, setSearchText }) {
  const getBreadcrumb = () => {
    const map = {
      dashboard: 'Strategic Telemetry',
      analytics: 'Intelligence Assets',
      customers: 'Client Ecosystem',
      tickets: 'Operations Queue',
      tasks: 'Mission Control',
      notifications: 'Activity Stream'
    };
    return map[activeTab] || 'Command Center';
  };

  return (
    <header className="sticky top-0 z-20 bg-slate-100/60 backdrop-blur-3xl border-b border-slate-200/50 px-8 py-6 flex items-center justify-between">
      <div className="flex items-center gap-6">
        <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-slate-500 hover:text-slate-900 transition-colors">
          <Menu size={24} />
        </button>
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter leading-none">{getBreadcrumb()}</h2>
          <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400 leading-none">Apex Control Interface</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            value={searchText} 
            onChange={e => setSearchText(e.target.value)}
            placeholder="Global Search Protocol..." 
            className="w-72 pl-12 pr-6 py-3 bg-white border border-slate-200/60 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm font-medium shadow-sm"
          />
        </div>

        <div className="flex items-center gap-4 border-l border-slate-200/80 pl-6 ml-2">
            <button 
                onClick={() => fetchDashboardData(true)} 
                className={`p-3 text-slate-500 hover:text-indigo-600 hover:bg-white rounded-xl transition-all shadow-sm ${isRefreshing ? 'animate-spin text-indigo-500 ring-2 ring-indigo-500/10 bg-white' : 'bg-slate-50'}`}
            >
                <RefreshCw size={20} />
            </button>
            <div className="relative group">
                <button className="p-3 bg-slate-50 text-slate-500 hover:text-rose-500 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-rose-100">
                    <Bell size={20} />
                    <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
                </button>
            </div>
        </div>
      </div>
    </header>
  );
}
