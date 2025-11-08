import { useEffect } from "react";
import { useScene } from "../stores/scene";

export default function MenuScene() {
  const setScene = useScene((s) => s.setScene);
  useEffect(() => {
    const handleKeyDown = () => {
      setScene("story");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col justify-around items-center h-full font-extrabold">
      <div className="text-4xl">GameName</div>
      <button className="bg-red-500 text-white rounded-lg text-2xl p-2 px-4 font-bold">
        Press any key to start your journey
      </button>
    </div>
  );
}
