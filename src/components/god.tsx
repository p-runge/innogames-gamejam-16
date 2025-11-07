export default function God() {
  return (
    <mesh position={[0, 3, -10]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="gold" />
    </mesh>
  );
}
