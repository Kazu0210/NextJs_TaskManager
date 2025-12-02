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

    useEffect(() => {
        async function checkUser() {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUser(user);
                // Fetch all tasks for now - need to fix user_id mapping
                await fetchTasks();
            } else {
                router.push('/auth/login');
            }
            setLoading(false);
        }
        checkUser();
    }, [router]);

    async function fetchTasks() {
        const { data, error } = await supabase
            .from('task')
            .select('*')
            .order('id', { ascending: false });

        if (error) {
            console.error('Error fetching tasks:', error);
        } else {
            setTasks(data || []);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
           <h1>Tasks</h1>
           <ul>
               {tasks.map((task) => (
                   <li key={task.id}>{task.title}</li>
               ))}
           </ul>
        </div>
    );
}