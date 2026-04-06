import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Phone, Briefcase, Save, ShieldCheck, CheckCircle2, UserPlus } from 'lucide-react';

export default function Profile({ user, profile, handleUpdateProfile, handleCreateProfile }) {
  const [editData, setEditData] = useState({
    name: '',
    phone: '',
    company: '',
    segment: ''
  });

  useEffect(() => {
    if (profile) {
      setEditData({
        name: profile.name || '',
        phone: profile.phone || '',
        company: profile.company || '',
        segment: profile.segment || ''
      });
    }
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (profile && profile.id) {
        handleUpdateProfile(profile.id, editData);
    } else {
        handleCreateProfile({ ...editData, email: user.email });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Header Card */}
      <div className="relative overflow-hidden bg-slate-950 p-10 rounded-[3rem] text-white shadow-2xl group border border-white/5">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="relative group">
            <div className="h-32 w-32 rounded-3xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-5xl font-black shadow-2xl shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-500">
                {user.email[0].toUpperCase()}
            </div>
            <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-emerald-500 rounded-2xl border-4 border-slate-950 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <ShieldCheck size={20} />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-2">
                <h2 className="text-4xl font-black tracking-tighter leading-none">{profile?.name || 'Anonymous Entity'}</h2>
                <span className="px-4 py-1.5 rounded-xl bg-indigo-500/20 text-indigo-300 text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-500/30">
                    {user.role}
                </span>
            </div>
            <p className="text-slate-400 font-bold tracking-tight mb-6 flex items-center justify-center md:justify-start gap-2">
                <Mail size={16} className="text-slate-500" />
                {user.email}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-8 border-t border-white/5 pt-6 mt-2">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 leading-none">Status</span>
                    <span className="text-sm font-black text-emerald-400 flex items-center gap-1.5 uppercase tracking-widest italic">
                        <CheckCircle2 size={12} strokeWidth={3} />
                        Active Sector Sync
                    </span>
                </div>
                <div className="flex flex-col border-l border-white/5 pl-8">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 leading-none">Clearance</span>
                    <span className="text-sm font-black text-indigo-400 uppercase tracking-widest">Global Ops Level 4</span>
                </div>
            </div>
          </div>
        </div>

        {/* Cyber Accents */}
        <div className="absolute top-0 right-0 h-full w-1/3 bg-indigo-500/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-2/3 w-1/2 bg-indigo-500/5 blur-[120px] pointer-events-none" />
      </div>

      {/* Profile Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200/50 p-10 rounded-[3rem] shadow-sm">
                <div className="flex items-center gap-4 mb-10">
                    <div className="h-12 w-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                        <User size={24} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tighter italic">Identity Management</h3>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-0.5">Control your operational parameters</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 flex items-center gap-2">
                                <User size={12} className="text-indigo-400" />
                                Legal Descriptor (Full Name)
                            </label>
                            <input 
                                value={editData.name}
                                onChange={e => setEditData({...editData, name: e.target.value})}
                                required 
                                className="w-full bg-slate-50/50 border border-slate-200/50 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-sm font-bold shadow-sm" 
                                placeholder="E.g. J. Arliss" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 flex items-center gap-2">
                                <Phone size={12} className="text-indigo-400" />
                                Sector Vector (Phone)
                            </label>
                            <input 
                                value={editData.phone}
                                onChange={e => setEditData({...editData, phone: e.target.value})}
                                className="w-full bg-slate-50/50 border border-slate-200/50 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-sm font-bold shadow-sm" 
                                placeholder="+1 (Sector) XXX-XXXX" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 flex items-center gap-2">
                                <Briefcase size={12} className="text-indigo-400" />
                                Corporate Identity
                            </label>
                            <input 
                                value={editData.company}
                                onChange={e => setEditData({...editData, company: e.target.value})}
                                className="w-full bg-slate-50/50 border border-slate-200/50 rounded-2xl p-4 outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all text-sm font-bold shadow-sm" 
                                placeholder="Apex Corp / SME" 
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 flex items-center gap-2">
                                <Shield size={12} className="text-indigo-400" />
                                Market Priority
                            </label>
                            <select 
                                value={editData.segment}
                                onChange={e => setEditData({...editData, segment: e.target.value})}
                                className="w-full bg-slate-50/50 border border-slate-200/50 rounded-2xl p-4 outline-none text-xs font-black uppercase tracking-widest text-indigo-600 focus:ring-4 focus:ring-indigo-500/5 transition-all shadow-sm"
                            >
                                <option value="">Select Priority Segment</option>
                                <option value="ENTERPRISE">Global Enterprise</option>
                                <option value="SME">Strategic SME</option>
                                <option value="GOVERNMENT">Public Sector</option>
                                <option value="INDIVIDUAL">Private Node</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button className="flex items-center justify-center gap-3 w-full md:w-auto px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all">
                            {profile && profile.id ? (
                                <><Save size={14} /> Synchronize Vector</>
                            ) : (
                                <><UserPlus size={14} /> Initialize Identity</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div className="space-y-8">
            <div className="bg-slate-50/50 border border-slate-200/20 p-8 rounded-[2.5rem] shadow-inner relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 italic">Security Integrity</h3>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Protocol Ver</span>
                            <span className="text-[10px] font-black text-slate-900 border border-slate-200 bg-white px-2 py-0.5 rounded-lg">v4.2.RC</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">MFA State</span>
                            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">SECURED</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Encryption</span>
                            <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg uppercase tracking-wider italic">Sha-256 Poly</span>
                        </div>
                    </div>
                </div>
                <div className="absolute -bottom-10 -left-10 h-32 w-32 bg-indigo-500/5 rounded-full blur-2xl" />
            </div>

            <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
                <h3 className="text-lg font-black tracking-tighter mb-2 italic">Support Portal</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-200 mb-6">Internal Technical Link</p>
                <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 transition-all">
                    Generate Access Key
                </button>
                <div className="absolute -bottom-20 -right-20 h-52 w-52 bg-white/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-1000" />
            </div>
        </div>
      </div>
    </div>
  );
}
