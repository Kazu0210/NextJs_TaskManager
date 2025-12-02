'use client';

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

export default function Page() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkUser() {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                setUser(session.user);
            } else {
                router.push('/auth/login');
            }
            setLoading(false);
        }
        checkUser();
    }, [router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>

        </div>
    );
}