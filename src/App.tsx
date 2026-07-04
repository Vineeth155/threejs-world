// import { gsap } from "gsap";

import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience.tsx";
import Joystick from "./components/joystick.tsx";
import { useRef } from "react";

export default function App() {
  const joystick = useRef({
    x: 0,
    y: 0,
  });

  return (
    <>
      <Canvas
        camera={{ position: [100, 100, 150], fov: 55, near: 0.1, far: 10000 }}
      >
        <Experience joystick={joystick} />
      </Canvas>
      <Joystick
        onMove={(x, y) => {
          joystick.current = { x, y };
        }}
      />
    </>
  );
}
