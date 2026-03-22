"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ServicesPage() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
  
    // Estados para el nuevo servicio
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    // 1. Cargar servicios desde Supabase
    const fetchServices = async () => {
        setLoading(true);
        const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: false });

        if (!error) setServices(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchServices();
    }, []);

    // 2. Función para agregar un servicio
    const handleAddService = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.from("services").insert([
        { name, price: parseFloat(price), description }
        ]);

        if (!error) {
            setName("");
            setPrice("");
            setDescription("");
            fetchServices(); // Recargamos la lista
        }
    };

    return (
        <main className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-5xl mx-auto">
            <div className="mb-8">
            <Link href="/dashboard" className="text-blue-600 hover:underline text-sm font-medium">
                ← Volver al Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">Gestionar Servicios ✂️</h1>
            <p className="text-gray-600">Configura los precios y servicios de tu barbería.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario para añadir */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
                <h2 className="text-lg font-bold mb-4 text-gray-800">Nuevo Servicio</h2>
                <form onSubmit={handleAddService} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                    placeholder="Ej: Corte Clásico"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Precio ($)</label>
                    <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                    placeholder="20.00"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900"
                    placeholder="Breve descripción..."
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Agregar Servicio
                </button>
                </form>
            </div>

            {/* Lista de servicios */}
            <div className="lg:col-span-2 space-y-4">
                <h2 className="text-lg font-bold text-gray-800">Servicios Activos</h2>
                {loading ? (
                <p className="text-gray-500 italic">Cargando servicios...</p>
                ) : services.length === 0 ? (
                <div className="bg-blue-50 p-6 rounded-xl text-center border border-blue-100">
                    <p className="text-blue-600">No tienes servicios creados aún. ¡Empieza por el de la izquierda!</p>
                </div>
                ) : (
                <div className="grid gap-4">
                    {services.map((service) => (
                    <div key={service.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
                        <div>
                        <h3 className="font-bold text-gray-900 text-lg">{service.name}</h3>
                        <p className="text-gray-500 text-sm">{service.description}</p>
                        </div>
                        <div className="text-right">
                        <p className="text-xl font-bold text-green-600">${service.price}</p>
                        <button 
                            onClick={async () => {
                            await supabase.from("services").delete().eq("id", service.id);
                            fetchServices();
                            }}
                            className="text-red-500 text-xs hover:underline mt-2"
                        >
                            Eliminar
                        </button>
                        </div>
                    </div>
                    ))}
                </div>
                )}
            </div>
            </div>
        </div>
        </main>
    );
}