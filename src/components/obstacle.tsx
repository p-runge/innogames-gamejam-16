
type Props = {
  position: [number, number, number];
};

// eslint-disable-next-line react-refresh/only-export-components
export const DIMENSIONS: [number, number, number] = [5, 1, 1];

export default function Obstacle(props: Props) {

  return (
    <mesh {...props}>
      <boxGeometry args={DIMENSIONS} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}
