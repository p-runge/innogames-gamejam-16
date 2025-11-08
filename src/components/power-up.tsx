import { useRef } from "react";
import type { Mesh } from "three";

type PowerUpType = "fire" | "water" | "leaf";

type Props = {
  type: PowerUpType;
  position: [number, number, number];
}

export default function PowerUp(props: Props) {
  const ref = useRef<Mesh>(null!);

  return (
    <mesh
      ref={ref}
      position={props.position}
    >
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={
        props.type === "fire" ? "darkred" :
          props.type === "water" ? "blue" :
            "green"
      } />
    </mesh>
  );
}
