import { useEffect } from "react";
import { useGame } from "../stores/game";
import { useScene, type SceneType } from "../stores/scene";
import Reward from "../components/reward";

type StorySceneProps = {
  imgSrc: string;
  dialog: string;
  nextScene: SceneType;
  rewardImgSrc?: string;
};

export default function StoryScene(props: StorySceneProps) {
  const setScene = useScene((s) => s.setScene);
  const increaseLevel = useGame((l) => l.increaseCurrentLevel);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        if (props.nextScene === "game") {
          increaseLevel();
        }

        setScene(props.nextScene);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="h-full p-8 flex flex-col justify-around relative">
      <div className="flex flex-col gap-12 items-center h-full">
        <div className="relative w-64 h-64">
          <img src={props.imgSrc} className="w-full object-cover" />
          {props.imgSrc === "/mett-gusta.png" && (
            <div className="absolute bottom-0 text-center w-full text-3xl translate-y-full font-bold text-[red] uppercase">Mett Gusta</div>
          )}
        </div>
        <div className="text-xl">{props.dialog}</div>
        {props.rewardImgSrc && (
          <Reward imgSrc={props.rewardImgSrc} />
        )}
      </div>
      <div className="text-center text-2xl font-bold absolute bottom-8 left-0 right-0 animate-bounce">
        {"Press <Space> to continue"}
      </div>
    </div>
  );
}
