import { create } from "zustand";

export type SceneType =
  | "menu"
  | "intro1"
  | "intro2"
  | "intro3"
  | "intro4"
  | "game"
  | "win"
  | "lose";

type Scene = {
  currentScene: SceneType;
  setScene: (scene: SceneType) => void;
};

export const useScene = create<Scene>((set) => ({
  currentScene: "menu",
  setScene: (scene) => set({ currentScene: scene }),
}));
