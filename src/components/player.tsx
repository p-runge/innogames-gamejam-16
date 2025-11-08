type Props = {
  position: [number, number, number];
};

// eslint-disable-next-line react-refresh/only-export-components
export const DIMENSIONS: [number, number, number] = [1, 2, 1];

export default function Player(props: Props) {
  return (
    <mesh {...props}>
      <boxGeometry args={DIMENSIONS} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}
