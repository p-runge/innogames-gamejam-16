import { Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useGame } from "../stores/game";

export default function God() {
  const currentLevel = useGame((s) => s.currentLevel);

  const mapZ = useGame((s) => s.mapZ);
  const setIsPaused = useGame((s) => s.setIsPaused);

  const [isTalking, setIsTalking] = useState(false);
  const [triggeredInstructions, setTriggeredInstructions] = useState<Set<number>>(new Set());
  const [currentInstruction, setCurrentInstruction] = useState<string | null>(null);

  useEffect(() => {
    if (!currentLevel?.instructions) {
      return
    }

    // Check each instruction to see if it should be triggered
    currentLevel.instructions.forEach((instruction, index) => {
      if (mapZ >= instruction.mapZ && !triggeredInstructions.has(index)) {
        setCurrentInstruction(instruction.text);
        setIsTalking(true);
        setTriggeredInstructions((prev) => new Set(prev).add(index));
      }
    });
  }, [mapZ, currentLevel, triggeredInstructions]);

  useEffect(() => {
    if (!isTalking) {
      return;
    }

    setIsPaused(true);

    function handleKeyDown(e: KeyboardEvent) {
      if (e.code !== "Space") {
        return;
      }

      setIsTalking(false);
      setIsPaused(false);

      window.removeEventListener("keydown", handleKeyDown);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isTalking]);

  const [showTalkingFrame, setShowTalkingFrame] = useState(false);

  useEffect(() => {
    if (!isTalking) {
      setShowTalkingFrame(false);
      return;
    }

    const interval = setInterval(() => {
      setShowTalkingFrame((prev) => !prev);
    }, 100);

    return () => clearInterval(interval);
  }, [isTalking]);

  const imageSrc = isTalking && showTalkingFrame
    ? "/god-cloud-talking.png"
    : "/god-cloud-default.png";

  return (
    <>
      <Html position={[0, 4, 0]} center>
        <div className="w-64">
          <img src={imageSrc} className="w-full" />
        </div>
      </Html>
      {currentInstruction && isTalking && <Html zIndexRange={[10]} position={[0, 3.6, 0]} center>
        {/* speech bubble */}
        <div className="bg-white p-2 rounded-lg shadow-lg max-w-xs w-[300px]">
          <p className="text-sm">
            {currentInstruction}
          </p>
        </div>
      </Html>}
      {isTalking && <Html position={[0, -6, 0]} center>
        {/* press any key to continue */}
        <div className="whitespace-nowrap text-center text-2xl font-bold animate-bounce">
          {"Press <Space> to continue"}
        </div>
      </Html>}
    </>
  );
}
