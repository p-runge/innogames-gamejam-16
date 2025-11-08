import { useGame } from "../stores/game";
import PowerUp from "./power-up";
import { DIMENSIONS as playerDimensions } from "./player";

export type ObstacleType = "fire" | "water" | "leaf";

type Props = {
  type: ObstacleType;
  position: [number, number, number];
};

// eslint-disable-next-line react-refresh/only-export-components
export const DIMENSIONS: [number, number, number] = [5, 1, 1];

export default function Obstacle(props: Props) {
  const powerUp = useGame((state) => state.powerUp);
  const playerPosition = useGame((state) => state.playerPosition);
  const mapZ = useGame((state) => state.mapZ);

  const powerUpZPosition = props.position[2] + 1;

  const powerUpIsAheadOfPlayer = powerUpZPosition + mapZ < playerPosition[2] - playerDimensions[2];

  return (
    <>
      <mesh {...props}>
        <boxGeometry args={DIMENSIONS} />
        <meshStandardMaterial color={
          props.type === "fire" ? "red" : props.type === "water" ? "blue" : "green"
        } />
      </mesh>

      {/**
       * Generally don't render power-ups if player has the corresponding power
       * to prevent needing to track all power ups in the game store.
       */}
      {(powerUpIsAheadOfPlayer || (!powerUp && powerUpZPosition + mapZ < playerPosition[2])) && (
        <>
          <PowerUp type="fire" position={[props.position[0] - 1.5, props.position[1], powerUpZPosition]} />
          <PowerUp type="water" position={[props.position[0], props.position[1], powerUpZPosition]} />
          <PowerUp type="leaf" position={[props.position[0] + 1.5, props.position[1], powerUpZPosition]} />
        </>)}
    </>
  );
}
