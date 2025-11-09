import ScalingFrame from "./components/scaling-frame";
import { SceneManager } from "./components/scene-manager";

const height = window.innerHeight;

function App() {
  return (
    <ScalingFrame width={height / 16 * 9} height={height}>
      <SceneManager />
    </ScalingFrame>
  );
}

export default App;
