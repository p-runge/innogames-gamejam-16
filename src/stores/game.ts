import { create } from "zustand";
import type { ObstacleType } from "../components/obstacle";
import type { PowerUpType } from "../components/power-up";

export const MAX_HEALTH = 3;

type Level = {
  obstacleDistance: number;
  obstacleCount: number;
  speed: number;
  instructions?: {
    mapZ: number;
    text: string;
  }[];
};
type LevelMetric = Record<number, Level>;

export const LEVELS: LevelMetric = {
  1: {
    obstacleDistance: 8,
    obstacleCount: 4,
    speed: 2,
    instructions: [
      {
        mapZ: 2,
        text: "You need to break through the obstacles in your way! Collect the matching power-up to do so. You can move around with \u2190 and \u2192.",
      },
    ],
  },
  2: {
    obstacleDistance: 8,
    obstacleCount: 6,
    speed: 2,
    instructions: [
      {
        mapZ: 2,
        text: "Watch out! The required power-ups might change from here on. Make sure to pay attention on what power-up you'll need!",
      },
      {
        mapZ: 10,
        text: "See how the power-up and obstacle types have changed? Stay alert!",
      },
    ],
  },
  3: {
    obstacleDistance: 8,
    obstacleCount: 10,
    speed: 2.5,
  },
  4: {
    obstacleDistance: 8,
    obstacleCount: 12,
    speed: 3,
  },
};

interface GameState {
  currentLevel: Level | null;
  currentLevelIndex: number;
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
  resetGame: () => void;

  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
}

export const useGame = create<GameState>((set) => ({
  currentLevel: null,
  currentLevelIndex: 0,
  increaseCurrentLevel: () =>
    set((state) => ({
      currentLevelIndex: state.currentLevelIndex + 1,
      currentLevel: LEVELS[state.currentLevelIndex + 1],
      mapZ: 0,
    })),
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
  resetGame: () =>
    set(() => ({
      currentLevel: null,
      currentLevelIndex: 0,
      health: MAX_HEALTH,
      playerPosition: [0, 0, 4],
      powerUp: null,
      mapZ: 0,
      obstacles: [],
      powerUpObstacleMap: {
        "p-fire": "o-fire",
        "p-water": "o-water",
        "p-leaf": "o-leaf",
      },
    })),

  isPaused: false,
  setIsPaused: (paused) => set({ isPaused: paused }),
  hasTriggeredInitialPause: false,
}));
