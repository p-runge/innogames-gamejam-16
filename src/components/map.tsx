import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { Mesh } from "three";
import { useGame } from "../stores/game";
import { checkCollision } from "../utils/common";
import Obstacle, { DIMENSIONS as obstacleDimensions, type ObstacleType } from "./obstacle";
import { DIMENSIONS as playerDimensions } from "./player";

export default function Map() {
  const obstacles: {
    z: number;
    type: ObstacleType
  }[] = [
      { z: -4, type: "water" },
      { z: -8, type: "leaf" },
      { z: -12, type: "fire" },
      { z: -16, type: "water" },
      { z: -20, type: "leaf" },
      { z: -24, type: "fire" },
      { z: -28, type: "water" },
      { z: -32, type: "leaf" },
      { z: -36, type: "fire" },
      { z: -40, type: "water" },
    ];


  const meshRef = useRef<Mesh>(null!);

  const [visibleObstacles, setVisibleObstacles] = useState<typeof obstacles>([]);
  const [collidedObstacles, setCollidedObstacles] = useState<Set<number>>(new Set());
  const playerPosition = useGame((state) => state.playerPosition);
  const takeDamage = useGame((state) => state.takeDamage);
  const setPowerUp = useGame((state) => state.setPowerUp);
  const powerUp = useGame((state) => state.powerUp);

  const setMapZ = useGame((state) => state.setMapZ);

  useFrame((_state, delta) => {
    const newMapZ = meshRef.current.position.z += delta * 3;
    setMapZ(newMapZ);

    const newVisibleObstacles = obstacles.filter(obstacle => (
      // only show obstacles that are near the player
      obstacle.z + newMapZ > -4 &&
      // don't show obstacles that are out of view behind the player
      obstacle.z + newMapZ < 7
    ));

    setVisibleObstacles(newVisibleObstacles);

    // Check collisions
    newVisibleObstacles.forEach((obstacle, index) => {
      const obstacleWorldZ = obstacle.z + meshRef.current.position.z;
      const obstaclePosition: [number, number, number] = [0, 0, obstacleWorldZ];

      if (checkCollision(playerPosition, playerDimensions, obstaclePosition, obstacleDimensions)) {
        if (!collidedObstacles.has(index)) {
          setPowerUp(null);
          setCollidedObstacles(prev => new Set(prev).add(index));

          if (powerUp !== obstacle.type) {
            takeDamage();
          }
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
      {visibleObstacles.map((obstacle, index) => (
        <Obstacle key={index} position={[0, 0, obstacle.z]} type={obstacle.type} />
      ))}
    </mesh>
  )
}
