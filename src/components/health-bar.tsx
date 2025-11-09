import { Html } from "@react-three/drei";
import { MAX_HEALTH, useGame } from "../stores/game";

export default function HealthBar() {
  const health = useGame((state) => state.health);

  return (
    <Html position={[-2.25, 4.6, 0]}>
      <div className="flex gap-2">
        {Array.from({ length: MAX_HEALTH }).map((_, index) => (
          <span
            key={index}
            className="text-3xl"
            style={{
              color: index < health ? "red" : "gray",
            }}
          >
            ♥
          </span>
        ))}
      </div>
    </Html>
  )
}
