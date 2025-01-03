import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

import fragmentShader from "../../../shaders/storeRoom/fragment.glsl";
import vertexShader from "../../../shaders/storeRoom/vertex.glsl";

import wallFragmentShader from "./shaders/fragment.glsl";
import wallVertexShader from "./shaders/vertex.glsl";

import Emission from "../../../emissions/Emission";
import Mirror from "../../../emissions/mirror/Mirror";
import { useStore } from "../../../store/Store";

useGLTF.preload("./models/bathroom/bathroom-compressed.glb");
useTexture.preload("./models/bathroom/bathroom-texture.jpg");

const BathRoom = () => {
  const { nodes } = useGLTF("./models/bathroom/bathroom-compressed-origin.glb");
  const bakedTexture = useTexture("./models/bathroom/bathroom-texture.jpg");
  const storeRoom = useStore((state) => state.roomColors.storeRoom);

  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;

  return (
    <group position={[-9, 3.5, 7]} rotation={[0, 2, 0]}>
      <mesh geometry={(nodes["merged-geometry"] as THREE.Mesh).geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <Emission
        node={nodes["storeroom-wall-1"] as THREE.Mesh}
        vertexShader={wallVertexShader}
        fragmentShader={wallFragmentShader}
        uWallColor={storeRoom}
      />
      <Emission
        node={nodes["storeroom-wall-2"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={storeRoom}
      />
      <Emission
        node={nodes["storeroom-wall-3"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={storeRoom}
      />
      <Emission
        node={nodes["storeroom-wall-4"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={storeRoom}
      />

      <Mirror nodes={nodes} />
    </group>
  );
};

export default BathRoom;
