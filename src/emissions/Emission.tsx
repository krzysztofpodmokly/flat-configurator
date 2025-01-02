import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { useTexture } from "@react-three/drei";

import defaultPosterFramentShader from "../shaders/default/fragment.glsl";
import defaultPosterVertexShader from "../shaders/default/vertex.glsl";

interface IEmission {
  node: THREE.Mesh;
  image: string;
  fragmentShader?: string;
  vertexShader?: string;
}

const Emission = ({ node, image, fragmentShader, vertexShader }: IEmission) => {
  const posterRef = useRef<THREE.ShaderMaterial>(null);
  const texture = useTexture(image);

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    if (posterRef.current) {
      posterRef.current.uniforms.uTime.value = elapsedTime;
    }
  });

  const uniforms = useMemo(
    () => ({
      uTime: new THREE.Uniform(0),
      uResolution: new THREE.Uniform(
        new THREE.Vector2(window.innerWidth, window.innerHeight)
      ),
      uTexture: new THREE.Uniform(texture),
      uDelay: new THREE.Uniform(0.07),
      uDirection: new THREE.Uniform(true),
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
        ref={posterRef}
      />
    </mesh>
  );
};

export default Emission;
