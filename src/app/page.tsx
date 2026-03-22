import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Navbar Minimalista */}
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto">
        <div className="text-2xl font-black tracking-tighter italic">
          BARBER<span className="text-blue-500">SAAS</span>
        </div>
        <div className="space-x-6">
          <Link href="/login" className="text-sm font-medium hover:text-blue-400 transition-colors">
            Soy Barbero
          </Link>
          <Link href="/reservar" className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-all">
            Reservar Cita
          </Link>
        </div>
      </nav>

      {/* Hero Section (Sección Principal) */}
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Fondo con degradado (Aquí podrías poner una imagen de barbería luego) */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-black z-0"></div>
        
        <div className="relative z-10 text-center px-4">
          <span className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-4 block">
            Estilo • Precisión • Confianza
          </span>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            CORTES QUE <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">
              DEFINEN TU ESTILO
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Reserva tu turno en segundos y experimenta el servicio premium que te mereces. 
            Sin filas, sin esperas, solo tú y el barbero.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/reservar" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-10 py-4 rounded-xl transition-all transform hover:scale-105">
              Agendar ahora mismo
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-800 border-2 border-black flex items-center justify-center text-[10px]">👤</div>
                ))}
              </span>
              <span>+500 clientes felices</span>
            </div>
          </div>
        </div>
      </header>

      {/* Sección de Características Rápidas */}
      <section className="py-20 bg-white text-black">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-4xl mb-4 text-blue-600 font-bold">01</div>
            <h3 className="text-xl font-black mb-2 uppercase">Agendado Fácil</h3>
            <p className="text-gray-600">Elige tu servicio y hora favorita desde cualquier dispositivo.</p>
          </div>
          <div>
            <div className="text-4xl mb-4 text-blue-600 font-bold">02</div>
            <h3 className="text-xl font-black mb-2 uppercase">Recordatorios</h3>
            <p className="text-gray-600">Te avisamos para que nunca olvides tu compromiso con tu estilo.</p>
          </div>
          <div>
            <div className="text-4xl mb-4 text-blue-600 font-bold">03</div>
            <h3 className="text-xl font-black mb-2 uppercase">Barberos Pro</h3>
            <p className="text-gray-600">Nuestros expertos están listos para darte el look que buscas.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-10 border-t border-gray-900 text-center text-gray-600 text-sm">
        <p>© 2024 BarberSaaS. Creado para barberías de élite.</p>
      </footer>
    </div>
  );
}