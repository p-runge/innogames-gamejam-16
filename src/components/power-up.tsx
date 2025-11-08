import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { Mesh } from "three";
import { checkCollision } from "../utils/common";
import { useGame } from "../stores/game";
import { DIMENSIONS as playerDimensions } from "./player";

export type PowerUpType = "fire" | "water" | "leaf";

const RADIUS = 0.5;

type Props = {
  type: PowerUpType;
  position: [number, number, number];
}

export default function PowerUp(props: Props) {
  const playerPosition = useGame((state) => state.playerPosition);
  const setPowerUp = useGame((state) => state.setPowerUp);

  const [isColliding, setIsColliding] = useState(false);
  const mapZ = useGame((state) => state.mapZ);

  const meshRef = useRef<Mesh>(null!);
  useFrame(() => {
    const relativePosition: [number, number, number] = [
      props.position[0],
      props.position[1],
      props.position[2] + mapZ,
    ];
    if (checkCollision(playerPosition, playerDimensions, relativePosition, [RADIUS * 2, RADIUS * 2, RADIUS * 2])) {
      if (!isColliding) {
        setPowerUp(props.type);
        setIsColliding(true);
      }
    } else {
      // Reset collision state when no longer colliding
      if (isColliding) {
        setIsColliding(false);
      }
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={props.position}
    >
      <sphereGeometry args={[RADIUS, 32, 32]} />
      <meshStandardMaterial color={
        props.type === "fire" ? "darkred" :
          props.type === "water" ? "darkblue" :
            "darkgreen"
      } />
    </mesh>
  );
}
