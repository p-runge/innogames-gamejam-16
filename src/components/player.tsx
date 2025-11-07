type Props = {
  position: [number, number, number]
}

export default function Player(props: Props) {
  return (
    <mesh
      {...props}>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color="green" />
    </mesh>
  )
}
