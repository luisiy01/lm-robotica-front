import { ArrowLeft, BrickWall, Construction, Grip, Bot } from "lucide-react"; // Usamos lucide-react para los iconos
import { Link } from "react-router"; // Asumiendo que usas react-router

export function PaginaEnConstruccion() {
  // Simulación de "Legos" o piezas de construcción flotando de fondo
  const legoBricks = [
    { color: "bg-red-500", top: "10%", left: "15%", rotate: "rotate-12" },
    { color: "bg-blue-600", top: "25%", left: "80%", rotate: "-rotate-45" },
    { color: "bg-yellow-400", top: "70%", left: "5%", rotate: "rotate-90" },
    { color: "bg-emerald-500", top: "85%", left: "75%", rotate: "rotate-6" },
    { color: "bg-red-500", top: "45%", left: "90%", rotate: "-rotate-12" },
    { color: "bg-blue-600", top: "60%", left: "10%", rotate: "rotate-45" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* --- Legos flotando de fondo --- */}
      {legoBricks.map((brick, index) => (
        <div
          key={index}
          className={`absolute w-12 h-6 ${brick.color} rounded-md shadow-inner ${brick.rotate} opacity-20`}
          style={{ top: brick.top, left: brick.left }}
        >
          {/* Los "studs" o puntitos característicos del lego */}
          <div className="absolute -top-2 left-1.5 w-3 h-2 bg-black/10 rounded-full" />
          <div className="absolute -top-2 left-6 w-3 h-2 bg-black/10 rounded-full" />
          <div className="absolute -top-2 left-10.5 w-3 h-2 bg-black/10 rounded-full" />
        </div>
      ))}

      {/* --- Contenedor Central --- */}
      <div className="text-center z-10 max-w-2xl bg-white p-12 rounded-3xl shadow-2xl border border-gray-100 flex flex-col items-center space-y-8 animate-fade-in-up">
        {/* Encabezado Visual */}
        <div className="relative">
          <Construction className="w-24 h-24 text-yellow-500 opacity-20 absolute -top-10 -right-10 rotate-12" />
          <Bot className="w-10 h-10 text-blue-600 absolute -top-6 -left-6 -rotate-12" />

          {/* El Icono principal: Una pared de legos en construcción */}
          <div className="flex items-end gap-1">
            <div className="w-16 h-12 bg-red-500 rounded-t-lg shadow-lg"></div>
            <div className="w-16 h-20 bg-blue-600 rounded-t-lg shadow-lg relative flex items-center justify-center">
              <BrickWall className="w-10 h-10 text-white/50" />
            </div>
            <div className="w-16 h-8 bg-yellow-400 rounded-t-lg shadow-lg"></div>
          </div>
          <div className="w-[12.5rem] h-4 bg-emerald-500 rounded-b-lg shadow-lg -mt-1 flex items-center justify-around px-2">
            <Grip className="w-4 h-4 text-white/40" />
            <Grip className="w-4 h-4 text-white/40" />
            <Grip className="w-4 h-4 text-white/40" />
          </div>
        </div>

        {/* Textos */}
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tighter">
            Página en <span className="text-blue-600">Construcción</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Estamos ensamblando las piezas de esta nueva funcionalidad. <br />{" "}
            ¡Vuelve pronto para ver la estructura terminada!
          </p>
        </div>

        {/* Barra de progreso visual (Como si estuviera cargando la construcción) */}
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
          <div className="h-full bg-blue-600 rounded-full w-2/3 animate-pulse"></div>
        </div>

        {/* Botón de regreso */}
        <Link
          to="/dashboard" // O la ruta principal que uses
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Regresar al Dashboard
        </Link>
      </div>

      {/* --- Footer sutil --- */}
      <div className="absolute bottom-6 text-center text-sm text-gray-400 flex items-center gap-1">
        <Bot size={14} className="text-blue-400" /> LM Robótica ©{" "}
        {new Date().getFullYear()}
      </div>
    </div>
  );
}
