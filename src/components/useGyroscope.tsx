import { useEffect, useRef } from "react";
import * as THREE from "three";

export function useGyro(enabled: boolean | undefined) {
  const steer = useRef(0);

  useEffect(() => {
    if (!enabled) {
      steer.current = 0;
      return;
    }

    const onOrientation = (e: DeviceOrientationEvent) => {
      // gamma = left/right tilt
      const gamma = e.gamma ?? 0;

      // Convert roughly ±30° into ±1
      const target = THREE.MathUtils.clamp(gamma / 30, -1, 1);

      // Smooth it
      steer.current = THREE.MathUtils.lerp(steer.current, target, 0.15);
    };

    window.addEventListener("deviceorientation", onOrientation);

    return () => {
      window.removeEventListener("deviceorientation", onOrientation);
    };
  }, [enabled]);

  return steer;
}
