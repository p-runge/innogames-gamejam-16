import PowerUp from "./power-up";

type Props = {
  position: [number, number, number];
};

// eslint-disable-next-line react-refresh/only-export-components
export const DIMENSIONS: [number, number, number] = [5, 1, 1];

export default function Obstacle(props: Props) {

  return (
    <>
      <mesh {...props}>
        <boxGeometry args={DIMENSIONS} />
        <meshStandardMaterial color="red" />
      </mesh>
      <PowerUp type="fire" position={[props.position[0] - 1.5, props.position[1], props.position[2] + 1]} />
      <PowerUp type="water" position={[props.position[0], props.position[1], props.position[2] + 1]} />
      <PowerUp type="leaf" position={[props.position[0] + 1.5, props.position[1], props.position[2] + 1]} />
    </>
  );
}
