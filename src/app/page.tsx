import { supabase } from '@/lib/supabase'

export default async function Home() {
  // Intentamos leer la tabla de servicios que creaste en el SQL de Supabase
  const { data, error } = await supabase.from('services').select('*')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="p-8 bg-white shadow-xl rounded-2xl border border-gray-100 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Barber SaaS ✂️</h1>
        <p className="text-gray-500 mb-6">Estado de la infraestructura:</p>
        
        {error ? (
          <div className="text-red-500 font-medium">
            ❌ Error de conexión: {error.message}
          </div>
        ) : (
          <div className="text-green-600 font-bold">
            ✅ ¡Conexión Exitosa con Supabase!
            <p className="text-sm text-gray-400 mt-2 font-normal">
              Se detectaron {data?.length || 0} servicios listos.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}