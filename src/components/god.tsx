import { Html } from "@react-three/drei";
import { useGame } from "../stores/game";

export default function God() {
  const currentLevel = useGame((s) => s.currentLevel);

  return (
    <>
      <mesh position={[0, 3, -10]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="gold" />
      </mesh>
      {currentLevel?.instruction && <Html position={[3, 3.5, -10]} center>
        {/* speech bubble */}
        <div className="bg-white p-2 rounded-lg shadow-lg max-w-xs w-[200px]">
          <p className="text-sm">
            {currentLevel.instruction}
          </p>
        </div>
      </Html>}
    </>
  );
}
