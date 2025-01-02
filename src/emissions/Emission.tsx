import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { useTexture } from "@react-three/drei";

import defaultPosterFramentShader from "../shaders/default/fragment.glsl";
import defaultPosterVertexShader from "../shaders/default/vertex.glsl";

interface IEmission {
  node: THREE.Mesh;
  image?: string;
  fragmentShader?: string;
  vertexShader?: string;
  params?: Record<string, string>;
  roomType?: string;
  uWallColor?: string;
}

const Emission = ({
  node,
  image,
  fragmentShader,
  vertexShader,
  // params,
  // roomType,
  uWallColor,
}: IEmission) => {
  const ref = useRef<THREE.ShaderMaterial>(null);
  const texture = image ? useTexture(image) : null;

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    if (ref.current) {
      ref.current.uniforms.uTime.value = elapsedTime;
      if (uWallColor) {
        ref.current.uniforms.uWall.value.set(uWallColor);
      }
    }
  });

  const uniforms = useMemo(
    () => ({
      uTime: new THREE.Uniform(0),
      uResolution: new THREE.Uniform(
        new THREE.Vector2(window.innerWidth, window.innerHeight)
      ),
      uDelay: new THREE.Uniform(0.07),
      uDirection: new THREE.Uniform(true),
      uTexture: new THREE.Uniform(texture),
      uWall: new THREE.Uniform(new THREE.Color(uWallColor)),
    }),
    []
  );

  return (
    <mesh
      geometry={node.geometry}
      position={node.position}
      rotation={node.rotation}
      scale={node.scale}
    >
      <shaderMaterial
        fragmentShader={fragmentShader || defaultPosterFramentShader}
        vertexShader={vertexShader || defaultPosterVertexShader}
        uniforms={uniforms}
        ref={ref}
      />
    </mesh>
  );
};

export default Emission;
