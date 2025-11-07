import { Canvas } from "@react-three/fiber";
import Floor from "./components/floor";
import Player from "./components/player";
import Obstacle from "./components/obstacle";

function App() {
  return (
    <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
      <ambientLight intensity={Math.PI / 2} />
      {/* <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} /> */}
      <pointLight position={[0, 10, 5]} decay={0} intensity={Math.PI / 2} />
      <Floor position={[0, -1, 1]} />
      <Player position={[0, 0, 4]} />
      <Obstacle position={[0, 0, -4]} />
    </Canvas>
  );
}

export default App;
