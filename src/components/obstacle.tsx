
type Props = {
  position: [number, number, number];
};

export default function Obstacle(props: Props) {

  return (
    <mesh {...props}>
      <boxGeometry args={[5, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}
