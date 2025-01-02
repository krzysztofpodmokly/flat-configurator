import * as THREE from "three";
import { useMemo, useRef } from "react";

import computerDisplayFragmentShader from "../../shaders/computerDisplays/fragment.glsl";
import computerDisplayVertexShader from "../../shaders/computerDisplays/vertex.glsl";
import { IEmission } from "../../interfaces";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

const ComputerDisplays = ({ nodes }: IEmission) => {
  const computerDisplay1 = useRef<THREE.ShaderMaterial>(null);
  const computerDisplay2 = useRef<THREE.ShaderMaterial>(null);

  const graph = useTexture("./textures/graph.jpg");
  const matrixTexture = useTexture("./textures/matrix.webp");
  graph.wrapS = THREE.RepeatWrapping;
  graph.wrapT = THREE.RepeatWrapping;
  matrixTexture.wrapS = THREE.RepeatWrapping;
  matrixTexture.wrapT = THREE.RepeatWrapping;

  const computerUniforms1 = useMemo(
    () => ({
      uTexture: new THREE.Uniform(matrixTexture),
      uTime: new THREE.Uniform(0),
      uHorizontal: new THREE.Uniform(false),
    }),
    []
  );

  const computerUniforms2 = useMemo(
    () => ({
      uTexture: new THREE.Uniform(graph),
      uTime: new THREE.Uniform(0),
      uHorizontal: new THREE.Uniform(true),
    }),
    []
  );

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    if (computerDisplay1.current) {
      computerDisplay1.current.uniforms.uTime.value = elapsedTime;
    }

    if (computerDisplay2.current) {
      computerDisplay2.current.uniforms.uTime.value = elapsedTime;
    }
  });

  return (
    <>
      {nodes["computer-display"] && (
        <mesh
          geometry={(nodes["computer-display"] as THREE.Mesh).geometry}
          position={nodes["computer-display"].position}
          rotation={nodes["computer-display"].rotation}
          scale={nodes["computer-display"].scale}
        >
          <shaderMaterial
            fragmentShader={computerDisplayFragmentShader}
            vertexShader={computerDisplayVertexShader}
            uniforms={computerUniforms1}
            ref={computerDisplay1}
          />
        </mesh>
      )}
      {nodes["computer-display-1"] && (
        <mesh
          geometry={(nodes["computer-display-1"] as THREE.Mesh).geometry}
          position={nodes["computer-display-1"].position}
          rotation={nodes["computer-display-1"].rotation}
          scale={nodes["computer-display-1"].scale}
        >
          <shaderMaterial
            fragmentShader={computerDisplayFragmentShader}
            vertexShader={computerDisplayVertexShader}
            uniforms={computerUniforms2}
            ref={computerDisplay2}
          />
        </mesh>
      )}
    </>
  );
};

export default ComputerDisplays;
