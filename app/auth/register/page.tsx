'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Register() {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const goBack = () => router.push('/');
    const goLogin = () => router.push('/auth/login');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setLoading(true);
        try {
            // 1. Sign up the user (creates record in `auth.users`)
            const {
                data: { user, session },
                error: signUpError,
            } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        fname: fname,
                        lname: lname,
                    },
                },
            });

            if (signUpError) throw signUpError;
            if (!user) throw new Error('User not returned');

            // 2. Insert profile row into custom `users` table (adjust table/columns if different)
            // Assumes you created a table `users` with columns: id (uuid PK), first_name, last_name, email, created_at
            const { error: insertError } = await supabase.from('users').insert({
                fname,
                lname,
                email,
                password,
            });
            if (insertError) throw insertError;

            setSuccess(true);
            // Optional: redirect to login or tasks after slight delay
            setTimeout(() => goLogin(), 1200);
        } catch (err: any) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
            {/* Header */}
            <header className="w-full p-6 flex justify-between items-center">
                <button
                    onClick={goBack}
                    className="cursor-pointer px-6 py-2 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                    ← BACK
                </button>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Task Manager
                </h2>
            </header>

            {/* Main */}
            <main className="flex-1 flex flex-col items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <div className="bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-200">
                        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Create Account
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label htmlFor="fname" className="block text-sm font-semibold text-gray-700">First Name</label>
                                    <input
                                        id="fname"
                                        type="text"
                                        value={fname}
                                        onChange={(e) => setFname(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lname" className="block text-sm font-semibold text-gray-700">Last Name</label>
                                    <input
                                        id="lname"
                                        type="text"
                                        value={lname}
                                        onChange={(e) => setLname(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                                />
                            </div>

                            {error && (
                                <div className="px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div className="px-4 py-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
                                    Account created! Redirecting...
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-6 py-3 bg-blue-600 disabled:bg-blue-300 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                {loading ? 'Creating...' : 'Register'}
                            </button>
                        </form>
                        <div className="mt-6 text-center text-gray-600 text-sm">
                            Already have an account?{' '}
                            <button onClick={goLogin} className="text-blue-600 hover:text-blue-700 font-semibold">Login</button>
                        </div>
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow">
                            <div className="text-2xl mb-1">🔐</div>
                            <p className="text-xs text-gray-600 font-medium">Encrypted</p>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow">
                            <div className="text-2xl mb-1">⚡</div>
                            <p className="text-xs text-gray-600 font-medium">Fast</p>
                        </div>
                        <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow">
                            <div className="text-2xl mb-1">🛡️</div>
                            <p className="text-xs text-gray-600 font-medium">Protected</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full py-6 text-center bg-white/50 backdrop-blur-sm border-t border-gray-200">
                <p className="text-gray-600 text-sm">&copy; 2023 Task Manager. All rights reserved.</p>
            </footer>
        </div>
    );
}