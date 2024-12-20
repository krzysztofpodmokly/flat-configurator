import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
// import { useControls } from "leva";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import mirrorVertexShader from "../../shaders/mirror/vertex.glsl";
import mirrorFragmentShader from "../../shaders/mirror/fragment.glsl";
import { useMemo } from "react";

const BathRoom = () => {
  const { nodes } = useGLTF("./models/bathroom/bathroom-compressed.glb");
  const bakedTexture = useTexture("./models/bathroom/bathroom-texture.jpg");

  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;

  console.log(nodes);

  const uniforms = useMemo(
    () => ({
      uTime: new THREE.Uniform(0),
      uColorA: new THREE.Uniform(new THREE.Color("#fdf0d5")),
      uColorB: new THREE.Uniform(new THREE.Color("#03045e")),
    }),
    []
  );

  return (
    <>
      <color args={["#201919"]} attach="background" />
      <mesh geometry={(nodes["merged-geometry"] as THREE.Mesh).geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <mesh
        geometry={(nodes["storeroom-wall-1"] as THREE.Mesh).geometry}
        position={nodes["storeroom-wall-1"].position}
        rotation={nodes["storeroom-wall-1"].rotation}
        scale={nodes["storeroom-wall-1"].scale}
      >
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>

      <mesh
        geometry={(nodes["storeroom-wall-2"] as THREE.Mesh).geometry}
        position={nodes["storeroom-wall-2"].position}
        rotation={nodes["storeroom-wall-2"].rotation}
        scale={nodes["storeroom-wall-2"].scale}
      >
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>

      <mesh
        geometry={(nodes["storeroom-wall-3"] as THREE.Mesh).geometry}
        position={nodes["storeroom-wall-3"].position}
        rotation={nodes["storeroom-wall-3"].rotation}
        scale={nodes["storeroom-wall-3"].scale}
      >
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>

      <mesh
        geometry={(nodes["storeroom-wall-4"] as THREE.Mesh).geometry}
        position={nodes["storeroom-wall-4"].position}
        rotation={nodes["storeroom-wall-4"].rotation}
        scale={nodes["storeroom-wall-4"].scale}
      >
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>

      <mesh
        geometry={(nodes["mirror"] as THREE.Mesh).geometry}
        position={nodes["mirror"].position}
        rotation={nodes["mirror"].rotation}
        scale={nodes["mirror"].scale}
      >
        <shaderMaterial
          vertexShader={mirrorVertexShader}
          fragmentShader={mirrorFragmentShader}
          uniforms={uniforms}
        />
      </mesh>
    </>
  );
};

export default BathRoom;
