import * as THREE from "three";
import { useMemo, useRef } from "react";

import computerDisplayFragmentShader from "../../shaders/computerDisplays/fragment.glsl";
import computerDisplayVertexShader from "../../shaders/computerDisplays/vertex.glsl";
import { IEmission } from "../../interfaces";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

const ComputerDisplays = ({ nodes, params }: IEmission) => {
  const computerDisplay1 = useRef<THREE.ShaderMaterial>(null);
  const computerDisplay2 = useRef<THREE.ShaderMaterial>(null);

  const matrixTexture = useTexture("./textures/matrix.webp");
  matrixTexture.wrapS = THREE.RepeatWrapping;
  matrixTexture.wrapT = THREE.RepeatWrapping;

  const uniforms = useMemo(
    () => ({
      uComputerDisplay: new THREE.Uniform(new THREE.Color(params.storeRoom)),
      uTexture: new THREE.Uniform(matrixTexture),
      uTime: new THREE.Uniform(0),
    }),
    []
  );

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    if (computerDisplay1.current) {
      computerDisplay1.current.uniforms.uComputerDisplay.value.set(
        params.storeRoom
      );
      computerDisplay1.current.uniforms.uTime.value = elapsedTime;
    }
  });

  return (
    <>
      <mesh
        geometry={(nodes["computer-display"] as THREE.Mesh).geometry}
        position={nodes[`computer-display`].position}
        rotation={nodes[`computer-display`].rotation}
        scale={nodes[`computer-display`].scale}
      >
        <shaderMaterial
          fragmentShader={computerDisplayFragmentShader}
          vertexShader={computerDisplayVertexShader}
          uniforms={uniforms}
          ref={computerDisplay1}
          // transparent
        />
      </mesh>
      <mesh
        geometry={(nodes["computer-display-1"] as THREE.Mesh).geometry}
        position={nodes["computer-display-1"].position}
        rotation={nodes["computer-display-1"].rotation}
        scale={nodes["computer-display-1"].scale}
      >
        <shaderMaterial
          fragmentShader={computerDisplayFragmentShader}
          vertexShader={computerDisplayVertexShader}
          uniforms={uniforms}
          ref={computerDisplay2}
        />
      </mesh>
    </>
  );
};

export default ComputerDisplays;
