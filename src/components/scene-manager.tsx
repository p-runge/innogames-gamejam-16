import { useEffect } from "react";
import GameScene from "../scenes/game-scene";
import MenuScene from "../scenes/menu-scene";
import StoryScene from "../scenes/story-scene";
import { useGame } from "../stores/game";
import { useScene, type SceneType } from "../stores/scene";

export function SceneManager() {
  const currentScene = useScene((s) => s.currentScene);
  const setScene = useScene((s) => s.setScene);

  // handle death
  const health = useGame((s) => s.health);
  useEffect(() => {
    if (health <= 0) {
      setScene("lose");
    }
  }, [health, setScene]);

  const Scene = sceneMap[currentScene];

  return <Scene />;
}

const sceneMap: Record<SceneType, React.FC> = {
  menu: MenuScene,
  story: () => (
    <StoryScene dialog={["Test Text 1", "Test Text 2", "Test Text 3"]} />
  ),
  game: GameScene,
  lose: () => <div>Game Over</div>,
  win: () => <div>You won!</div>,
};
