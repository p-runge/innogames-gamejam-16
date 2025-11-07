import { create } from "zustand";

export const MAX_HEALTH = 3;

interface GameState {
  health: number;
  takeDamage: () => void;
}

export const useGame = create<GameState>((set) => ({
  health: MAX_HEALTH,
  takeDamage: () =>
    set((state) => ({
      health: Math.max(0, state.health - 1),
    })),
}));
