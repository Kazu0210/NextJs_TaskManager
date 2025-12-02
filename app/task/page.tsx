'use client';

import { useState, FormEvent } from "react";

export default function Page() {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

    const handleNameSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        alert(`Hello, ${fname} ${lname ? lname : "No Last name"}!`);
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