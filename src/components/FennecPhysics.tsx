import { useBox } from "@react-three/cannon";
import { Fennec } from "./Fennec";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Keyboard hook
function useKeyboard() {
  const keys = useRef<{ [key: string]: boolean }>({});

  useEffect(() => {
    const down = (e: KeyboardEvent) => (keys.current[e.code] = true);
    const up = (e: KeyboardEvent) => (keys.current[e.code] = false);

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  return keys;
}

export function FennecPhysics(props: any) {
  // Physics body: a box representing the car
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: props.position || [0, 2, 0],
    args: [4, 2, 6], // width, height, length
    linearDamping: 0.8,
    angularDamping: 0.9,
  }));

  const keys = useKeyboard();
  2;

  useFrame(() => {
    if (!ref.current) return;

    const moveSpeed = 10; // forward/backward speed
    const turnSpeed = 2; // turning speed

    // Read current rotation quaternion from the physics body
    const quat = ref.current.quaternion;
    const euler = new THREE.Euler().setFromQuaternion(quat);

    // Steering
    if (keys.current["KeyA"]) euler.y += turnSpeed * 0.02;
    if (keys.current["KeyD"]) euler.y -= turnSpeed * 0.02;

    // Apply updated rotation
    quat.setFromEuler(euler);

    // Forward/backward movement
    let zVel = 0;
    if (keys.current["KeyW"]) zVel = -moveSpeed;
    if (keys.current["KeyS"]) zVel = moveSpeed;

    // Compute forward vector relative to car rotation
    const forward = new THREE.Vector3(0, 0, zVel).applyQuaternion(quat);

    // Apply velocity
    api.velocity.set(forward.x, 0, forward.z);
  });

  return (
    <group ref={ref}>
      <Fennec scale={0.5} />
    </group>
  );
}
