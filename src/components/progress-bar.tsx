import { Html } from "@react-three/drei";

export default function ProgressBar() {
  return (
    <Html position={[2, 1, 0]} center>
      <div className="bg-white rounded shadow overflow-hidden h-[400px] justify-end w-12 flex flex-col relative">
        <div className="bg-green-700 w-full h-1/2 relative">
          <div className="absolute">Player</div>
        </div>
        <div className="absolute top-0">Zielfahne</div>
      </div>
    </Html>
  );
}
