import { Html } from "@react-three/drei";
import { useGame } from "../store";

export default function PowerUpUI() {
  const powerUp = useGame((s) => s.powerUp);

  return (
    <Html position={[-2.2, 4.3, 0]}>
      {/* power up */}
      <div className="bg-white px-2 py-1 rounded shadow text-sm">
        Power-Up: {powerUp ? powerUp : "None"}
      </div>
    </Html>
  )
}
