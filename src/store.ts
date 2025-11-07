import { create } from "zustand";

interface GameState {
  health: number;
  takeDamage: () => void;
}

export const useGame = create<GameState>((set) => ({
  health: 3,
  takeDamage: () =>
    set((state) => ({
      health: Math.max(0, state.health - 1),
    })),
}));
