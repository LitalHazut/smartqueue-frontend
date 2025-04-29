// src/pages/UsersPage.tsx
import React, { useEffect, useState } from "react";
import api from "../api";

interface User {
    id: number;
    name: string;
    email: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        const res = await api.get("/users");
        setUsers(res.data);
    }

    async function handleSubmit(e: React.FormEvent) {
        if (name != '' && email != '') {
            e.preventDefault();
            await api.post("/users", { name, email });
            setName("");
            setEmail("");
            fetchUsers()
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <h1 className="text-3xl mb-6 text-center font-bold">ניהול משתמשים</h1>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mb-8">
                    <input
                        type="text"
                        className="border p-2 rounded"
                        placeholder="שם"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        className="border p-2 rounded"
                        placeholder="אימייל"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-black p-2 rounded"
                    >
                        הוסף משתמש
                    </button>
                </form>

                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-2 border">#</th>
                                <th className="p-2 border">שם</th>
                                <th className="p-2 border">אימייל</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u, index) => (
                                <tr key={u.id} className="text-center">
                                    <td className="p-2 border">{index + 1}</td>
                                    <td className="p-2 border">{u.name}</td>
                                    <td className="p-2 border">{u.email}</td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="p-4 text-gray-500 text-center">
                                        אין משתמשים להצגה
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
