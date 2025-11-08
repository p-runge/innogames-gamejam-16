import { useGame } from "../stores/game";

// eslint-disable-next-line react-refresh/only-export-components
export const DIMENSIONS: [number, number, number] = [1, 2, 1];

export default function Player() {
  const playerPosition = useGame((state) => state.playerPosition);
  const powerUp = useGame((state) => state.powerUp);

  return (
    <mesh position={playerPosition}>
      <boxGeometry args={DIMENSIONS} />
      <meshStandardMaterial
        color={powerUp ? {
          "p-fire": "red",
          "p-water": "blue",
          "p-leaf": "green",
        }[powerUp] : "gray"}
      />
    </mesh>
  );
}
