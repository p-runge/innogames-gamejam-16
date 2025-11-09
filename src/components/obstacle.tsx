import { useGame } from "../stores/game";
import Weapon from "./weapon";
import { DIMENSIONS as playerDimensions } from "./player";
import { Html } from "@react-three/drei";

export type ObstacleType = "o-rock" | "o-paper" | "o-scissors";

type Props = {
  type: ObstacleType;
  position: [number, number, number];
};

// eslint-disable-next-line react-refresh/only-export-components
export const DIMENSIONS: [number, number, number] = [5, 1, 1];

export default function Obstacle(props: Props) {
  const weapon = useGame((state) => state.weapon);
  const playerPosition = useGame((state) => state.playerPosition);
  const mapZ = useGame((state) => state.mapZ);

  const weaponZPosition = props.position[2] + 3;

  const weaponIsAheadOfPlayer = weaponZPosition + mapZ < playerPosition[2] - playerDimensions[2];

  return (
    <>
      <mesh {...props}>
        {/* <boxGeometry args={DIMENSIONS} />
        <meshStandardMaterial color={
          props.type === "o-rock" ? "red" : props.type === "o-paper" ? "blue" : "green"
        } /> */}
        <Html center>
          <div className="w-32 h-32 flex items-center justify-center text-white text-9xl font-bold">
            {{
              "o-rock": "🪨",
              "o-paper": "📄",
              "o-scissors": "✂️",
            }[props.type]}
          </div>
        </Html>
      </mesh>

      {(weaponIsAheadOfPlayer || (!weapon && weaponZPosition + mapZ < playerPosition[2])) && (
        <>
          <Weapon type="w-rock" position={[props.position[0] - 1.5, props.position[1], weaponZPosition]} />
          <Weapon type="w-paper" position={[props.position[0], props.position[1], weaponZPosition]} />
          <Weapon type="w-scissors" position={[props.position[0] + 1.5, props.position[1], weaponZPosition]} />
        </>)}
    </>
  );
}
