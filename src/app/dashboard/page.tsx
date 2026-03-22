"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchAppointments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("appointments")
      .select(`
        id,
        appointment_time,
        full_name_temp,
        status,
        services (name, price)
      `)
      .order("appointment_time", { ascending: true });

    if (!error) setAppointments(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // --- NUEVA FUNCIÓN: Actualizar Estado ---
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("appointments")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      alert("Error al actualizar: " + error.message);
    } else {
      // Actualizamos el estado localmente para que sea instantáneo
      setAppointments((prev) =>
        prev.map((appo) => (appo.id === id ? { ...appo, status: newStatus } : appo))
      );
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Panel de Control 💈</h1>
          <button onClick={handleLogout} className="text-sm text-red-600 font-medium hover:underline">
            Cerrar Sesión
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link href="/dashboard/services" className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all">
            <p className="text-blue-600 font-bold">Configurar Servicios →</p>
            <p className="text-gray-500 text-sm">Edita tus precios y catálogo.</p>
          </Link>
          <div className="p-6 bg-blue-600 rounded-xl text-white">
            <p className="font-bold text-lg">{appointments.filter(a => a.status === 'pendiente').length}</p>
            <p className="opacity-80 text-sm">Citas pendientes hoy</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-gray-800">Agenda del Día</h2>
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Acciones</span>
          </div>
          
          <div className="divide-y divide-gray-100">
            {loading ? (
              <p className="p-6 text-gray-500">Cargando agenda...</p>
            ) : appointments.length === 0 ? (
              <p className="p-6 text-gray-500 text-center">No hay citas agendadas aún.</p>
            ) : (
              appointments.map((appo) => (
                <div key={appo.id} className={`p-6 flex flex-col md:flex-row md:items-center justify-between transition-colors ${appo.status === 'completada' ? 'bg-gray-50 opacity-60' : 'hover:bg-gray-50'}`}>
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg text-center min-w-[80px] ${appo.status === 'completada' ? 'bg-gray-200 text-gray-500' : 'bg-blue-100 text-blue-700'}`}>
                      <p className="text-xs uppercase font-bold">Hora</p>
                      <p className="text-lg font-bold">
                        {new Date(appo.appointment_time).toLocaleTimeString('es-ES', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true // Para que salga 2:00 PM en lugar de 14:00 si prefieres
                        })}
                      </p>
                    </div>
                    <div>
                      <p className={`font-bold text-gray-900 text-lg ${appo.status === 'completada' ? 'line-through' : ''}`}>
                        {appo.full_name_temp}
                      </p>
                      <p className="text-gray-500 text-sm">{appo.services?.name} • ${appo.services?.price}</p>
                    </div>
                  </div>
                  
                  {/* BOTONES DE ACCIÓN */}
                  <div className="mt-4 md:mt-0 flex items-center space-x-2">
                    {appo.status === 'pendiente' && (
                      <>
                        <button
                          onClick={() => handleUpdateStatus(appo.id, 'completada')}
                          className="px-4 py-2 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 transition-all"
                        >
                          ✓ Completar
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(appo.id, 'cancelada')}
                          className="px-4 py-2 bg-white text-red-600 border border-red-200 text-xs font-bold rounded-lg hover:bg-red-50 transition-all"
                        >
                          ✕ Cancelar
                        </button>
                      </>
                    )}
                    {appo.status !== 'pendiente' && (
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${appo.status === 'completada' ? 'bg-gray-200 text-gray-600' : 'bg-red-100 text-red-700'}`}>
                        {appo.status}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}