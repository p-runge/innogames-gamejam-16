import { Html } from "@react-three/drei";
import { useEffect } from "react";
import { useGame } from "../stores/game";
import { useScene } from "../stores/scene";

const MAP_END_OFFSET = 4;

export default function ProgressBar() {
  const mapZ = useGame((s) => s.mapZ);
  const obstacles = useGame((s) => s.obstacles);
  const playerPosition = useGame((s) => s.playerPosition);

  const setScene = useScene((s) => s.setScene);

  const lastObstacleZ = Math.min(0, ...obstacles.map((o) => o.z))
  const mapLength = Math.abs(lastObstacleZ) + MAP_END_OFFSET;

  const playerStartPositionToMapStartDistance = Math.abs(playerPosition[2]);

  const progress = Math.min(100,
    Math.max(0, 100 / (mapLength + playerStartPositionToMapStartDistance) * mapZ)
  );

  const isDone = progress >= 100;

  useEffect(() => {
    if (isDone) {
      setScene("win");
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
