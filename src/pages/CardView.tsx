import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { CARDS } from "../lib/cards";
import { CARDS_EU } from "../lib/cardsEu";
import { isCardFlipped, markCardFlipped } from "../lib/store";
import { motion } from "motion/react";
import { Expand, Eye, Minimize, Repeat2 } from "lucide-react";
import { useLanguage, t } from "../lib/languageContext";

export default function CardView() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const { language, setLanguage } = useLanguage();
  const card = CARDS.find((c) => c.id === id);
  const [flipped, setFlipped] = useState(false);
  const [isLandscape, setIsLandscape] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // Detect if we're on the EU route and sync language
    const isEuRoute = location.pathname.includes("/card/eu/");
    if (isEuRoute && language === "es") {
      setLanguage("eu");
    } else if (!isEuRoute && language === "eu") {
      setLanguage("es");
    }
  }, [location.pathname, language, setLanguage]);

  useEffect(() => {
    if (id) {
      // Check stored state on mount
      if (isCardFlipped(id)) {
        setFlipped(true);
      }
    }
  }, [id]);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, []);

  const handleFlip = () => {
    if (!flipped && id) {
      setFlipped(true);
      markCardFlipped(id);
    }
  };

  const handleToggleOrientation = () => {
    setIsLandscape((prev) => !prev);
  };

  const handleToggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Some browsers block fullscreen without a valid user gesture.
    }
  };

  const texts = t[language];
  const euTranslation = language === "eu" && card ? CARDS_EU[card.id] : undefined;
  const cardData = euTranslation ? { ...card, ...euTranslation } : card;
  // Reserve space for controls attached to the bottom edge of the card.
  const controlsReservePx = 96;

  if (!card) {
    return (
      <div className="h-screen w-screen bg-[#F7F3EF] flex items-center justify-center p-6">
        <p className="text-[#5A5A40] text-3xl font-serif">{texts.cardNotFound}</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-[#F7F3EF] flex items-center justify-center overflow-hidden font-serif p-0" style={{ height: "100dvh" }}>
      <div className="min-h-0 w-full h-full flex items-center justify-center z-10 overflow-visible">
        <div
          className="relative z-10"
          style={{
            width: isLandscape
              ? `min(calc(100dvh - ${controlsReservePx}px), 75vw)`
              : `min(calc(100dvh - ${controlsReservePx}px), 76vw)`,
            aspectRatio: "3 / 4",
            perspective: 1400,
            transform: isLandscape ? "rotate(-90deg)" : "rotate(0deg)",
            transformOrigin: "center",
            maxWidth: "100%",
            maxHeight: `calc(100dvh - ${controlsReservePx}px)`,
          }}
        >
          <motion.div
            style={{ transformStyle: "preserve-3d" }}
            initial={false}
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 60, damping: 15 }}
            className="w-full h-full relative"
          >
            {/* FRONT OF CARD */}
            <div
              style={{ backfaceVisibility: "hidden" }}
              className="absolute inset-0 bg-white rounded-[3rem] shadow-2xl border border-[#E5E0D5] flex flex-col items-center p-10 overflow-hidden"
            >
              <div className="w-full h-[52%] bg-[#EBE7E0] rounded-3xl mb-5 overflow-hidden flex items-center justify-center relative shrink-0">
                <img
                  src={card.imgUrl}
                  alt={cardData!.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-h-0 flex flex-col items-center text-center justify-center w-full px-4 overflow-hidden">
                <h2 className="text-[clamp(1.6rem,3vw,3rem)] font-bold text-[#283618] leading-tight mb-5 break-words max-w-[92%]">{cardData!.title}</h2>
                <p
                  className="text-[clamp(1rem,1.7vw,1.5rem)] text-[#5A5A40] leading-relaxed max-w-[92%] break-words overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 5,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {cardData!.desc}
                </p>
              </div>
            </div>

            {/* BACK OF CARD */}
            <div
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              className={`absolute inset-0 bg-white rounded-[3rem] shadow-2xl flex flex-col items-center p-10 overflow-hidden border ${flipped ? "border-[#BC6C25] ring-4 ring-[#BC6C25]/10" : "border-[#E5E0D5]"}`}
            >
              <div className="w-full h-[40%] bg-[#EBE7E0] rounded-3xl mb-5 overflow-hidden flex items-center justify-center relative shrink-0">
                <img
                  src={card.imgUrl}
                  alt={cardData!.title}
                  className="w-full h-full object-cover opacity-80 mix-blend-multiply"
                />
              </div>
              <div className="flex-1 min-h-0 flex flex-col items-center text-center justify-center w-full px-4 overflow-hidden">
                <h2 className="text-[clamp(1.4rem,2.5vw,2.6rem)] font-bold text-[#283618] opacity-60 mb-2 break-words max-w-[92%]">{cardData!.title}</h2>
                <p
                  className="text-[clamp(0.95rem,1.4vw,1.35rem)] text-[#5A5A40] italic mb-6 break-words max-w-[90%] overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {cardData!.summary}
                </p>
                <div className="text-[clamp(3.5rem,7.2vw,8rem)] font-black font-sans text-[#BC6C25] leading-[0.9] mb-4 max-w-[95%] break-words">
                  {cardData!.dateLabel}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 w-[calc(100%-2.5rem)] flex items-center justify-between z-30 pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -1, scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleToggleOrientation}
              className="h-14 w-14 bg-[#1f3b08] hover:bg-[#173005] text-white rounded-full border-2 border-[#d7e7c8] shadow-[0_8px_4px_rgba(31,59,8,0.8)] ring-2 ring-[#f4e7cf] flex items-center justify-center transition-all cursor-pointer"
              title={isLandscape ? texts.changeToVertical : texts.changeToLandscape}
              aria-label={isLandscape ? texts.changeToVertical : texts.changeToLandscape}
            >
              <span className="relative flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {isLandscape ? (
                    <>
                      <rect x="3" y="8" width="11" height="8" rx="1.5" />
                      <rect x="17" y="5" width="4" height="14" rx="1" />
                    </>
                  ) : (
                    <>
                      <rect x="4" y="3" width="8" height="18" rx="1.5" />
                      <rect x="14" y="9" width="7" height="6" rx="1" />
                    </>
                  )}
                </svg>
                <Repeat2 className="w-3.5 h-3.5 absolute -right-3 -bottom-2" />
              </span>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -1, scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleToggleFullscreen}
              className="h-14 w-14 bg-[#1f3b08] hover:bg-[#173005] text-white rounded-full border-2 border-[#d7e7c8] shadow-[0_8px_4px_rgba(31,59,8,0.8)] ring-2 ring-[#f4e7cf] flex items-center justify-center transition-all cursor-pointer"
              title={isFullscreen ? texts.exitFullscreen : texts.toggleFullscreen}
              aria-label={isFullscreen ? texts.exitFullscreen : texts.toggleFullscreen}
            >
              {isFullscreen ? <Minimize className="w-6 h-6" /> : <Expand className="w-6 h-6" />}
            </motion.button>
          </div>

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={!flipped ? { y: -1, scale: 1.05 } : undefined}
            whileTap={!flipped ? { scale: 0.96 } : undefined}
            onClick={handleFlip}
            disabled={flipped}
            className={`h-14 w-14 rounded-full border-2 flex items-center justify-center transition-all pointer-events-auto ${
              flipped
                ? "bg-[#D1CABF] text-[#8B8477] border-[#B5AE9E] cursor-not-allowed"
                : "bg-[#BC6C25] hover:bg-[#A3591F] text-white border-[#e0b488] shadow-lg shadow-[#BC6C25]/20 cursor-pointer"
            }`}
            title={flipped ? texts.dateRevealed : texts.revealDate}
            aria-label={flipped ? texts.dateRevealed : texts.revealDate}
          >
            <Eye className="w-6 h-6" />
          </motion.button>
        </div>
        </div>
      </div>
    </div>
  );
}
