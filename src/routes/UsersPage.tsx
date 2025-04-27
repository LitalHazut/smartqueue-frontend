// src/pages/UsersPage.tsx
import React, { useEffect, useState } from "react";
import api from "../api";

interface User { id: number; name: string; email: string; }

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => { fetchUsers(); }, []);

    async function fetchUsers() {
        const res = await api.get("/users");
        setUsers(res.data);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        await api.post("/users", { name, email });
        setName(""); setEmail("");
        fetchUsers();
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <h1 className="text-2xl mb-4 text-center">ניהול משתמשים</h1>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col space-y-4"
                >
                    <input
                        type="text"
                        className="border p-2"
                        placeholder="שם"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        className="border p-2"
                        placeholder="אימייל"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white p-2 rounded"
                    >
                        הוסף משתמש
                    </button>
                </form>

                <div className="mt-8 space-y-2">
                    {users.map((u) => (
                        <div key={u.id} className="border p-2">
                            {u.name} – {u.email}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
