'use client';

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface Task {
    id: number;
    user_id: number;
    title: string;
}

export default function Page() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        async function checkUser() {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
            } else {
                router.push('/auth/login');
            }
            setLoading(false);
        }
        checkUser();
    }, [router]);

    const logout = async () => {
        const confirmed = window.confirm('Are you sure you want to logout?');
        if (!confirmed) return;
        
        const { error } = await supabase.auth.signOut();
        if (!error) {
            setUser(null);
            router.push('/');
        } else {
            console.error('Logout failed:', error.message);
        }
    };

    const clicked = () => {
        setShowModal(true);
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
                <div className="text-2xl text-gray-900 font-medium">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
            {/* Header with logout button */}
            <header className="w-full p-6 flex justify-between items-center">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Task Manager
                </h1>
                <div className="flex gap-4">
                    <button 
                        onClick={logout} 
                        className="cursor-pointer px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                        LOGOUT
                    </button>

                    <button
                        onClick={clicked}
                        className="cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                        NEW TASK
                    </button>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1 px-6 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">My Tasks</h2>
                        
                        {/* Task list */}
                        <div className="space-y-4">
                            {tasks.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">📝</div>
                                    <p className="text-xl text-gray-800 font-medium mb-2">No tasks yet</p>
                                    <p className="text-gray-800">Create your first task to get started!</p>
                                </div>
                            ) : (
                                tasks.map((task) => (
                                    <div 
                                        key={task.id}
                                        className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200"
                                    >
                                        <p className="text-gray-900 font-medium">{task.title}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full py-6 text-center bg-white/50 backdrop-blur-sm border-t border-gray-200">
                <p className="text-gray-800 text-sm">
                    &copy; 2023 Task Manager. All rights reserved.
                </p>
            </footer>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Create New Task</h3>
                        
                        <form className="space-y-4">
                            <div>
                                <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700 mb-2">
                                    Task Title
                                </label>
                                <input
                                    type="text"
                                    id="taskTitle"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                                    placeholder="Enter task title..."
                                />
                            </div>
                            
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    Create
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}