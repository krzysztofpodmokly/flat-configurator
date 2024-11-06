import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import moonFragmentShader from "../../shaders/moon/fragment.glsl";
import moonVertexShader from "../../shaders/moon/vertex.glsl";
import { IEmission } from "../../interfaces";

const MoonLight = ({ nodes }: IEmission) => {
  const moonRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();
    if (moonRef.current) {
      moonRef.current.uniforms.uTime.value = elapsedTime;
    }
  });

  const uniforms = useMemo(
    () => ({
      uTime: new THREE.Uniform(0),
      uColorA: new THREE.Uniform(new THREE.Color("#495057")),
      uColorB: new THREE.Uniform(new THREE.Color("#dee2e6")),
    }),
    []
  );

  return (
    <mesh
      geometry={(nodes["moon-light"] as THREE.Mesh).geometry}
      position={nodes["moon-light"].position}
      rotation={nodes["moon-light"].rotation}
      scale={nodes["moon-light"].scale}
    >
      <shaderMaterial
        fragmentShader={moonFragmentShader}
        vertexShader={moonVertexShader}
        uniforms={uniforms}
        ref={moonRef}
      />
    </mesh>
  );
};

export default MoonLight;
