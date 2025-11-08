import { create } from "zustand";

export type SceneType = "menu" | "story" | "game" | "end";

type Scene = {
  currentScene: SceneType;
  setScene: (scene: SceneType) => void;
};

export const useScene = create<Scene>((set) => ({
  currentScene: "menu",
  setScene: (scene) => set({ currentScene: scene }),
}));
