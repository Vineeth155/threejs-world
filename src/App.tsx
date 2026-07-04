// import { gsap } from "gsap";

import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience.tsx";

export default function App() {
  return (
    <>
      <Canvas
        camera={{ position: [100, 100, 150], fov: 55, near: 0.1, far: 10000 }}
      >
        <Experience />
      </Canvas>
    </>
  );
}
