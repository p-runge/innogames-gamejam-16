import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type Props = {
  position: [number, number, number];
};

export default function Obstacle(props: Props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<THREE.Mesh>(null!);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((_state, delta) => (meshRef.current.position.z += delta));

  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry args={[5, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}
