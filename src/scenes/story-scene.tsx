import { useEffect } from "react";
import { useScene, type SceneType } from "../stores/scene";
import { useGame } from "../stores/game";

type StorySceneProps = {
  imgSrc: string;
  dialog: string;
  nextScene: SceneType;
};

export default function StoryScene(props: StorySceneProps) {
  const setScene = useScene((s) => s.setScene);
  const increaseLevel = useGame((l) => l.increaseCurrentLevel);
  useEffect(() => {
    const handleKeyDown = () => {
      if (props.nextScene === "game") {
        increaseLevel();
      }

      setScene(props.nextScene);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="h-full p-8 flex flex-col justify-around relative">
      <div className="flex flex-col gap-8 items-center h-full">
        <img src={props.imgSrc} className="w-64 h-64 object-cover" />
        <div className="text-xl grow">{props.dialog}</div>
      </div>
      <div className="text-center text-2xl font-bold absolute bottom-8">
        Press any key to continue your journey
      </div>
    </div>
  );
}
