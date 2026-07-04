// import { gsap } from "gsap";

import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience.tsx";
import Joystick from "./components/joystick.tsx";
import { useRef, useState } from "react";

export default function App() {
  const [startIntro, setStartIntro] = useState(false);

  const joystick = useRef({
    x: 0,
    y: 0,
  });

  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

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
      <Canvas
        camera={{ position: [100, 100, 150], fov: 55, near: 0.1, far: 10000 }}
      >
        <Experience joystick={joystick} startIntro={startIntro} />
      </Canvas>
      <Joystick
        onMove={(x, y) => {
          joystick.current = { x, y };
        }}
      />
    </>
  );
}
