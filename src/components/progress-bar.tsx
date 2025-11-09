import { Html } from "@react-three/drei";
import { useEffect } from "react";
import { useGame } from "../stores/game";
import { useScene, type SceneType } from "../stores/scene";

const MAP_END_OFFSET = 4;

export default function ProgressBar() {
  const mapZ = useGame((s) => s.mapZ);
  const obstacles = useGame((s) => s.obstacles);
  const playerPosition = useGame((s) => s.playerPosition);
  const currentLevelIndex = useGame((s) => s.currentLevelIndex);

  const setScene = useScene((s) => s.setScene);

  const lastObstacleZ = Math.min(0, ...obstacles.map((o) => o.z))
  const mapLength = Math.abs(lastObstacleZ) + MAP_END_OFFSET;

  const playerStartPositionToMapStartDistance = Math.abs(playerPosition[2]);

  const progress = Math.min(100,
    Math.max(0, 100 / (mapLength + playerStartPositionToMapStartDistance) * mapZ)
  );

  const isDone = progress >= 100;

  useEffect(() => {
    let nextScene: SceneType
    if (isDone) {
      switch (currentLevelIndex) {
        case 1:
          nextScene = "level-1-review";
          break;
        case 2:
          nextScene = "level-2-review";
          break;
        case 3:
          nextScene = "level-3-review";
          break;
        case 4:
          nextScene = "level-4-review";
          break;
        default:
          nextScene = "win";
      }
      setScene(nextScene);
    }
  }, [isDone])

  return (
    <Html position={[2, 1, 0]} center>
      <div className="bg-white rounded shadow overflow-hidden h-[400px] justify-end w-12 flex flex-col relative">
        <div
          style={{ height: `${progress}%` }}
          className="bg-green-700 w-full h-1/2 relative"
        >
          <div className="absolute">Player</div>
        </div>
        <div className="absolute top-0">Zielfahne</div>
      </div>
    </Html>
  );
}
