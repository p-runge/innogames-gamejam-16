import { useEffect, useState } from "react";
import { useGame } from "../stores/game";

export default function Controls() {
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());
  const playerPosition = useGame((state) => state.playerPosition);
  const setPlayerPosition = useGame((state) => state.setPlayerPosition);

  // handle player movement based on keys pressed
  useEffect(() => {
    if (keysPressed.has("ArrowLeft") && !keysPressed.has("ArrowRight")) {
      // Move player left
      const playerIsInLeftPosition = playerPosition[0] === -1.5;
      if (playerIsInLeftPosition) {
        return;
      }
      setPlayerPosition(([
        -1.5,
        playerPosition[1],
        playerPosition[2],
      ]));
    }
    if (keysPressed.has("ArrowRight") && !keysPressed.has("ArrowLeft")) {
      // Move player right
      const playerIsInRightPosition = playerPosition[0] === 1.5;
      if (playerIsInRightPosition) {
        return;
      }
      setPlayerPosition(([
        1.5,
        playerPosition[1],
        playerPosition[2],
      ]));
    }
    if ((
      !keysPressed.has("ArrowLeft") && !keysPressed.has("ArrowRight")
    ) || (
        keysPressed.has("ArrowLeft") && keysPressed.has("ArrowRight")
      )) {
      // Center player
      const playerIsInCenterPosition = playerPosition[0] === 0;
      if (playerIsInCenterPosition) {
        return;
      }
      setPlayerPosition(([
        0,
        playerPosition[1],
        playerPosition[2],
      ]));
    }
  }, [keysPressed]);

  // set up event listeners
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
          if (!keysPressed.has("ArrowLeft")) {
            setKeysPressed((prev) => new Set(prev).add("ArrowLeft"));
          }
          break;
        case "ArrowRight":
          if (!keysPressed.has("ArrowRight")) {
            setKeysPressed((prev) => new Set(prev).add("ArrowRight"));
          }
          break;
        default:
          break;
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      setKeysPressed((prev) => {
        const next = new Set(prev);
        if (prev.has(event.key)) {
          next.delete(event.key);
        }
        return next;
      });
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [keysPressed]);

  return null;
}
