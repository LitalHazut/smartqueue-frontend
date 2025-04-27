import { useEffect, useState } from "react";
import api from "../api";
import React from "react";

interface Appointment {
    id: number;
    clientName: string;
    date: string;
    serviceType: string;
}

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [clientName, setClientName] = useState("");
    const [date, setDate] = useState("");
    const [serviceType, setServiceType] = useState("");

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        const response = await api.get("/api/appointments");
        setAppointments(response.data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await api.post("/api/appointments", { clientName, date, serviceType });
        setClientName("");
        setDate("");
        setServiceType("");
        fetchAppointments();
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl mb-4">ניהול תורים</h1>

            <form onSubmit={handleSubmit} className="space-y-2">
                <input
                    className="border p-2 w-full"
                    placeholder="שם לקוח"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                />
                <input
                    className="border p-2 w-full"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <input
                    className="border p-2 w-full"
                    placeholder="סוג שירות"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    הוסף תור
                </button>
            </form>

            <div className="mt-8">
                {appointments.map((appointment) => (
                    <div key={appointment.id} className="border-b p-2">
                        {appointment.clientName} - {appointment.serviceType} - {appointment.date}
                    </div>
                ))}
            </div>


        </div>


    );
}
