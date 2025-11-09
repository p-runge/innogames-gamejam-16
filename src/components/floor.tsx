type Props = {
  position: [number, number, number];
};

export default function Floor(props: Props) {
  return (
    <mesh {...props}>
      <boxGeometry args={[5, 1, 19]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
