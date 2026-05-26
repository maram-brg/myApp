import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Dashboard: React.FC = () => {
    const { user, token, logout } = useAuth();
    const navigate = useNavigate();
    const [revealToken, setRevealToken] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
            navigate('/spa/login');
        } catch (error) {
            // Error ignored
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans">
            <nav className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center space-x-3">
                            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center font-bold text-white tracking-wider">
                                S
                            </div>
                            <span className="font-bold text-lg text-white tracking-tight">SanctumAuth</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-zinc-400 font-medium hidden md:inline">
                                Connected as <span className="text-white">{user?.name}</span>
                            </span>
                            <button
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700/80 rounded-lg border border-zinc-700/50 transition-all duration-300 flex items-center space-x-1.5 disabled:opacity-50"
                            >
                                {isLoggingOut ? (
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-transparent"></div>
                                ) : (
                                    <span>Sign Out</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
                <div className="relative mb-10 p-8 rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-950 overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 h-[250px] w-[250px] rounded-full bg-violet-600/5 blur-[80px] pointer-events-none"></div>
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-white">Secure Dashboard</h1>
                            <p className="mt-2 text-zinc-400 text-sm md:text-base">
                                Welcome back, <span className="text-violet-400 font-semibold">{user?.name}</span>. You are successfully authenticated using Laravel Sanctum.
                            </p>
                        </div>
                        <div className="flex items-center space-x-3 bg-zinc-800/40 px-4 py-2.5 rounded-xl border border-zinc-700/30">
                            <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">API Session Active</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm shadow-md">
                            <h3 className="text-lg font-bold text-white mb-4">Bearer Token Details</h3>
                            <p className="text-sm text-zinc-400 mb-5 leading-relaxed">
                                Below is the active personal access token stored in <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-violet-400 text-xs font-semibold">localStorage</code> and transmitted in the request headers as a <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-violet-400 text-xs font-semibold">Bearer Token</code>.
                            </p>

                            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800/80 flex flex-col space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Active Token</span>
                                    <button
                                        onClick={() => setRevealToken(!revealToken)}
                                        className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors focus:outline-none"
                                    >
                                        {revealToken ? 'Hide Token' : 'Reveal Token'}
                                    </button>
                                </div>
                                <div className="font-mono text-xs break-all bg-zinc-900/50 p-3 rounded-lg border border-zinc-800 text-zinc-300 min-h-[40px] flex items-center select-all">
                                    {revealToken ? token : '••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••'}
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm shadow-md">
                            <h3 className="text-lg font-bold text-white mb-4">Protected API Verification</h3>
                            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                                Sanctum routes are protected by the <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-violet-400 text-xs font-semibold">auth:sanctum</code> middleware guard. Any request lacking a valid bearer token will be rejected with a <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-red-400 text-xs font-semibold">401 Unauthorized</code> status.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-start space-x-3.5">
                                    <div className="h-8 w-8 rounded-lg bg-violet-600/10 flex items-center justify-center text-violet-400 font-bold text-sm">
                                        H
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-white">Header Injection</h4>
                                        <p className="text-xs text-zinc-500 mt-1">Authorization: Bearer [token]</p>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-start space-x-3.5">
                                    <div className="h-8 w-8 rounded-lg bg-indigo-600/10 flex items-center justify-center text-indigo-400 font-bold text-sm">
                                        S
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-white">Server-Side Auth</h4>
                                        <p className="text-xs text-zinc-500 mt-1">Validated via PersonalAccessToken</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-sm shadow-md flex flex-col items-center text-center">
                            <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg mb-4">
                                {user?.name.charAt(0).toUpperCase()}
                            </div>
                            <h3 className="text-lg font-bold text-white">{user?.name}</h3>
                            <p className="text-xs text-zinc-500 mt-1">{user?.email}</p>

                            <div className="w-full border-t border-zinc-800 my-6"></div>

                            <div className="w-full space-y-4 text-left">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-zinc-500 font-semibold uppercase tracking-wider">User ID</span>
                                    <span className="font-mono text-zinc-300 font-bold">{user?.id}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-zinc-500 font-semibold uppercase tracking-wider">Account Created</span>
                                    <span className="text-zinc-300 font-medium">
                                        {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-zinc-500 font-semibold uppercase tracking-wider">Auth Mechanism</span>
                                    <span className="text-violet-400 font-bold">Sanctum Token</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
export default Dashboard;
