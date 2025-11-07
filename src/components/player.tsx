import { useFrame } from "@react-three/fiber";
import { useGame } from "../store";
import { useState } from "react";

type Props = {
  position: [number, number, number];
};

export default function Player(props: Props) {
  const takeDamage = useGame((state) => state.takeDamage);

  // TODO: Replace with real damage logic
  const [seconds, setSeconds] = useState(0);
  useFrame((state) => {
    const newSeconds = Math.floor(state.clock.getElapsedTime());
    if (newSeconds !== seconds) {
      setSeconds(newSeconds);
      takeDamage();
    }
  });

  return (
    <mesh {...props}>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color="green" />
    </mesh>
  );
}
