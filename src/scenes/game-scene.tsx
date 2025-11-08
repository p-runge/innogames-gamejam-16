import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import Controls from "../components/controls";
import Floor from "../components/floor";
import God from "../components/god";
import HealthBar from "../components/health-bar";
import Map from "../components/map";
import Player from "../components/player";
import PowerUpUI from "../components/power-up-ui";
import ProgressBar from "../components/progress-bar";
import { useGame } from "../stores/game";

export default function GameScene() {
  const setObstacles = useGame((s) => s.setObstacles);

  useEffect(() => {
    setObstacles([
      { z: -2, type: "fire" },
      { z: -6, type: "water" },
      { z: -10, type: "leaf" },
      { z: -16, type: "water" },
      { z: -20, type: "leaf" },
      { z: -24, type: "fire" },
      { z: -32, type: "leaf" },
      { z: -36, type: "fire" },
      { z: -40, type: "water" },
    ]);
  }, []);

  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
      <Controls />

      <ambientLight intensity={Math.PI / 2} />
      {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} /> */}
      <pointLight position={[0, 10, 5]} decay={0} intensity={Math.PI / 2} />

      <Floor position={[0, -1, 1]} />
      <Player />
      <Map />
      <God />

      <ProgressBar />
      <HealthBar />
      <PowerUpUI />
    </Canvas>
  )
}
