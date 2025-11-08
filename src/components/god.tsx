import { Html } from "@react-three/drei";
import { useGame } from "../stores/game";

export default function God() {
  const currentLevel = useGame((s) => s.currentLevel);

  return (
    <>
      <Html position={[0, 4, 0]} center>
        <div className="w-64">
          <img src="/god-cloud-default.png" className="w-full" />
        </div>
      </Html>
      {currentLevel?.instruction && <Html position={[3.5, 2.9, -10]} center>
        {/* speech bubble */}
        <div className="bg-white p-2 rounded-lg shadow-lg max-w-xs w-[120px]">
          <p className="text-sm">
            {currentLevel.instruction}
          </p>
        </div>
      </Html>}
    </>
  );
}
