import { useGame } from "../stores/game";

// eslint-disable-next-line react-refresh/only-export-components
export const DIMENSIONS: [number, number, number] = [1, 2, 1];

export default function Player() {
  const playerPosition = useGame((state) => state.playerPosition);

  return (
    <mesh position={playerPosition}>
      <boxGeometry args={DIMENSIONS} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}
