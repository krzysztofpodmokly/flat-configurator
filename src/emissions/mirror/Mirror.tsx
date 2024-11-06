import * as THREE from "three";

import mirrorFragmentShader from "../../shaders/mirror/fragment.glsl";
import mirrorVertexShader from "../../shaders/mirror/vertex.glsl";
import { IEmission } from "../../interfaces";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Mirror = ({ nodes }: IEmission) => {
  const mirrorRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    if (mirrorRef.current) {
      mirrorRef.current.uniforms.uTime.value = elapsedTime;
    }
  });

  const uniforms = useMemo(
    () => ({
      uTime: new THREE.Uniform(0),
      uColorA: new THREE.Uniform(new THREE.Color("#fdf0d5")),
      uColorB: new THREE.Uniform(new THREE.Color("#03045e")),
    }),
    []
  );

  return (
    <mesh
      geometry={(nodes[`mirror`] as THREE.Mesh).geometry}
      position={nodes["mirror"].position}
      rotation={nodes["mirror"].rotation}
      scale={nodes["mirror"].scale}
    >
      <shaderMaterial
        fragmentShader={mirrorFragmentShader}
        vertexShader={mirrorVertexShader}
        uniforms={uniforms}
        ref={mirrorRef}
      />
    </mesh>
  );
};

export default Mirror;
