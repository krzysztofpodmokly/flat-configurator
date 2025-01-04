import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";

import Emission from "../../../emissions/Emission";
import fragmentShader from "../../../shaders/gamingRoom/fragment.glsl";
import vertexShader from "../../../shaders/gamingRoom/vertex.glsl";
import flowFragmentShader from "../diningRoom/shaders/fragment.glsl";
import flowVertexShader from "../diningRoom/shaders/vertex.glsl";
import wallFragmentShader from "./shaders/fragment.glsl";
import gradientFragmentShader from "./shaders/gradientFragment.glsl";
import wallVertexShader from "./shaders/vertex.glsl";
import ComputerDisplays from "../../../emissions/computerDisplays/ComputerDisplays";
import { useStore } from "../../../store/Store";

const palletePoster = [
  "#585123",
  "#eec170",
  "#f2a65a",
  "#f58549",
  "#772f1a",
].map((color) => new THREE.Color(color));

useGLTF.preload("./models/gamingRoom/gaming-room.glb");
useTexture.preload("./models/gamingRoom/gaming-baked-texture.jpg");

const GamingRoom = () => {
  const { nodes } = useGLTF("./models/gamingRoom/gaming-room.glb");
  const bakedTexture = useTexture(
    "./models/gamingRoom/gaming-baked-texture.jpg",
  );
  const gamingRoom = useStore((state) => state.roomColors.gamingRoom);

  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;

  const posterUniforms = useMemo(
    () => ({
      uColors: new THREE.Uniform(palletePoster),
      uTimeFactor: new THREE.Uniform(0.03),
    }),
    [],
  );

  return (
    <group position={[-23, 12.5, 15.5]} rotation={[0, 4.5, -0.3]}>
      <mesh
        geometry={(nodes["merged-geometry"] as THREE.Mesh).geometry}
        position={(nodes["merged-geometry"] as THREE.Mesh).position}
        rotation={(nodes["merged-geometry"] as THREE.Mesh).rotation}
        scale={(nodes["merged-geometry"] as THREE.Mesh).scale}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <Emission
        node={nodes["gaming-room-wall-1"] as THREE.Mesh}
        vertexShader={wallVertexShader}
        fragmentShader={gradientFragmentShader}
        uWallColor={gamingRoom}
      />
      <Emission
        node={nodes["gaming-room-wall-2"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={gamingRoom}
      />
      <Emission
        node={nodes["gaming-room-wall-3"] as THREE.Mesh}
        vertexShader={wallVertexShader}
        fragmentShader={wallFragmentShader}
        uWallColor={gamingRoom}
      />

      <Emission
        node={nodes["poster-1"] as THREE.Mesh}
        vertexShader={flowVertexShader}
        fragmentShader={flowFragmentShader}
        extraUniforms={posterUniforms}
      />
      <Emission
        node={nodes["poster-2"] as THREE.Mesh}
        image="./textures/supra.jpg"
      />
      <Emission
        node={nodes["poster-3"] as THREE.Mesh}
        image="./textures/skyline.jpg"
      />
      <ComputerDisplays nodes={nodes} />
    </group>
  );
};

export default GamingRoom;
