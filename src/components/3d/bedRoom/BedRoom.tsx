import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
// import { useControls } from "leva";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { IModelProps } from "../../../interfaces";

const BedRoom = ({ positionY }: IModelProps) => {
  const { nodes } = useGLTF("./models/bedRoom/bedroom.glb");
  const bakedTexture = useTexture("./models/bedRoom/bedroom-baked-texture.jpg");

  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;

  return (
    <group position={[-12, positionY, 6]} rotation={[0, 5, 0]}>
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
    </group>
  );
};

export default BedRoom;
