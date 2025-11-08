import { create } from "zustand";
import type { ObstacleType } from "../components/obstacle";
import type { PowerUpType } from "../components/power-up";

export const MAX_HEALTH = 3;

interface GameState {
  currentLevel: number;
  increaseCurrentLevel: () => void;
  health: number;
  takeDamage: () => void;
  playerPosition: [number, number, number];
  setPlayerPosition: (position: [number, number, number]) => void;
  powerUp: PowerUpType | null;
  setPowerUp: (type: PowerUpType | null) => void;
  mapZ: number;
  setMapZ: (z: number) => void;
  obstacles: {
    z: number;
    type: ObstacleType;
  }[];
  setObstacles: (obstacles: { z: number; type: ObstacleType }[]) => void;
  powerUpObstacleMap: Record<PowerUpType, ObstacleType>;
  randomizePowerUpObstacleMap: () => void;
}

export const useGame = create<GameState>((set) => ({
  currentLevel: 0,
  increaseCurrentLevel: () =>
    set((state) => ({ currentLevel: state.currentLevel + 1 })),
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
  obstacles: [],
  setObstacles: (obstacles) => set({ obstacles }),
  powerUpObstacleMap: {
    "p-fire": "o-fire",
    "p-water": "o-water",
    "p-leaf": "o-leaf",
  },
  randomizePowerUpObstacleMap: () =>
    set(() => {
      const obstacleTypes: ObstacleType[] = ["o-fire", "o-water", "o-leaf"];

      // Shuffle obstacle types
      for (let i = obstacleTypes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [obstacleTypes[i], obstacleTypes[j]] = [
          obstacleTypes[j],
          obstacleTypes[i],
        ];
      }

      return {
        powerUpObstacleMap: {
          "p-fire": obstacleTypes[0],
          "p-water": obstacleTypes[1],
          "p-leaf": obstacleTypes[2],
        },
      };
    }),
}));
