"use client"; // Le dice a Next.js que este componente usa interactividad en el navegador

import { useState } from "react";
// IMPORTANTE: Si te da error el '@', cámbialo por '../lib/supabase' como hicimos antes
import { supabase } from "@/lib/supabase";

import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true); // Alterna entre Login y Registro
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
        if (isLogin) {
            // Lógica de Inicio de Sesión
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;
            setMessage("✅ ¡Inicio de sesión exitoso!");

            // Esperamos 1.5 segundos para que el usuario vea el mensaje y luego redirigimos
            setTimeout(() => {
            router.push("/dashboard");
            }, 1500);
        } else {
            // Lógica de Registro
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) throw error;
            setMessage("✅ ¡Registro exitoso! Ya puedes iniciar sesión.");
        }
        } catch (error: any) {
            setMessage("❌ Error: " + error.message);
        } finally {
            setLoading(false);
        }
    };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {isLogin ? "Bienvenido de vuelta" : "Crea tu cuenta"}
          </h1>
          <p className="text-gray-500 mt-2">
            Barber SaaS ✂️ - Gestor de citas
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1">
                Correo Electrónico
            </label>
            <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-400 rounded-lg text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-white"
                placeholder="tu@correo.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-800 mb-1">
                Contraseña
            </label>
            <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-400 rounded-lg text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all bg-white"
                placeholder="••••••••"
            />
          </div>

          {message && (
            <div className={`p-3 rounded-lg text-sm font-medium ${message.includes('❌') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:bg-blue-300"
          >
            {loading ? "Procesando..." : isLogin ? "Iniciar Sesión" : "Registrarse"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            {isLogin
              ? "¿No tienes cuenta? Regístrate aquí"
              : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </div>
      </div>
    </main>
  );
}