import { useEffect } from 'react'
import GameScene from '../scenes/game-scene'
import { useGame } from '../store'
import { useScene, type SceneType } from '../stores/scene'

export function SceneManager() {
  const currentScene = useScene((s) => s.currentScene)
  const setScene = useScene((s) => s.setScene)

  // handle death
  const health = useGame((s) => s.health)
  useEffect(() => {
    if (health <= 0) {
      setScene('end')
    }
  }, [health, setScene])

  const Scene = sceneMap[currentScene]

  return <Scene />
}

const sceneMap: Record<SceneType, React.FC> = {
  menu: () => <div>Menu Scene</div>,
  game: GameScene,
  end: () => <div>End Scene</div>,
}
