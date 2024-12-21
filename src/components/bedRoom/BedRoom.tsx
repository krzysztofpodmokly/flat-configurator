import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
// import { useControls } from "leva";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";

const BedRoom = () => {
  const { nodes } = useGLTF("./models/bedRoom/bedroom.glb");
  const bakedTexture = useTexture("./models/bedRoom/bedroom-baked-texture.jpg");

  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;

  console.log(nodes);

  return (
    <>
      <color args={["#201919"]} attach="background" />
      <mesh geometry={(nodes["merged-geometry"] as THREE.Mesh).geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <mesh geometry={(nodes["bedroom-wall-1"] as THREE.Mesh).geometry}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>

      <mesh geometry={(nodes["bedroom-wall-2"] as THREE.Mesh).geometry}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>

      <mesh geometry={(nodes["bedroom-wall-3"] as THREE.Mesh).geometry}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>

      <mesh geometry={(nodes["bedroom-wall-4"] as THREE.Mesh).geometry}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>

      <mesh geometry={(nodes["bedroom-wall-5"] as THREE.Mesh).geometry}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>

      <mesh geometry={(nodes["computer-display-1"] as THREE.Mesh).geometry}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>

      <mesh geometry={(nodes["poster-5"] as THREE.Mesh).geometry}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>

      <mesh geometry={(nodes["poster-9"] as THREE.Mesh).geometry}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
    </>
  );
};

export default BedRoom;
