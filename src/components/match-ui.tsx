import { Html } from "@react-three/drei";
import { useGame } from "../stores/game";
import type { ObstacleType } from "./obstacle";
import type { PowerUpType } from "./power-up";
import { cn } from "../utils";

export default function MatchUI() {
  const powerUpObstacleMap = useGame((state) => state.powerUpObstacleMap);

  return (
    <Html position={[0, 2.2, 0]} center>
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
  return (
    <div className={cn("w-8 h-4", {
      "bg-red-500": type === "o-fire",
      "bg-blue-500": type === "o-water",
      "bg-green-500": type === "o-leaf",
    })} />
  );
}

function PowerUpIcon({ type }: { type: PowerUpType }) {
  return (
    <div className={cn("text-4xl rounded-full w-4 h-4", {
      "bg-red-700": type === "p-fire",
      "bg-blue-700": type === "p-water",
      "bg-green-700": type === "p-leaf",
    })} />
  );
}
