import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef } from "react";
import * as THREE from "three";

export default function CameraRig({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    easing.damp3(
      // @ts-ignore
      groupRef.current.rotation,
      [
        (-state.pointer.y * state.viewport.height) / 32,
        (state.pointer.x * state.viewport.width) / 32,
        0,
      ],
      0.5,
      delta,
    );
  });

  return <group ref={groupRef}>{children}</group>;
}
