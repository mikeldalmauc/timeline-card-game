import { useEffect, useState } from "react";
import { drawCard, getRemainingDeck, resetGame } from "../lib/store";
import { motion } from "motion/react";

export default function Home() {
  const [deck, setDeck] = useState<string[]>([]);

  const loadDeck = () => {
    setDeck(getRemainingDeck());
  };

  useEffect(() => {
    loadDeck();

    const handleStorage = () => loadDeck();
    window.addEventListener("storage", handleStorage);
    window.addEventListener("timeline_state_changed", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("timeline_state_changed", handleStorage);
    };
  }, []);

  const handleDraw = () => {
    const cardId = drawCard();
    if (cardId) {
      window.open(`/card/${cardId}`, "_blank");
    }
  };

  const deckSize = deck.length;
  // Calculate how many layers to show to simulate thickness (1 to 5)
  const layerCount = Math.max(1, Math.ceil((deckSize / 30) * 5));

  return (
    <div className="min-h-screen bg-[#F7F3EF] flex flex-col font-serif select-none">
      <nav className="h-16 border-b border-[#D1CABF] flex items-center justify-between px-4 sm:px-10 bg-[#FAF8F5]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#4A5D4E] rounded-full flex items-center justify-center text-[#F7F3EF] font-bold italic text-xl">T</div>
          <span className="text-lg sm:text-xl tracking-tight text-[#283618] font-bold">Timeline: Euskadi y España</span>
        </div>
        <div className="flex gap-4 sm:gap-8 items-center text-sm uppercase tracking-widest text-[#5A5A40] font-semibold">
          <div className="flex flex-col items-end">
            <span className="text-[10px] opacity-60">Mazo Restante</span>
            <span id="deck-count" className="text-lg">{deckSize} / 30</span>
          </div>
          <div className="hidden sm:block w-[1px] h-8 bg-[#D1CABF]"></div>
          {(deckSize < 30 || deckSize === 0) && (
            <button onClick={resetGame} className="hidden sm:block hover:text-[#BC6C25] transition-colors">Reiniciar Mazo</button>
          )}
        </div>
      </nav>

      <main className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="relative w-full max-w-4xl flex justify-center items-center">
          <div className="flex flex-col items-center gap-4">
            {deckSize > 0 ? (
              <>
                <div className="relative">
                  <div className="absolute -top-1 -left-1 w-64 sm:w-72 h-80 sm:h-96 bg-[#D1CABF] rounded-2xl transform -rotate-2 z-0"></div>
                  <div className="absolute top-1 left-1 w-64 sm:w-72 h-80 sm:h-96 bg-[#B5AE9E] rounded-2xl transform rotate-1 z-0 shadow-sm"></div>
                  
                  <button onClick={handleDraw} className="cursor-pointer relative w-64 sm:w-72 h-80 sm:h-96 bg-[#4A5D4E] rounded-2xl border-4 border-[#F7F3EF] shadow-xl flex items-center justify-center flex-col z-10 transition-transform hover:scale-105 active:scale-95 group focus:outline-none">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-[#F7F3EF] border-opacity-30 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-[#F7F3EF]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                    </div>
                    <span className="mt-4 text-[#F7F3EF] font-sans uppercase text-[10px] sm:text-xs tracking-widest font-bold">Robar Carta</span>
                  </button>
                </div>
                <p className="text-[#5A5A40] text-xs font-sans uppercase tracking-tighter italic">Toca el mazo para la siguiente</p>
              </>
            ) : (
              <div className="flex flex-col items-center py-12 px-6">
                <h2 className="text-2xl text-[#283618] mb-6 font-serif font-bold text-center">¡El mazo se ha agotado!</h2>
                <button
                  onClick={resetGame}
                  className="px-8 py-4 bg-[#BC6C25] hover:bg-[#A3591F] text-white rounded-full font-sans font-bold uppercase tracking-widest shadow-lg shadow-[#BC6C25]/20 transition-all active:scale-95"
                >
                  Jugar de nuevo
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="h-12 bg-[#283618] hidden sm:flex items-center px-10 justify-between text-[#F7F3EF] text-[10px] uppercase tracking-widest font-sans opacity-90">
        <span>Patrimonio Histórico</span>
        <span>© {new Date().getFullYear()} Timeline Juego de Mesa Virtual</span>
        <div className="flex gap-4 italic capitalize font-serif text-sm opacity-60">
          <span>Santimamiñe</span>
          <span>Elcano</span>
          <span>Guggenheim</span>
        </div>
      </footer>
    </div>
  );
}
