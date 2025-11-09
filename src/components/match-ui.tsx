import { Html } from "@react-three/drei";
import { useGame } from "../stores/game";
import type { ObstacleType } from "./obstacle";
import type { WeaponType } from "./weapon";

export default function MatchUI() {
  const weaponObstacleMap = useGame((state) => state.weaponObstacleMap);

  return (
    <Html zIndexRange={[0]} position={[0, 3, 0]} center>
      <div className="bg-white rounded shadow p-4 w-[250px]">
        <div className="flex justify-between">
          {Object.entries(weaponObstacleMap).map(([weapon, obstacle]) => (
            <div key={weapon} className="flex flex-col items-center">
              <ObstacleIcon type={obstacle} />
              <div className=""><span>&uarr; beats</span></div>
              <WeaponIcon type={weapon as WeaponType} />
            </div>
          ))}
        </div>
      </div>
    </Html>
  )
}

function ObstacleIcon({ type }: { type: ObstacleType }) {
  return (
    <div className="text-2xl rounded-full w-6 h-6">
      {{
        "o-rock": "🪨",
        "o-paper": "📄",
        "o-scissors": "✂️",
      }[type]}
    </div>
  );
}

function WeaponIcon({ type }: { type: WeaponType }) {
  return (
    <div className="text-2xl rounded-full w-6 h-6">
      {{
        "w-rock": "🪨",
        "w-paper": "📄",
        "w-scissors": "✂️",
      }[type]}
    </div>
  );
}
