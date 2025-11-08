import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { Mesh } from "three";
import Obstacle from "./obstacle";

export default function Map() {
  const obstaclesZ: number[] = [
    -2,
    -6,
    -8,
    -12,
    -14,
    -18,
    -20,
    -24,
    -26,
    -30,
  ];
  // This reference will give us direct access to the mesh
  const meshRef = useRef<Mesh>(null!);

  const [visibleObstacles, setVisibleObstacles] = useState<number[]>([]);

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((_state, delta) => {
    meshRef.current.position.z += delta;
    setVisibleObstacles(
      obstaclesZ.filter(z => (
        // only show obstacles that are near the player
        z + meshRef.current.position.z > -4 &&
        // don't show obstacles that are out of view behind the player
        z + meshRef.current.position.z < 7
      ))
    );
  });

  return (
    <mesh ref={meshRef}>
      {visibleObstacles.map((z, index) => (
        <Obstacle key={index} position={[0, 0, z]} />
      ))}
    </mesh>
  )
}
