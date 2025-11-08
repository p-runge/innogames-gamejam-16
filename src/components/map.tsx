import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { Mesh } from "three";
import { useGame } from "../store";
import { checkCollision } from "../utils/common";
import Obstacle, { DIMENSIONS as obstacleDimensions } from "./obstacle";
import { DIMENSIONS as playerDimensions } from "./player";

export default function Map() {
  const obstaclesZ: number[] = [
    0,
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

  const meshRef = useRef<Mesh>(null!);

  const [visibleObstacles, setVisibleObstacles] = useState<number[]>([]);
  const [collidedObstacles, setCollidedObstacles] = useState<Set<number>>(new Set());
  const playerPosition = useGame((state) => state.playerPosition);
  const takeDamage = useGame((state) => state.takeDamage);

  const setMapZ = useGame((state) => state.setMapZ);

  useFrame((_state, delta) => {
    const newMapZ = meshRef.current.position.z += delta;
    setMapZ(newMapZ);

    const newVisibleObstacles = obstaclesZ.filter(z => (
      // only show obstacles that are near the player
      z + newMapZ > -4 &&
      // don't show obstacles that are out of view behind the player
      z + newMapZ < 7
    ));

    setVisibleObstacles(newVisibleObstacles);

    // Check collisions
    newVisibleObstacles.forEach((z, index) => {
      const obstacleWorldZ = z + meshRef.current.position.z;
      const obstaclePosition: [number, number, number] = [0, 0, obstacleWorldZ];

      if (checkCollision(playerPosition, playerDimensions, obstaclePosition, obstacleDimensions)) {
        if (!collidedObstacles.has(index)) {
          takeDamage();
          setCollidedObstacles(prev => new Set(prev).add(index));
        }
      } else {
        // Reset collision state when no longer colliding
        if (collidedObstacles.has(index)) {
          setCollidedObstacles(prev => {
            const next = new Set(prev);
            next.delete(index);
            return next;
          });
        }
      }
    });
  });

  return (
    <mesh ref={meshRef}>
      {visibleObstacles.map((z, index) => (
        <Obstacle key={index} position={[0, 0, z]} />
      ))}
    </mesh>
  )
}
