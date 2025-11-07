import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";
import Obstacle from "./obstacle";

export default function Map() {
  const obstaclesZ: number[] = [
    0,
    -6,
    -8,
  ];
  // This reference will give us direct access to the mesh
  const meshRef = useRef<Mesh>(null!);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((_state, delta) => (meshRef.current.position.z += delta));

  return (
    <mesh ref={meshRef}>
      {obstaclesZ.map((z, index) => (
        <Obstacle key={index} position={[0, 0, z]} />
      ))}
    </mesh>
  )
}
