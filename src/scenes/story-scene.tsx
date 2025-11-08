import { useEffect } from "react";
import { useScene } from "../stores/scene";
import { useGame } from "../stores/game";

type StorySceneProps = {
  dialog: string[];
};

export default function StoryScene(props: StorySceneProps) {
  const setScene = useScene((s) => s.setScene);
  const increaseLevel = useGame((l) => l.increaseCurrentLevel);
  const currentLevel = useGame((c) => c.currentLevel);
  useEffect(() => {
    const handleKeyDown = () => {
      setScene("game");
      increaseLevel();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="h-full p-8 flex flex-col justify-around">
      <div className="flex flex-col gap-8 items-center">
        <div>Image</div>
        <div className="text-xl">{props.dialog[currentLevel]}</div>
      </div>
      <div className="text-center text-2xl font-bold">
        Press any key to continue your journey
      </div>
    </div>
  );
}
