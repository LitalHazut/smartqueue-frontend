import { useState } from "react";
import api from "../api";
import React from "react";

export default function NotificationsPage() {
    const [message, setMessage] = useState("");

    const handleSendNotification = async (e: React.FormEvent) => {
        e.preventDefault();
        await api.post("/api/notification", { message });
        setMessage("");
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">שליחת התראות</h1>

            <form onSubmit={handleSendNotification} className="space-y-2">
                <input
                    className="border p-2 w-full"
                    placeholder="הכנס הודעה"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    שלח התראה
                </button>
            </form>
        </div>
    );
}
