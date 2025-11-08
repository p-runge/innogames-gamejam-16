import { create } from "zustand";

export const MAX_HEALTH = 3;

interface GameState {
  health: number;
  takeDamage: () => void;
  playerPosition: [number, number, number];
  setPlayerPosition: (position: [number, number, number]) => void;
}

export const useGame = create<GameState>((set) => ({
  health: MAX_HEALTH,
  takeDamage: () =>
    set((state) => ({
      health: Math.max(0, state.health - 1),
    })),
  playerPosition: [0, 0, 4],
  setPlayerPosition: (position) => set({ playerPosition: position }),
}));
