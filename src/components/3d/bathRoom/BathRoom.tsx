import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

import fragmentShader from "../../../shaders/storeRoom/fragment.glsl";
import vertexShader from "../../../shaders/storeRoom/vertex.glsl";

import wallFragmentShader from "./shaders/fragment.glsl";
import wallVertexShader from "./shaders/vertex.glsl";

import { IModelProps } from "../../../interfaces";
import Emission from "../../../emissions/Emission";
import Mirror from "../../../emissions/mirror/Mirror";

useGLTF.preload("./models/bathroom/bathroom-compressed.glb");
useTexture.preload("./models/bathroom/bathroom-texture.jpg");

const BathRoom = ({ uWallColor }: IModelProps) => {
  const { nodes } = useGLTF("./models/bathroom/bathroom-compressed-origin.glb");
  const bakedTexture = useTexture("./models/bathroom/bathroom-texture.jpg");

  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;

  return (
    <group position={[3, 0, 0]} rotation={[0, 2, 0]}>
      <mesh geometry={(nodes["merged-geometry"] as THREE.Mesh).geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <Emission
        node={nodes["storeroom-wall-1"] as THREE.Mesh}
        vertexShader={wallVertexShader}
        fragmentShader={wallFragmentShader}
        uWallColor={uWallColor}
      />
      <Emission
        node={nodes["storeroom-wall-2"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
      />
      <Emission
        node={nodes["storeroom-wall-3"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
      />
      <Emission
        node={nodes["storeroom-wall-4"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
      />

      <Mirror nodes={nodes} />
    </group>
  );
};

export default BathRoom;
