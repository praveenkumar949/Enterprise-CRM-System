import React, { useState } from 'react';
import { authRequest, friendlyErrorMessage } from '../api/axios';
import { 
  Mail, 
  Lock, 
  AlertCircle, 
  ArrowRight, 
  ShieldCheck, 
  Eye, 
  EyeOff 
} from 'lucide-react';

export default function Login({ setToken }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resetCode, setResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [authMode, setAuthMode] = useState('login'); // login, register, forgot, reset
    const [registerRole, setRegisterRole] = useState('customer');
    const [showPassword, setShowPassword] = useState(false);
    
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInitialAuth = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setIsLoading(true);
        try {
            if (authMode === 'login') {
                const response = await authRequest({
                    method: 'post',
                    url: '/auth/login',
                    data: { email, password },
                });
                completeLogin(response.data.token);
            } else {
                const response = await authRequest({
                    method: 'post',
                    url: `/auth/register/${registerRole}`,
                    data: { email, password },
                });
                completeLogin(response.data.token);
            }
        } catch (err) {
            setError(friendlyErrorMessage(err, 'Authentication failed. Internal server error.'));
        } finally {
            setIsLoading(false);
        }
    };


    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await authRequest({
                method: 'post',
                url: `/auth/password/forgot?email=${encodeURIComponent(email)}`,
            });
            setAuthMode('reset');
            setMessage('Recovery code sent to terminal console.');
        } catch (err) {
            setError('Account not found in our directory.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            await authRequest({
                method: 'post',
                url: `/auth/password/reset?email=${encodeURIComponent(email)}&resetCode=${resetCode}&newPassword=${newPassword}`,
            });
            setAuthMode('login');
            setMessage('Password successfully rotated. You can now sign in.');
        } catch (err) {
            setError('Invalid recovery code or expired session.');
        } finally {
            setIsLoading(false);
        }
    };

    const completeLogin = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
    };

    return (
        <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-slate-950">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
            <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-indigo-600 opacity-20 blur-[120px] mix-blend-screen pointer-events-none animate-pulse"></div>
            <div className="absolute -bottom-40 -left-60 h-[600px] w-[800px] rounded-full bg-blue-600 opacity-20 blur-[120px] mix-blend-screen pointer-events-none animate-pulse" style={{ animationDelay: '2s' }}></div>
            
            <div className="z-10 w-full max-w-md p-8 sm:p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl">
                <div className="mb-10 text-center flex flex-col items-center">
                    <div className="h-16 w-16 bg-gradient-to-tr from-indigo-500 to-cyan-400 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                        <ShieldCheck size={32} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
                        {authMode === 'reset' ? 'Security Recovery' : 'Work Identity'}
                    </h1>
                    <p className="text-sm font-medium text-slate-400">
                        Enterprise Access Control & Management
                    </p>
                </div>

                {error && (
                    <div className="mb-6 flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm font-medium text-rose-300 backdrop-blur-sm animate-in fade-in slide-in-from-top-2">
                        <AlertCircle size={18} className="text-rose-400 shrink-0 mt-0.5" />
                        <p>{error}</p>
                    </div>
                )}
                {message && (
                    <div className="mb-6 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm font-medium text-emerald-300">
                        {message}
                    </div>
                )}

                { (authMode === 'login' || authMode === 'register') && (
                    <>
                        <div className="mb-6 grid grid-cols-2 rounded-xl border border-white/10 bg-white/5 p-1">
                            <button
                                type="button"
                                onClick={() => setAuthMode('login')}
                                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${authMode === 'login' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-white/10'}`}
                            >
                                Sign In
                            </button>
                            <button
                                type="button"
                                onClick={() => setAuthMode('register')}
                                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${authMode === 'register' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-white/10'}`}
                            >
                                Register
                            </button>
                        </div>

                        <form onSubmit={handleInitialAuth} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-slate-300">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400" size={18} />
                                    <input 
                                        type="email" 
                                        value={email} 
                                        onChange={e => setEmail(e.target.value)}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 pl-11 p-3 text-white outline-none focus:border-indigo-500" 
                                        placeholder="name@company.com"
                                        required 
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-1.5">
                                <div className="flex justify-between">
                                    <label className="block text-sm font-medium text-slate-300">Password</label>
                                    {authMode === 'login' && (
                                        <button 
                                            type="button" 
                                            onClick={() => setAuthMode('forgot')}
                                            className="text-xs font-bold text-indigo-400 hover:text-indigo-300"
                                        >
                                            Forgot?
                                        </button>
                                    )}
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                    <input 
                                        type={showPassword ? 'text' : 'password'}
                                        value={password} 
                                        onChange={e => setPassword(e.target.value)}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 px-11 p-3 text-white outline-none focus:border-indigo-500" 
                                        placeholder="••••••••"
                                        required 
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {authMode === 'register' && (
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-slate-300">Register As</label>
                                    <select
                                        value={registerRole}
                                        onChange={(e) => setRegisterRole(e.target.value)}
                                        className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-indigo-500"
                                    >
                                        <option className="text-slate-900" value="customer">Customer Access</option>
                                        <option className="text-slate-900" value="agent">Support Agent Access</option>
                                    </select>
                                </div>
                            )}
                            
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full py-3.5 px-4 mt-6 text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50"
                            >
                                {isLoading ? 'Authenticating...' : (authMode === 'login' ? 'Sign In' : 'Create Account')}
                            </button>
                        </form>
                    </>
                 )}

                {authMode === 'forgot' && (
                    <form onSubmit={handleForgotPassword} className="space-y-6">
                        <div className="text-center">
                            <h2 className="text-xl font-bold text-white">Identity Recovery</h2>
                            <p className="text-sm text-slate-400 mt-1">Confirm your work email to proceed.</p>
                        </div>
                        <div className="relative group">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input 
                                type="email" 
                                value={email} 
                                onChange={e => setEmail(e.target.value)}
                                className="w-full rounded-xl border border-white/10 bg-white/5 pl-11 p-3 text-white outline-none focus:border-indigo-500" 
                                placeholder="name@company.com"
                                required 
                            />
                        </div>
                        <div className="space-y-3">
                            <button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full py-3.5 text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500"
                            >
                                Request Recovery Code
                            </button>
                            <button type="button" onClick={() => setAuthMode('login')} className="w-full text-sm font-medium text-slate-400">Return to sign in</button>
                        </div>
                    </form>
                )}

                {authMode === 'reset' && (
                    <form onSubmit={handleResetPassword} className="space-y-5">
                        <div className="text-center mb-6">
                            <h2 className="text-xl font-bold text-white">Finalize Rotation</h2>
                        </div>
                        <input 
                            name="resetCode"
                            value={resetCode} 
                            onChange={e => setResetCode(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-indigo-500" 
                            placeholder="4-digit Recovery Code"
                            required 
                        />
                        <input 
                            type="password"
                            value={newPassword} 
                            onChange={e => setNewPassword(e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-white outline-none focus:border-indigo-500" 
                            placeholder="New Secure Password"
                            required 
                        />
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full py-3.5 text-sm font-bold rounded-xl text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/20"
                        >
                            Rotate Password
                        </button>
                    </form>
                )}

                <div className="mt-8 border-t border-white/10 pt-6 text-center">
                    <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5 font-semibold tracking-wider uppercase">
                        <Lock size={12} />
                        Identity Provisioning Active
                    </p>
                </div>
            </div>
        </div>
    );
}
