import React from 'react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';

export default function DashboardLayout({ 
  children, 
  errorMessage, 
  setErrorMessage, 
  successMessage, 
  setSuccessMessage,
  isAddingCustomer,
  setIsAddingCustomer,
  editingCustomer,
  setEditingCustomer,
  editingTicket,
  setEditingTicket,
  handleCreateCustomer,
  handleUpdateCustomer,
  handleUpdateTicket,
  newCustomer,
  setNewCustomer,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS
}) {
  const Modal = ({ title, onClose, children }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
        <div className="w-full max-w-md bg-white rounded-[3rem] p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden group border border-white/20">
            <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-slate-900 tracking-tighter">{title}</h2>
                <button onClick={onClose} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all">
                    <X size={20} />
                </button>
            </div>
            {children}
            <div className="absolute -bottom-10 -right-10 h-40 w-40 bg-indigo-500/5 rounded-full blur-[80px]" />
        </div>
    </div>
  );

  return (
    <div className="flex-1 relative">
      {/* Notifications Overlay */}
      {(errorMessage || successMessage) && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[60] w-full max-w-xl px-4 pointer-events-none">
            <div className={`pointer-events-auto flex items-center justify-between p-6 rounded-[2rem] border shadow-2xl animate-in slide-in-from-top-10 duration-500 transition-all ${
                errorMessage ? 'bg-rose-50/90 border-rose-100 text-rose-700 backdrop-blur-xl' : 'bg-emerald-50/90 border-emerald-100 text-emerald-700 backdrop-blur-xl'
            }`}>
              <div className="flex items-center gap-4">
                {errorMessage ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
                <p className="text-sm font-black uppercase tracking-widest">{errorMessage || successMessage}</p>
              </div>
              <button onClick={() => {setErrorMessage(''); setSuccessMessage('');}} className="p-2 hover:bg-black/5 rounded-xl transition-all">
                <X size={16} />
              </button>
            </div>
        </div>
      )}

      {children}

      {/* Modals */}
      {isAddingCustomer && (
        <Modal title="Onboard Sector Client" onClose={() => setIsAddingCustomer(false)}>
            <form onSubmit={handleCreateCustomer} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">Identity Name</label>
                    <input 
                        value={newCustomer.name} 
                        onChange={e => setNewCustomer({...newCustomer, name: e.target.value})} 
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-sm font-bold placeholder:text-slate-300" 
                        placeholder="E.g. Dr. Alistair Sector" 
                        required 
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">Contact Vector</label>
                    <input 
                        type="email" 
                        value={newCustomer.email} 
                        onChange={e => setNewCustomer({...newCustomer, email: e.target.value})} 
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-sm font-bold placeholder:text-slate-300" 
                        placeholder="alistair@apex.corp" 
                        required 
                    />
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">Organization</label>
                        <input 
                            value={newCustomer.company} 
                            onChange={e => setNewCustomer({...newCustomer, company: e.target.value})} 
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none text-sm font-bold placeholder:text-slate-300" 
                            placeholder="Apex Corp" 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">Market Segment</label>
                        <select 
                            value={newCustomer.segment} 
                            onChange={e => setNewCustomer({...newCustomer, segment: e.target.value})} 
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none text-[10px] font-black uppercase tracking-widest text-indigo-600 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                        >
                            <option value="">Select Segment</option>
                            <option value="ENTERPRISE">Enterprise</option>
                            <option value="SME">SME</option>
                            <option value="GOVERNMENT">Government</option>
                            <option value="INDIVIDUAL">Individual</option>
                        </select>
                    </div>
                </div>
                <button className="w-full mt-4 py-5 bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                    Register Entity
                </button>
            </form>
        </Modal>
      )}

      {editingCustomer && (
        <Modal title="Sync Identity Trace" onClose={() => setEditingCustomer(null)}>
            <form onSubmit={handleUpdateCustomer} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">Identity Name</label>
                    <input 
                        value={editingCustomer.name} 
                        onChange={e => setEditingCustomer({...editingCustomer, name: e.target.value})} 
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-sm font-bold" 
                        required 
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">Organization</label>
                    <input 
                        value={editingCustomer.company || ''} 
                        onChange={e => setEditingCustomer({...editingCustomer, company: e.target.value})} 
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none text-sm font-bold" 
                    />
                </div>
                <button className="w-full mt-4 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                    Synchronize Vector
                </button>
            </form>
        </Modal>
      )}

      {editingTicket && (
        <Modal title="Signal Modification" onClose={() => setEditingTicket(null)}>
            <form onSubmit={handleUpdateTicket} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">Signal Subject</label>
                    <input 
                        value={editingTicket.title} 
                        onChange={e => setEditingTicket({...editingTicket, title: e.target.value})} 
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none text-sm font-bold" 
                        required 
                    />
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">Urgency</label>
                        <select 
                            value={editingTicket.priority} 
                            onChange={e => setEditingTicket({...editingTicket, priority: e.target.value})} 
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none text-[10px] font-black uppercase tracking-widest text-indigo-600 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                        >
                            {PRIORITY_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">Protcol Level</label>
                        <select 
                            value={editingTicket.status} 
                            onChange={e => setEditingTicket({...editingTicket, status: e.target.value})} 
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none text-[10px] font-black uppercase tracking-widest text-indigo-600 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                        >
                            {STATUS_OPTIONS.filter(o => o !== 'ALL').map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                </div>
                <button className="w-full mt-4 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                    Commit Signal Change
                </button>
            </form>
        </Modal>
      )}
    </div>
  );
}
