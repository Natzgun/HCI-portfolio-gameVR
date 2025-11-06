import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FinalProjectIntroPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-black text-white p-8">
      <div className="max-w-4xl w-full bg-black/40 backdrop-blur-md border border-blue-500/30 rounded-2xl p-8 md:p-12 shadow-2xl text-center animate-[fadeIn_0.5s_ease-in-out_forwards]">
        
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
          Shooting Words
        </h1>
        
        <div className="mt-6 mb-8">
          <h2 className="text-2xl font-semibold text-blue-400 mb-3">Concepto</h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Superando la brecha entre el conocimiento pasivo y el uso real del vocabulario, mediante la estimulación de la recuperación espontánea y el pensamiento asociativo.
          </p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 my-8 text-left">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Roadmap de Desarrollo</h2>
          
          <div className="relative pl-6 after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-slate-600">
            <div className="relative mb-8">
              <div className="absolute -left-[34px] top-1 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
              <h3 className="text-xl font-semibold text-blue-400 mb-2">Fase 1: Needfinding (Investigación de Necesidades)</h3>
              <p className="font-semibold text-gray-300 mb-2">El Desafío: La Experiencia de Recuperación</p>
              <p className="text-gray-400">
                ¿Cómo recuperar vocabulario en inglés de manera espontánea durante una conversación o redacción?
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute -left-[34px] top-1 w-4 h-4 bg-slate-600 rounded-full"></div>
              <h3 className="text-xl font-semibold text-gray-400 mb-2">Perfiles de Participantes</h3>
              <p className="text-gray-500">
                Se definieron perfiles de usuario basados en las entrevistas para guiar el diseño.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-6 rounded-full transition-transform transform hover:scale-105 shadow-lg">
            <Link href="/final-project/constellation">
              Ver Presentación Interactiva
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}
