import { createContext, useContext, useEffect, useRef, useState } from "react";

type FrameContextType = {
  scale: number;
};
const ScalingFrameContext = createContext<FrameContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useScalingFrame() {
  const frame = useContext(ScalingFrameContext);
  if (!frame)
    throw new Error("useScalingFrame must be used within ScalingFrame");
  return frame;
}

export default function ScalingFrame({
  children,
  width,
  height,
}: {
  children: React.ReactNode;
  width: number;
  height: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);

  useEffect(() => {
    const resize = () => {
      if (!ref.current || !frameRef.current) return;

      const scale = Math.min(
        (1 / width) * frameRef.current.getClientRects()[0]!.width,
        (1 / height) * frameRef.current.getClientRects()[0]!.height
      );
      setScale(scale);
      ref.current.style.transform = `scale(${scale})`;
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [height, width]);

  return (
    <ScalingFrameContext.Provider value={{ scale }}>
      <div
        ref={frameRef}
        className="flex h-full w-full items-center justify-center overflow-hidden"
      >
        <div
          ref={ref}
          className="bg-[sky-blue]"
          style={{
            height,
            width,
            aspectRatio: `${width}/${height}`,
          }}
        >
          <div className="h-full overflow-hidden">{children}</div>
        </div>
      </div>
    </ScalingFrameContext.Provider>
  );
}
