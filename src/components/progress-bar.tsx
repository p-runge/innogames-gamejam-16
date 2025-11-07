import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

const STAGE_DURATION = 60;

export default function ProgressBar() {
  const [timeprogress, setTimeProgress] = useState(0);

  const progress = Math.min(timeprogress / STAGE_DURATION * 100, 100)

  useFrame((state) => {
    setTimeProgress(state.clock.getElapsedTime());
  });

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
