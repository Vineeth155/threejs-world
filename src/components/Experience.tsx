import { Grid, OrbitControls, ScrollControls } from "@react-three/drei";
import { Fennec } from "./Fennec";
// import { Suspense } from "react";
// import { FennecPhysics } from "./FennecPhysics";
// import { BallPhysics } from "./BallPhysics";
// import { Physics } from "@react-three/cannon";

// import { usePlane } from "@react-three/cannon";

// export function Ground() {
//   const [ref] = usePlane(() => ({
//     rotation: [-Math.PI / 2, 0, 0],
//     position: [0, 0, 0],
//   }));

//   return (
//     <mesh ref={ref} receiveShadow>
//       <planeGeometry args={[1000, 1000]} />
//       <meshStandardMaterial color="green" />
//     </mesh>
//   );
// }

export const Experience = ({
  joystick,
  startIntro,
  gyroEnabled,
}: {
  joystick: any;
  startIntro: boolean;
  gyroEnabled: boolean;
}) => {
  return (
    <>
      {/* <Physics gravity={[0, -9.81, 0]}> */}
      <ambientLight intensity={1.5} />
      <directionalLight position={[100, 200, 100]} intensity={2} />
      <OrbitControls enableZoom={false} enableRotate={false} />
      {/* <mesh>
        <boxGeometry />
        <meshNormalMaterial />
        </mesh> */}
      <ScrollControls pages={3} damping={0.1}>
        <Grid
          infiniteGrid
          cellSize={50}
          cellThickness={1}
          sectionSize={200}
          sectionThickness={2}
          fadeDistance={1500}
          fadeStrength={1}
        />
        {/* <Ground /> */}
        {/* <Suspense fallback={null}>
          <FennecPhysics position={[0, 2, 0]} />
          <BallPhysics position={[50, 1, 0]} />
        </Suspense> */}
        {/* </Physics> */}

        <Fennec
          scale={0.5}
          joystick={joystick}
          startIntro={startIntro}
          gyroEnabled={gyroEnabled}
        />
        {/* <Ball /> */}
      </ScrollControls>
    </>
  );
};
