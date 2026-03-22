"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ReservarPage() {
    const [services, setServices] = useState<any[]>([]);
    const [selectedService, setSelectedService] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [clientName, setClientName] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // 1. Cargar los servicios disponibles
    useEffect(() => {
        const fetchServices = async () => {
        const { data } = await supabase.from("services").select("*");
        if (data) setServices(data);
        };
        fetchServices();
    }, []);

    // 2. Guardar la cita
    const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(""); // Limpiamos mensajes previos

    try {
        // 1. DECLARAMOS la variable localDateTime (Asegúrate de que diga 'const')
        const localDateTime = new Date(`${date}T${time}`);

        // 2. LA USAMOS en el insert
        const { error } = await supabase.from("appointments").insert([
        {
            service_id: selectedService,
            appointment_time: localDateTime.toISOString(), // Aquí es donde se usa
            full_name_temp: clientName,
            status: 'pendiente'
        }
        ]);

        if (error) throw error;

        setMessage("✅ ¡Cita agendada con éxito!");
        setClientName("");
        setSelectedService("");
        setDate("");
        setTime("");
    } catch (error: any) {
        setMessage("❌ Error al agendar: " + error.message);
    } finally {
        setLoading(false);
    }
    };

    return (
        <main className="min-h-screen bg-white p-6 flex items-center justify-center">
        <div className="max-w-md w-full border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Reserva tu Cita ✂️</h1>
            
            <form onSubmit={handleBooking} className="space-y-4">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tu Nombre</label>
                <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                placeholder="¿A nombre de quién?"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Selecciona el Servicio</label>
                <select
                required
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 bg-white"
                >
                <option value="">Elegir un servicio...</option>
                {services.map((s) => (
                    <option key={s.id} value={s.id}>
                    {s.name} - ${s.price}
                    </option>
                ))}
                </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha</label>
                <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                />
                </div>
                <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Hora</label>
                <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900"
                />
                </div>
            </div>

            {message && (
                <div className={`p-3 rounded-lg text-sm ${message.includes('❌') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                {message}
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white font-bold py-3 rounded-xl hover:bg-gray-800 transition-all disabled:bg-gray-400"
            >
                {loading ? "Agendando..." : "Confirmar Reserva"}
            </button>
            </form>
        </div>
        </main>
    );
}