import { useEffect } from "react";
import { useScene } from "../stores/scene";
import { useGame } from "../stores/game";

type StorySceneProps = {
  dialog: string[];
};

export default function StoryScene(props: StorySceneProps) {
  const setScene = useScene((s) => s.setScene);
  const increaseLevel = useGame((l) => l.increaseCurrentLevel);
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
    <div>
      <div className="flex">
        <div>Image</div>
        <div>{props.dialog}</div>
      </div>
      <div>Press any key to continue your journey</div>
    </div>
  );
}
