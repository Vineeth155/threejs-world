import { useEffect, useRef } from "react";
import * as nipplejs from "nipplejs";

interface Props {
  onMove: (x: number, y: number) => void;
}

export default function Joystick({ onMove }: Props) {
  const zoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!zoneRef.current) return;

    const joystick = nipplejs.create({
      zone: zoneRef.current!,
      mode: "static",
      position: {
        left: "90px",
        bottom: "90px",
      },
      color: "white",
      size: 120,
      restOpacity: 0.5,
    }) as any;

    joystick.on("move", (evt: any) => {
      const { x, y } = evt.data.vector;
      onMove(x, -y);
    });

    joystick.on("end", () => {
      onMove(0, 0);
    });

    return () => joystick.destroy();
  }, []);

  return (
    <div
      ref={zoneRef}
      style={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: 220,
        height: 220,
        zIndex: 9999,
        touchAction: "none",
      }}
    />
  );
}
