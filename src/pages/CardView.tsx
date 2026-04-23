import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CARDS } from "../lib/cards";
import { isCardFlipped, markCardFlipped } from "../lib/store";
import { motion, AnimatePresence } from "motion/react";
import { RefreshCw } from "lucide-react";

export default function CardView() {
  const { id } = useParams<{ id: string }>();
  const card = CARDS.find((c) => c.id === id);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (id) {
      // Check stored state on mount
      if (isCardFlipped(id)) {
        setFlipped(true);
      }
    }
  }, [id]);

  const handleFlip = () => {
    if (!flipped && id) {
      setFlipped(true);
      markCardFlipped(id);
    }
  };

  if (!card) {
    return (
      <div className="min-h-screen bg-[#F7F3EF] flex items-center justify-center p-6">
        <p className="text-[#5A5A40] text-xl font-serif">Carta no encontrada.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F3EF] flex flex-col items-center justify-center p-4 md:p-12 font-serif">
      
      <div className="relative z-10 w-full max-w-md md:max-w-lg flex flex-col items-center perspective-1000">
        
        {/* Card Container for 3D flip */}
        <div style={{ perspective: 1200 }} className="w-full aspect-[3/4] relative">
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
              className="absolute inset-0 bg-white rounded-[2.5rem] shadow-2xl border border-[#E5E0D5] flex flex-col items-center p-6 md:p-8"
            >
              <div className="w-full h-[45%] bg-[#EBE7E0] rounded-3xl mb-6 overflow-hidden flex items-center justify-center relative shrink-0">
                <img 
                  src={card.imgUrl} 
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col items-center text-center justify-center w-full">
                <h2 className="text-2xl md:text-3xl font-bold text-[#283618] leading-tight mb-4">{card.title}</h2>
                <p className="text-[#5A5A40] md:text-lg leading-relaxed max-w-md">{card.desc}</p>
              </div>
            </div>

            {/* BACK OF CARD */}
            <div
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              className={`absolute inset-0 bg-white rounded-[2.5rem] shadow-2xl flex flex-col items-center p-6 md:p-8 border ${flipped ? 'border-[#BC6C25] ring-4 ring-[#BC6C25]/10' : 'border-[#E5E0D5]'}`}
            >
              <div className="w-full h-[30%] bg-[#EBE7E0] rounded-3xl mb-6 overflow-hidden flex items-center justify-center relative shrink-0">
                <img 
                  src={card.imgUrl} 
                  alt={card.title}
                  className="w-full h-full object-cover opacity-80 mix-blend-multiply"
                />
              </div>
              <div className="flex-1 flex flex-col items-center text-center justify-center w-full">
                <h2 className="text-xl font-bold text-[#283618] opacity-60 mb-1">{card.title}</h2>
                <p className="text-sm text-[#5A5A40] italic mb-4 md:mb-6">{card.summary}</p>
                <div className="text-7xl md:text-[100px] font-black font-sans text-[#BC6C25] leading-none mb-6">
                  {card.dateLabel}
                </div>
                <div className="px-6 py-2 bg-[#F1EDE6] text-[#4A5D4E] rounded-full font-sans text-xs font-bold uppercase tracking-widest mt-auto mb-2">
                  Carta Bloqueada
                </div>
              </div>
              <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 text-[10px] font-sans uppercase tracking-[0.2em] text-[#B5AE9E] font-bold">
                Ref: {card.id}
              </div>
            </div>
          </motion.div>
        </div>

        {/* FLIP BUTTON */}
        <AnimatePresence>
          {!flipped && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ delay: 0.3 }}
              onClick={handleFlip}
              className="mt-8 px-10 py-4 bg-[#BC6C25] hover:bg-[#A3591F] text-white rounded-full font-sans font-bold uppercase tracking-widest shadow-lg shadow-[#BC6C25]/20 flex items-center gap-2 active:scale-95 transition-all z-20"
            >
              <RefreshCw className="w-5 h-5" />
              Revelar Fecha
            </motion.button>
          )}
        </AnimatePresence>
        
      </div>
    </div>
  );
}
