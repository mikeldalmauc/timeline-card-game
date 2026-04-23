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
          return parsed.filter(id => CARDS.some(c => c.id === id));
      } else if (Array.isArray(parsed) && parsed.length === 0) {
          return []; // Empty deck properly saved
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

export function resetGame() {
  localStorage.removeItem(DECK_KEY);
  localStorage.removeItem(FLIPPED_KEY);
  const newDeck = shuffle(CARDS.map(c => c.id));
  setRemainingDeck(newDeck);
}

export function isCardFlipped(id: string): boolean {
  const stored = localStorage.getItem(FLIPPED_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) && parsed.includes(id);
    } catch(e) {}
  }
  return false;
}

export function markCardFlipped(id: string) {
  let flipped = [] as string[];
  const stored = localStorage.getItem(FLIPPED_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) flipped = parsed;
    } catch(e) {}
  }
  
  if (!flipped.includes(id)) {
    flipped.push(id);
    localStorage.setItem(FLIPPED_KEY, JSON.stringify(flipped));
  }
}
