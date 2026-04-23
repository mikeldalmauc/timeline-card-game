import { createContext, useContext, useState, ReactNode } from "react";

type Language = "es" | "eu";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Load from localStorage during initialization
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("timeline_language");
      if (stored === "eu" || stored === "es") {
        return stored;
      }
    }
    return "es";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("timeline_language", lang);
    window.dispatchEvent(new Event("timeline_language_changed"));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

export const t = {
  es: {
    title: "Timeline: Euskadi y España",
    deckRemaining: "Mazo Restante",
    restartDeck: "Reiniciar Mazo",
    drawCard: "Robar Carta",
    tipText: "Toca el mazo para la siguiente",
    emptyTitle: "¡El mazo se ha agotado!",
    playAgain: "Jugar de nuevo",
    shownCards: "Cartas Mostradas",
    noCardsDrawn: "Aun no hay cartas robadas.",
    reveal: "Revelar",
    language: "Idioma",
    es: "Castellano",
    eu: "Euskera",
    changeToVertical: "Cambiar a vertical",
    changeToLandscape: "Cambiar a apaisado",
    toggleFullscreen: "Pantalla completa",
    exitFullscreen: "Salir de pantalla completa",
    revealDate: "Revelar fecha",
    dateRevealed: "Fecha revelada",
    cardNotFound: "Carta no encontrada.",
  },
  eu: {
    title: "Timeline: Euskadi eta Espainia",
    deckRemaining: "Geratzen den Sorta",
    restartDeck: "Sorta Berrabiarazi",
    drawCard: "Txartela Atera",
    tipText: "Ukitu sorta hurrengo txartelarentzat",
    emptyTitle: "Sorta agortu da!",
    playAgain: "Berriro Jokatu",
    shownCards: "Erakutsitako Txartelak",
    noCardsDrawn: "Oraindik ez da txartelik atera.",
    reveal: "Erakutsi",
    language: "Hizkuntza",
    es: "Gaztelania",
    eu: "Euskara",
    changeToVertical: "Bertikalera aldatu",
    changeToLandscape: "Horizontalera aldatu",
    toggleFullscreen: "Pantaila osoa",
    exitFullscreen: "Pantaila osotik irten",
    revealDate: "Data erakutsi",
    dateRevealed: "Data erakutsita",
    cardNotFound: "Txartela ez da aurkitu.",
  },
};
