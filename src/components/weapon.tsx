import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import type { Mesh } from "three";
import { checkCollision } from "../utils/common";
import { useGame } from "../stores/game";
import { DIMENSIONS as playerDimensions } from "./player";
import { Html } from "@react-three/drei";

export type WeaponType = "w-rock" | "w-paper" | "w-scissors";

const RADIUS = 0.5;

type Props = {
  type: WeaponType;
  position: [number, number, number];
}

export default function Weapon(props: Props) {
  const playerPosition = useGame((state) => state.playerPosition);
  const setWeapon = useGame((state) => state.setWeapon);

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
        setWeapon(props.type);
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
      <Html center>
        <div className="w-16 h-16 text-6xl">
          {{
            "w-rock": "🪨",
            "w-paper": "📄",
            "w-scissors": "✂️",
          }[props.type]}
        </div>
      </Html>
      {/* <sphereGeometry args={[RADIUS, 32, 32]} />
      <meshStandardMaterial color={
        props.type === "w-rock" ? "darkred" :
          props.type === "w-paper" ? "darkblue" :
            "darkgreen"
      } /> */}
    </mesh>
  );
}
