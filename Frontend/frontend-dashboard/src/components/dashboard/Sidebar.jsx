import React from 'react';
import {
  LayoutDashboard,
  Users,
  Ticket,
  Bell,
  LogOut,
  X,
  ClipboardList,
  User
} from 'lucide-react';

export default function Sidebar({ user, isAgent, activeTab, setActiveTab, setIsSidebarOpen, isSidebarOpen, handleLogout }) {
  const NavButton = ({ tab, icon: Icon, label }) => (
    <button
      onClick={() => {
        setActiveTab(tab);
        if (window.innerWidth < 1024) setIsSidebarOpen(false);
      }}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
        activeTab === tab
          ? 'bg-indigo-600/20 text-indigo-400 shadow-[inset_0_0_20px_rgba(79,70,229,0.1)]'
          : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
      }`}
    >
      <Icon size={18} className={activeTab === tab ? 'text-indigo-400' : 'text-slate-500'} />
      {label}
    </button>
  );

  return (
    <>
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform bg-slate-950/80 backdrop-blur-2xl border-r border-white/5 text-slate-100 transition-all duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/5 px-8 py-6">
          <h1 className="text-2xl font-black tracking-tighter">
            Apex<span className="text-indigo-500">CRM</span>
          </h1>
          <X className="lg:hidden cursor-pointer text-slate-400 hover:text-white" onClick={() => setIsSidebarOpen(false)} />
        </div>

        <div className="flex h-[calc(100%-80px)] flex-col justify-between overflow-y-auto custom-scrollbar">
          <nav className="space-y-8 px-4 py-8">
            {isAgent && (
              <div>
                <p className="mb-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Command Center</p>
                <div className="space-y-1">
                    <NavButton tab="dashboard" icon={LayoutDashboard} label="Strategic Overview" />
                    <NavButton tab="analytics" icon={ClipboardList} label="Performance Intel" />
                </div>
              </div>
            )}

            <div>
              <p className="mb-4 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Operations</p>
              <div className="space-y-1">
                {isAgent && <NavButton tab="customers" icon={Users} label="Customer Portfolio" />}
                <NavButton tab="tickets" icon={Ticket} label={isAgent ? 'Dispatch Queue' : 'Support Tickets'} />
                <NavButton tab="tasks" icon={ClipboardList} label="Task Manager" />
                <NavButton tab="profile" icon={User} label="Profile Portal" />
                <NavButton tab="notifications" icon={Bell} label="Activity Grid" />
              </div>
            </div>
          </nav>

          <div className="mt-auto border-t border-white/5 px-6 py-8 bg-black/20">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white font-black text-lg shadow-lg shadow-indigo-500/20">
                {user.email[0]?.toUpperCase() || 'U'}
              </div>
              <div className="overflow-hidden">
                <p className="truncate text-sm font-bold text-white leading-tight">{user.email}</p>
                <p className="mt-1 text-[10px] font-black uppercase text-indigo-400 tracking-widest leading-none">
                  {user.role}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-rose-500/5 py-3 text-xs font-black uppercase tracking-widest text-rose-400 border border-rose-500/10 hover:bg-rose-500/20 hover:border-rose-500/30 transition-all active:scale-95"
            >
              <LogOut size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              End Session
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
