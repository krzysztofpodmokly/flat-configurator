import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import fragmentShader from "./shaders/fragment.glsl";
import vertexShader from "./shaders/vertex.glsl";
import * as THREE from "three";
import { useControls } from "leva";
import { useMemo } from "react";

const Experience = () => {
  const { nodes } = useGLTF("./model/8k/flat-optimized.glb");
  const bakedTexture = useTexture("./model/8k/baked-8k.jpg");
  bakedTexture.flipY = false;
  // bakedTexture.colorSpace = SRGBColorSpace;

  const params = useControls({
    colorA: "#a4f4b8",
  });

  // const uniforms = useMemo(
  //   () => ({
  //     uColorA: new THREE.Uniform(new THREE.Color(params.colorA)),
  //   }),
  //   []
  // );

  return (
    <>
      <OrbitControls makeDefault />
      <color args={["#201919"]} attach="background" />
      <mesh geometry={(nodes.merged as THREE.Mesh).geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <mesh
        geometry={(nodes.wall as THREE.Mesh).geometry}
        // position={nodes.wall.position}
        // rotation={nodes.wall.rotation}
        // scale={nodes.wall.scale}
      >
        <shaderMaterial
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          // uniforms={uniforms}
        />
      </mesh>
    </>
  );
};

export default Experience;
