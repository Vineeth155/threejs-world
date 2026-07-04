// import { gsap } from "gsap";

import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience.tsx";
import Joystick from "./components/joystick.tsx";
import { useRef, useState } from "react";

export default function App() {
  const [startIntro, setStartIntro] = useState(false);
  const [gyroEnabled, setGyroEnabled] = useState(false);

  const toggleGyro = async () => {
    if (!gyroEnabled) {
      const ok = await requestGyroPermission();

      if (!ok) return;
    }

    setGyroEnabled((v) => !v);
  };

  const joystick = useRef({
    x: 0,
    y: 0,
  });

  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  async function requestGyroPermission() {
    if (
      typeof DeviceOrientationEvent !== "undefined" &&
      "requestPermission" in DeviceOrientationEvent
    ) {
      const result = await (DeviceOrientationEvent as any).requestPermission();
      return result === "granted";
    }

    return true;
  }

  return (
    <>
      {isTouch && !startIntro && (
        <button
          onClick={() => setStartIntro(true)}
          style={{
            position: "fixed",
            bottom: 40,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1000,
          }}
        >
          Start Driving
        </button>
      )}
      {isTouch && startIntro && (
        <button
          onClick={toggleGyro}
          style={{
            position: "fixed",
            bottom: 40,
            left: "55%",
            transform: "translateX(-50%)",
            zIndex: 1000,
          }}
        >
          {gyroEnabled ? "Disable Gyro" : "Enable Gyro"}
        </button>
      )}
      <Canvas
        camera={{ position: [100, 100, 150], fov: 55, near: 0.1, far: 10000 }}
      >
        <Experience
          joystick={joystick}
          startIntro={startIntro}
          gyroEnabled={gyroEnabled}
        />
      </Canvas>
      <Joystick
        onMove={(x, y) => {
          joystick.current = { x, y };
        }}
      />
    </>
  );
}
