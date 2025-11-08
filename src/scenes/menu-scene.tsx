import { useEffect } from "react";
import { useScene } from "../stores/scene";

export default function MenuScene() {
  const setScene = useScene((s) => s.setScene);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        setScene("intro1");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col justify-around items-center h-full font-extrabold relative">
      <div className="text-center">
        <h1 className="text-7xl font-cloudy text-white">Mettwoch</h1>
        <p className="text-3xl text-white">The Real Day of the Lord</p>
        <img src="/mettbroetchen.png" className="w-48 mx-auto mb-4" />
      </div>
      <button className="bg-white text-[skyblue] rounded-lg text-2xl p-2 px-4 font-bold absolute bottom-24 animate-bounce">
        {"Press <Space> to start your journey"}
      </button>
    </div>
  );
}
