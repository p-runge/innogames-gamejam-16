import { create } from "zustand";
import type { ObstacleType } from "../components/obstacle";
import type { WeaponType } from "../components/weapon";
import { getRandomItem } from "../utils/common";

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
    obstacleDistance: 12,
    obstacleCount: 4,
    speed: 2,
    instructions: [
      {
        mapZ: 2,
        text: "See that big obstacle ahead of you? Break through it by winning a game of rock paper scissors! Choose the correct weapon from those right in front of you. Move around using \u2190 and \u2192.",
      },
    ],
  },
  2: {
    obstacleDistance: 12,
    obstacleCount: 6,
    speed: 1.5,
    instructions: [
      {
        mapZ: 2,
        text: "Watch out! The rules might change from here on. Make sure to pay attention on what choice you need to make to get past the next obstacle.",
      },
      {
        mapZ: 14,
        text: "See how the rules have changed? Stay alert!",
      },
    ],
  },
  3: {
    obstacleDistance: 12,
    obstacleCount: 10,
    speed: 2,
  },
  4: {
    obstacleDistance: 12,
    obstacleCount: 12,
    speed: 2.5,
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
  weapon: WeaponType | null;
  setWeapon: (type: WeaponType | null) => void;
  mapZ: number;
  setMapZ: (z: number) => void;
  obstacles: {
    z: number;
    type: ObstacleType;
  }[];
  setObstacles: (obstacles: { z: number; type: ObstacleType }[]) => void;
  weaponObstacleMap: Record<WeaponType, ObstacleType>;
  randomizeWeaponObstacleMap: () => void;
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
  weapon: null,
  setWeapon: (type) => set({ weapon: type }),
  mapZ: 0,
  setMapZ: (z) => set({ mapZ: z }),
  obstacles: [],
  setObstacles: (obstacles) => set({ obstacles }),
  weaponObstacleMap: {
    "w-rock": "o-scissors",
    "w-paper": "o-rock",
    "w-scissors": "o-paper",
  },
  randomizeWeaponObstacleMap: () =>
    set(() => {
      // Generate a random permutation by selecting a random valid arrangement
      // There are 6 possible permutations, we want any except the default one
      const validPermutations: ObstacleType[][] = [
        ["o-rock", "o-scissors", "o-paper"],
        ["o-rock", "o-paper", "o-scissors"],
        ["o-paper", "o-rock", "o-scissors"],
        ["o-paper", "o-scissors", "o-rock"],
        ["o-scissors", "o-paper", "o-rock"],
      ];

      const shuffled = getRandomItem(validPermutations);

      return {
        weaponObstacleMap: {
          "w-rock": shuffled[0],
          "w-paper": shuffled[1],
          "w-scissors": shuffled[2],
        },
      };
    }),
  resetGame: () =>
    set(() => ({
      currentLevel: null,
      currentLevelIndex: 0,
      health: MAX_HEALTH,
      playerPosition: [0, 0, 4],
      weapon: null,
      mapZ: 0,
      obstacles: [],
      weaponObstacleMap: {
        "w-rock": "o-rock",
        "w-paper": "o-paper",
        "w-scissors": "o-scissors",
      },
    })),

  isPaused: false,
  setIsPaused: (paused) => set({ isPaused: paused }),
  hasTriggeredInitialPause: false,
}));
