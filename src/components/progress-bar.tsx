import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

export default function ProgressBar() {
  const [timeprogress, setTimeProgress] = useState(0);

  useFrame((state) => {
    setTimeProgress(state.clock.getElapsedTime());
  });

  return (
    <Html position={[2, 1, 0]} center>
      <div className="bg-white rounded shadow overflow-hidden h-[400px] justify-end w-12 flex flex-col relative">
        <div
          style={{ height: timeprogress }}
          className="bg-green-700 w-full h-1/2 relative"
        >
          <div className="absolute">Player</div>
        </div>
        <div className="absolute top-0">Zielfahne</div>
      </div>
    </Html>
  );
}
