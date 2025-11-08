import { useEffect } from "react";
import GameScene from "../scenes/game-scene";
import { useGame } from "../stores/game";
import { useScene, type SceneType } from "../stores/scene";
import MenuScene from "../scenes/menu-scene";

export function SceneManager() {
  const currentScene = useScene((s) => s.currentScene);
  const setScene = useScene((s) => s.setScene);

  // handle death
  const health = useGame((s) => s.health);
  useEffect(() => {
    if (health <= 0) {
      setScene("end");
    }
  }, [health, setScene]);

  const Scene = sceneMap[currentScene];

  return <Scene />;
}

const sceneMap: Record<SceneType, React.FC> = {
  menu: MenuScene,
  game: GameScene,
  end: () => <div>End Scene</div>,
};
