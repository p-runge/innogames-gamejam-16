import { Html } from "@react-three/drei";
import { MAX_HEALTH, useGame } from "../store";

export default function HealthBar() {
  const health = useGame((state) => state.health);

  return (
    <Html position={[-1.8, 4.5, 0]} center>
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
