import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Login: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setIsLoading(true);

        try {
            await login(email, password);
            navigate('/spa/dashboard');
        } catch (error: any) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                setErrors({ email: ['Unable to authenticate. Please check your credentials or network connection.'] });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4">
            <div className="absolute top-1/4 left-1/4 h-[350px] w-[350px] rounded-full bg-violet-600/10 blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 h-[350px] w-[350px] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none"></div>

            <div className="relative w-full max-w-md rounded-2xl border border-zinc-800/80 bg-zinc-900/45 p-8 backdrop-blur-xl shadow-2xl">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-white">Welcome Back</h2>
                    <p className="mt-2 text-sm text-zinc-400">Sign in to access your secure dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:border-violet-500/80 focus:ring-1 focus:ring-violet-500/80"
                            placeholder="you@example.com"
                        />
                        {errors.email && (
                            <p className="mt-1.5 text-xs text-red-400">{errors.email[0]}</p>
                        )}
                    </div>

                    <div>
                        <div className="flex justify-between">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">Password</label>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-2 w-full rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:border-violet-500/80 focus:ring-1 focus:ring-violet-500/80"
                            placeholder="••••••••"
                        />
                        {errors.password && (
                            <p className="mt-1.5 text-xs text-red-400">{errors.password[0]}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="relative flex w-full justify-center rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:from-violet-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 disabled:opacity-50"
                    >
                        {isLoading ? (
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-zinc-400">
                    Don't have an account?{' '}
                    <Link to="/spa/register" className="font-medium text-violet-400 transition-colors hover:text-violet-300">
                        Create account
                    </Link>
                </p>
            </div>
        </div>
    );
};
export default Login;
