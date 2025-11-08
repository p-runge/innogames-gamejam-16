import { create } from "zustand";
import type { PowerUpType } from "./components/power-up";

export const MAX_HEALTH = 3;

interface GameState {
  health: number;
  takeDamage: () => void;
  playerPosition: [number, number, number];
  setPlayerPosition: (position: [number, number, number]) => void;
  powerUp: PowerUpType | null;
  setPowerUp: (type: PowerUpType | null) => void;
  mapZ: number;
  setMapZ: (z: number) => void;
}

export const useGame = create<GameState>((set) => ({
  health: MAX_HEALTH,
  takeDamage: () =>
    set((state) => ({
      health: Math.max(0, state.health - 1),
    })),
  playerPosition: [0, 0, 4],
  setPlayerPosition: (position) => set({ playerPosition: position }),
  powerUp: null,
  setPowerUp: (type) => {
    console.log("Power-up collected:", type);
    return set({ powerUp: type });
  },
  mapZ: 0,
  setMapZ: (z) => set({ mapZ: z }),
}));
