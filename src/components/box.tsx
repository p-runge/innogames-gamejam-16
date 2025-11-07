import { useRef } from 'react'
import * as THREE from 'three'

type Props = {
  position?: [number, number, number]
}

export default function Box(props: Props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<THREE.Mesh>(null!)

  // Subscribe this component to the render-loop, rotate the mesh every frame
  // useFrame((_state, delta) => (meshRef.current.rotation.x += delta))

  return (
    <mesh
      {...props}
      ref={meshRef}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}
