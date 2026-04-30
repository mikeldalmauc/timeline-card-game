import { CARDS } from "./cards";

const DECK_KEY = "timeline_deck";
const FLIPPED_KEY = "timeline_flipped_cards";

// Shuffle array utilizing Fisher-Yates
function shuffle<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function getRemainingDeck(): string[] {
  const stored = localStorage.getItem(DECK_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
          // Double check the IDs actually exist in CARDS, to be safe.
          const filtered = parsed.filter(id => CARDS.some(c => c.id === id));
          // If after filtering we have no cards, it means IDs don't match (e.g., data from old version)
          // Reset the deck with fresh shuffle
          if (filtered.length === 0) {
            const newDeck = shuffle(CARDS.map(c => c.id));
            setRemainingDeck(newDeck);
            return newDeck;
          }
          return filtered;
      } else if (Array.isArray(parsed) && parsed.length === 0) {
          // Check if any cards have been marked as flipped (were drawn before)
          const flipped = localStorage.getItem(FLIPPED_KEY);
          if (!flipped || JSON.parse(flipped).length === 0) {
            // No cards were drawn, this is invalid state - reinitialize
            const newDeck = shuffle(CARDS.map(c => c.id));
            setRemainingDeck(newDeck);
            return newDeck;
          }
          return []; // Valid empty deck - all cards were drawn
      }
    } catch(e) {
      // Ignored
    }
  }
  
  // Initialize newly sorted deck if missing or error
  const newDeck = shuffle(CARDS.map(c => c.id));
  setRemainingDeck(newDeck);
  return newDeck;
}

export function setRemainingDeck(deck: string[]) {
  localStorage.setItem(DECK_KEY, JSON.stringify(deck));
  // Dispatch custom event to notify other tabs/components in same window
  window.dispatchEvent(new Event("timeline_state_changed"));
}

export function drawCard(): string | null {
  const deck = getRemainingDeck();
  if (deck.length === 0) return null;
  const pickedId = deck.pop();
  setRemainingDeck(deck);
  return pickedId || null;
}

export function getDrawnCards(): string[] {
  const remaining = getRemainingDeck();
  const allCardIds = CARDS.map(c => c.id);
  return allCardIds.filter(id => !remaining.includes(id));
}

export function resetGame() {
  localStorage.removeItem(DECK_KEY);
  localStorage.removeItem(FLIPPED_KEY);
  const newDeck = shuffle(CARDS.map(c => c.id));
  setRemainingDeck(newDeck);
}

export function getCardFlipCount(id: string): number {
  const stored = localStorage.getItem(FLIPPED_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (typeof parsed === 'object' && parsed !== null) {
        return parsed[id] || 0;
      }
    } catch(e) {}
  }
  return 0;
}

export function incrementCardFlipCount(id: string) {
  let flipCounts: Record<string, number> = {};
  const stored = localStorage.getItem(FLIPPED_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (typeof parsed === 'object' && parsed !== null) {
        flipCounts = parsed;
      }
    } catch(e) {}
  }
  
  flipCounts[id] = (flipCounts[id] || 0) + 1;
  localStorage.setItem(FLIPPED_KEY, JSON.stringify(flipCounts));
  window.dispatchEvent(new Event("timeline_state_changed"));
}
