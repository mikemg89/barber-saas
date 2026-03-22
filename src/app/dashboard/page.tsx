"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. Cargar las citas con el nombre del servicio
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Cabecera */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Panel de Control 💈</h1>
          <button onClick={handleLogout} className="text-sm text-red-600 font-medium hover:underline">
            Cerrar Sesión
          </button>
        </div>

        {/* Accesos Rápidos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Link href="/dashboard/services" className="p-6 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all">
            <p className="text-blue-600 font-bold">Configurar Servicios →</p>
            <p className="text-gray-500 text-sm">Edita tus precios y catálogo.</p>
          </Link>
          <div className="p-6 bg-blue-600 rounded-xl text-white">
            <p className="font-bold text-lg">{appointments.length}</p>
            <p className="opacity-80 text-sm">Citas registradas en total</p>
          </div>
        </div>

        {/* Lista de Citas */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">Próximas Citas</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {loading ? (
              <p className="p-6 text-gray-500">Cargando agenda...</p>
            ) : appointments.length === 0 ? (
              <p className="p-6 text-gray-500 text-center">No hay citas agendadas aún.</p>
            ) : (
              appointments.map((appo) => (
                <div key={appo.id} className="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-100 text-blue-700 p-3 rounded-lg text-center min-w-[80px]">
                      <p className="text-xs uppercase font-bold">Hora</p>
                      <p className="text-lg font-bold">
                        {new Date(appo.appointment_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{appo.full_name_temp}</p>
                      <p className="text-gray-500 text-sm">Servicio: {appo.services?.name}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex items-center space-x-4">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold uppercase">
                      {appo.status}
                    </span>
                    <p className="font-bold text-gray-900">${appo.services?.price}</p>
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