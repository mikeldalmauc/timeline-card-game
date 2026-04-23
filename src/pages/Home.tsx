import { useEffect, useState } from "react";
import { CARDS } from "../lib/cards";
import { drawCard, getDrawnCards, getRemainingDeck, resetGame } from "../lib/store";
import { useLanguage, t } from "../lib/languageContext";
import { Globe } from "lucide-react";

export default function Home() {
  const [deck, setDeck] = useState<string[]>([]);
  const [drawnCards, setDrawnCards] = useState<string[]>([]);
  const { language, setLanguage } = useLanguage();

  const loadDeck = () => {
    setDeck(getRemainingDeck());
    setDrawnCards(getDrawnCards());
  };

  useEffect(() => {
    loadDeck();

    const handleStorage = () => loadDeck();
    const handleLanguageChange = () => loadDeck();
    
    window.addEventListener("storage", handleStorage);
    window.addEventListener("timeline_state_changed", handleStorage);
    window.addEventListener("timeline_language_changed", handleLanguageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("timeline_state_changed", handleStorage);
      window.removeEventListener("timeline_language_changed", handleLanguageChange);
    };
  }, []);

  const handleDraw = () => {
    const cardId = drawCard();
    if (cardId) {
      const langPath = language === "eu" ? "card/eu/" : "card/";
      window.open(`${import.meta.env.BASE_URL}#/${langPath}${cardId}`, "_blank");
    }
  };

  const handleOpenCard = (cardId: string) => {
    const langPath = language === "eu" ? "card/eu/" : "card/";
    window.open(`${import.meta.env.BASE_URL}#/${langPath}${cardId}`, "_blank");
  };

  const handleLanguageToggle = () => {
    setLanguage(language === "es" ? "eu" : "es");
  };

  const texts = t[language];
  const deckSize = deck.length;
  // Calculate how many layers to show to simulate thickness (1 to 5)
  const layerCount = Math.max(1, Math.ceil((deckSize / 30) * 5));

  return (
    <div className="min-h-screen bg-[#F7F3EF] flex flex-col font-serif select-none">
      <nav className="h-16 border-b border-[#D1CABF] flex items-center justify-between px-4 sm:px-10 bg-[#FAF8F5]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#4A5D4E] rounded-full flex items-center justify-center text-[#F7F3EF] font-bold italic text-xl">T</div>
          <span className="text-lg sm:text-xl tracking-tight text-[#283618] font-bold">{texts.title}</span>
        </div>
        <div className="flex gap-4 sm:gap-8 items-center text-sm uppercase tracking-widest text-[#5A5A40] font-semibold">
          <div className="flex flex-col items-end">
            <span className="text-[10px] opacity-60">{texts.deckRemaining}</span>
            <span id="deck-count" className="text-lg">{deckSize} / 30</span>
          </div>
          <div className="hidden sm:block w-[1px] h-8 bg-[#D1CABF]"></div>
          {(deckSize < 30 || deckSize === 0) && (
            <button onClick={resetGame} className="hidden sm:block hover:text-[#BC6C25] transition-colors">{texts.restartDeck}</button>
          )}
          <div className="hidden sm:block w-[1px] h-8 bg-[#D1CABF]"></div>
          <button 
            onClick={handleLanguageToggle}
            className="flex items-center gap-2 hover:text-[#BC6C25] transition-colors"
            title={texts.language}
          >
            <Globe size={16} />
            <span className="text-xs">{language.toUpperCase()}</span>
          </button>
        </div>
      </nav>

      <main className="flex-1 p-6 sm:p-10">
        <div className="mx-auto w-full max-w-6xl grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          <div className="relative w-full flex justify-center items-center min-h-[520px]">
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
                      <span className="mt-4 text-[#F7F3EF] font-sans uppercase text-[10px] sm:text-xs tracking-widest font-bold">{texts.drawCard}</span>
                    </button>
                  </div>
                  <p className="text-[#5A5A40] text-xs font-sans uppercase tracking-tighter italic">{texts.tipText}</p>
                </>
              ) : (
                <div className="flex flex-col items-center py-12 px-6">
                  <h2 className="text-2xl text-[#283618] mb-6 font-serif font-bold text-center">{texts.emptyTitle}</h2>
                  <button
                    onClick={resetGame}
                    className="px-8 py-4 bg-[#BC6C25] hover:bg-[#A3591F] text-white rounded-full font-sans font-bold uppercase tracking-widest shadow-lg shadow-[#BC6C25]/20 transition-all active:scale-95"
                  >
                    {texts.playAgain}
                  </button>
                </div>
              )}
            </div>
          </div>

          <aside className="w-full bg-[#FAF8F5] border border-[#D1CABF] rounded-2xl p-4 sm:p-5">
            <p className="text-[10px] uppercase tracking-widest font-bold text-[#5A5A40] opacity-70 mb-3">{texts.shownCards}</p>
            {drawnCards.length === 0 ? (
              <p className="text-xs text-[#B5AE9E] italic">{texts.noCardsDrawn}</p>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-3">
                {drawnCards.map((drawnId) => {
                  const drawnCard = CARDS.find((c) => c.id === drawnId);
                  if (!drawnCard) return null;
                  return (
                    <button
                      key={drawnId}
                      onClick={() => handleOpenCard(drawnId)}
                      className="group relative overflow-hidden rounded-lg shadow-sm border border-[#D1CABF] hover:shadow-md transition-all"
                      title={drawnCard.title}
                    >
                      <img
                        src={drawnCard.imgUrl}
                        alt={drawnCard.title}
                        className="w-full h-20 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </button>
                  );
                })}
              </div>
            )}
          </aside>
        </div>
      </main>

      <footer className="h-12 bg-[#283618] hidden sm:flex items-center px-10 justify-between text-[#F7F3EF] text-[10px] uppercase tracking-widest font-sans opacity-90">
        <span>© {new Date().getFullYear()} Timeline Juego de Mesa Virtual</span>
        <div className="flex gap-4 italic capitalize font-serif text-sm opacity-60"></div>
      </footer>
    </div>
  );
}
