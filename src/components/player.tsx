import { Html } from "@react-three/drei";
import { useGame } from "../stores/game";

// eslint-disable-next-line react-refresh/only-export-components
export const DIMENSIONS: [number, number, number] = [1, 2, 1];

export default function Player() {
  const playerPosition = useGame((state) => state.playerPosition);
  const mapZ = useGame((state) => state.mapZ);
  // const powerUp = useGame((state) => state.powerUp);

  // animate walking tile based on mapZ position
  const frame = Math.floor(Math.abs(mapZ) * 3) % 4;

  const tileId = {
    0: 0,
    1: 1,
    2: 0,
    3: 2,
  }[frame]!

  return (
    <mesh position={playerPosition}>
      <Html center>
        <div className="w-16 h-16 scale-500 bg-[url(/mettcid.png)] " style={{
          backgroundPosition: `-${(tileId) * 64}px 0px`,
          backgroundRepeat: "no-repeat",
        }} />
      </Html>
      {/* <boxGeometry args={DIMENSIONS} /> */}
      {/* <meshStandardMaterial
        color={powerUp ? {
          "p-fire": "red",
          "p-water": "blue",
          "p-leaf": "green",
        }[powerUp] : "gray"}
      /> */}
    </mesh>
  );
}
