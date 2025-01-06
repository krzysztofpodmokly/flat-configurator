import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

import fragmentShader from "../../../shaders/storeRoom/fragment.glsl";
import vertexShader from "../../../shaders/storeRoom/vertex.glsl";
import wallFragmentShader from "./shaders/fragment.glsl";
import wallVertexShader from "./shaders/vertex.glsl";
import Emission from "../../../emissions/Emission";
import Mirror from "../../../emissions/mirror/Mirror";
import { useStore } from "../../../store/Store";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { useThree } from "@react-three/fiber";

useGLTF.preload("./models/bathroom/bathroom.glb");
useTexture.preload("./models/bathroom/bathroom-texture.jpg");

const BathRoom = () => {
  const { nodes } = useGLTF("./models/bathroom/bathroom.glb");
  const bakedTexture = useTexture("./models/bathroom/bathroom-texture.jpg");
  const storeRoom = useStore((state) => state.roomColors.storeRoom);
  const isMobile = useMediaQuery("(max-width: 640px)", true);
  const { viewport } = useThree();

  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;

  const mobileDimension = viewport.width / 15;
  const scale: [number, number, number] = isMobile
    ? [mobileDimension, mobileDimension, mobileDimension]
    : [1, 1, 1];

  const position: [number, number, number] = isMobile
    ? [-21, 12.5, 20]
    : [-21.8, 12.8, 20.7];

  return (
    <group position={[-21.8, 12.8, 20.7]} rotation={[0, 2.1, 0]}>
      <mesh
        geometry={(nodes["merged-geometry"] as THREE.Mesh).geometry}
        position={(nodes["merged-geometry"] as THREE.Mesh).position}
        rotation={(nodes["merged-geometry"] as THREE.Mesh).rotation}
        scale={(nodes["merged-geometry"] as THREE.Mesh).scale}
      >
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
