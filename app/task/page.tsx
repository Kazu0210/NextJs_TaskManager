'use client';

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Page() {
    const router = useRouter();
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleNameSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert(`Hello, ${fname} ${lname ? lname : "No Last name"}!`);
    }

    useEffect(() => {
        async function checkUser() {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                setUser(session.user as any);
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
            <h1>This is a sample page</h1>
            <form onSubmit={handleNameSubmit}>
                <input type="text" value={fname} onChange={(e) => setFname(e.target.value)} placeholder="First Name" />
                <input type="text" value={lname} onChange={(e) => setLname(e.target.value)} placeholder="Last Name" />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}