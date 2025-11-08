import { Canvas } from "@react-three/fiber";
import Floor from "../components/floor";
import God from "../components/god";
import HealthBar from "../components/health-bar";
import Map from "../components/map";
import Player from "../components/player";
import PowerUpUI from "../components/power-up-ui";
import ProgressBar from "../components/progress-bar";

export default function GameScene() {
  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
      <ambientLight intensity={Math.PI / 2} />
      {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} /> */}
      <pointLight position={[0, 10, 5]} decay={0} intensity={Math.PI / 2} />
      <Floor position={[0, -1, 1]} />
      <Player position={[0, 0, 4]} />
      <Map />
      <God />
      <ProgressBar />
      <HealthBar />
      <PowerUpUI />
    </Canvas>
  )
}
