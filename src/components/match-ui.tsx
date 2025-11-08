import { Html } from "@react-three/drei";
import { useGame } from "../stores/game";
import type { ObstacleType } from "./obstacle";
import type { PowerUpType } from "./power-up";

export default function MatchUI() {
  const powerUpObstacleMap = useGame((state) => state.powerUpObstacleMap);

  return (
    <Html position={[0, 2.5, 0]} center>
      <div className="bg-white rounded shadow p-4 w-[250px]">
        <div className="flex justify-between">
          {Object.entries(powerUpObstacleMap).map(([powerUp, obstacle]) => (
            <div key={powerUp} className="flex flex-col items-center">
              <ObstacleIcon type={obstacle} />
              &uarr;
              <PowerUpIcon type={powerUp as PowerUpType} />
            </div>
          ))}
        </div>
      </div>
    </Html>
  )
}

function ObstacleIcon({ type }: { type: ObstacleType }) {
  const icon = {
    "o-fire": "🔥",
    "o-water": "💧",
    "o-leaf": "🍃",
  }[type];

  return (
    <span className="text-4xl">
      {icon}
    </span>
  );
}

function PowerUpIcon({ type }: { type: PowerUpType }) {
  const icon = {
    "p-fire": "🔥",
    "p-water": "💧",
    "p-leaf": "🍃",
  }[type];

  return (
    <span className="text-4xl">
      {icon}
    </span>
  );
}
