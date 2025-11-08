import { useGame } from "../stores/game";
import PowerUp from "./power-up";

type Props = {
  position: [number, number, number];
};

// eslint-disable-next-line react-refresh/only-export-components
export const DIMENSIONS: [number, number, number] = [5, 1, 1];

export default function Obstacle(props: Props) {
  const powerUp = useGame((state) => state.powerUp);

  return (
    <>
      <mesh {...props}>
        <boxGeometry args={DIMENSIONS} />
        <meshStandardMaterial color="red" />
      </mesh>

      {/**
       * Generally don't render power-ups if player has the corresponding power
       * to prevent needing to track all power ups in the game store.
       */}
      {powerUp !== "fire" && <PowerUp type="fire" position={[props.position[0] - 1.5, props.position[1], props.position[2] + 1]} />}
      {powerUp !== "water" && <PowerUp type="water" position={[props.position[0], props.position[1], props.position[2] + 1]} />}
      {powerUp !== "leaf" && <PowerUp type="leaf" position={[props.position[0] + 1.5, props.position[1], props.position[2] + 1]} />}
    </>
  );
}
