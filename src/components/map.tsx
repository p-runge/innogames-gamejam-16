import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { Mesh } from "three";
import { useGame } from "../stores/game";
import { checkCollision } from "../utils/common";
import Obstacle, { DIMENSIONS as obstacleDimensions } from "./obstacle";
import { DIMENSIONS as playerDimensions } from "./player";

export default function Map() {
  const obstacles = useGame((state) => state.obstacles);

  const meshRef = useRef<Mesh>(null!);

  const [visibleObstacles, setVisibleObstacles] = useState<typeof obstacles>([]);
  const [collidedObstacles, setCollidedObstacles] = useState<Set<number>>(new Set());
  const playerPosition = useGame((state) => state.playerPosition);
  const takeDamage = useGame((state) => state.takeDamage);
  const setPowerUp = useGame((state) => state.setPowerUp);
  const powerUp = useGame((state) => state.powerUp);
  const powerUpObstacleMap = useGame((state) => state.powerUpObstacleMap);
  const randomizePowerUpObstacleMap = useGame((state) => state.randomizePowerUpObstacleMap);

  const setMapZ = useGame((state) => state.setMapZ);
  const isPaused = useGame((state) => state.isPaused);

  const currentLevel = useGame((state) => state.currentLevel);
  const currentLevelIndex = useGame((s) => s.currentLevelIndex);

  useFrame((_state, delta) => {
    if (isPaused) {
      return;
    }

    const newMapZ = meshRef.current.position.z += delta * (currentLevel?.speed ?? 1);
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

          if (currentLevelIndex >= 2) {
            randomizePowerUpObstacleMap();
          }

          if (!powerUp || powerUpObstacleMap[powerUp] !== obstacle.type) {
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
