'use client';
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Login form submitted');
        console.log(`Email: ${email}, Password: ${password}`);
    }

    const goBack = () => {
        router.push('/');
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
            {/* Header */}
            <header className="w-full p-6 flex justify-between items-center">
                <button onClick={goBack} className="cursor-pointer px-6 py-2 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow-md">
                    ← BACK
                </button>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Task Manager
                </h2>
            </header>

            {/* Main content */}
            <main className="flex-1 flex flex-col items-center justify-center px-4">
                <div className="w-full max-w-md">
                    {/* Login Card */}
                    <div className="bg-white p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-200">
                        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Welcome Back
                        </h1>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
                                    Email Address
                                </label>
                                <input 
                                    id="email"
                                    type="email" 
                                    placeholder="Enter your email" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-900"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-900">
                                    Password
                                </label>
                                <input 
                                    id="password"
                                    type="password" 
                                    placeholder="Enter your password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-900"
                                />
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                    <span className="text-gray-600">Remember me</span>
                                </label>
                                <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                                    Forgot password?
                                </a>
                            </div>

                            <button 
                                type="submit" 
                                className="cursor-pointer w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                LOGIN
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Don't have an account?{' '}
                                <a href="/auth/register" className="text-blue-600 hover:text-blue-700 font-semibold">
                                    Register here
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full py-6 text-center bg-white/50 backdrop-blur-sm border-t border-gray-200">
                <p className="text-gray-600 text-sm">
                    &copy; 2023 Task Manager. All rights reserved.
                </p>
            </footer>
        </div>
    );
}