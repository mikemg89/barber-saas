"use client"; // Necesario porque el botón tiene un evento 'onClick'

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login"); // Al cerrar sesión, el Middleware nos bloqueará si intentamos volver
    };

    return (
        <main className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center border-b pb-6 mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">👋 ¡Hola de nuevo!</h1>
                <p className="text-gray-600">Bienvenido a tu panel de gestión.</p>
            </div>
            
            <button
                onClick={handleLogout}
                className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg font-medium transition-colors border border-red-200"
            >
                Cerrar Sesión
            </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <p className="text-sm font-medium text-gray-500">Próximas Citas</p>
                <p className="text-2xl font-bold text-blue-600">0</p>
            </div>
            </div>
        </div>
        </main>
    );
}