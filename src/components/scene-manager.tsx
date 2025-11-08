import GameScene from '../scenes/game-scene'
import { useScene, type SceneType } from '../stores/scene'

export function SceneManager() {
  const currentScene = useScene((s) => s.currentScene)

  const SceneComponent = sceneMap[currentScene]

  return <SceneComponent />
}

const sceneMap: Record<SceneType, React.FC> = {
  menu: () => <div>Menu Scene</div>,
  game: GameScene,
  end: () => <div>End Scene</div>,
}
