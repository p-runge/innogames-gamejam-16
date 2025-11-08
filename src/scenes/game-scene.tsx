import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import Controls from "../components/controls";
import Floor from "../components/floor";
import God from "../components/god";
import HealthBar from "../components/health-bar";
import Map from "../components/map";
import MatchUI from "../components/match-ui";
import Player from "../components/player";
import PowerUpUI from "../components/power-up-ui";
import ProgressBar from "../components/progress-bar";
import { useGame } from "../stores/game";
import { getRandomItem } from "../utils/common";


export default function GameScene() {
  const setObstacles = useGame((s) => s.setObstacles);
  const currentLevel = useGame((s) => s.currentLevel);

  useEffect(() => {
    if (!currentLevel) return;

    const obstacles = [...Array(currentLevel.obstacleCount)].map((_, i) => {
      return {
        z: - i * 5
          // offset before the first obstacle
          - 4,
        type: getRandomItem(["o-fire", "o-water", "o-leaf"] as const),
      };
    });
    setObstacles(obstacles);
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

      <MatchUI />
      <ProgressBar />
      <HealthBar />
      <PowerUpUI />
    </Canvas>
  )
}
