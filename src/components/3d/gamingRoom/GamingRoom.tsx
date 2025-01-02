import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";

import { IModelProps } from "../../../interfaces";
import Emission from "../../../emissions/Emission";
import fragmentShader from "../../../shaders/gamingRoom/fragment.glsl";
import vertexShader from "../../../shaders/gamingRoom/vertex.glsl";

import flowFragmentShader from "../diningRoom/shaders/fragment.glsl";
import flowVertexShader from "../diningRoom/shaders/vertex.glsl";
import wallFragmentShader from "./shaders/fragment.glsl";
import gradientFragmentShader from "./shaders/gradientFragment.glsl";
import wallVertexShader from "./shaders/vertex.glsl";
import ComputerDisplays from "../../../emissions/computerDisplays/ComputerDisplays";

const palletePoster = [
  "#585123",
  "#eec170",
  "#f2a65a",
  "#f58549",
  "#772f1a",
].map((color) => new THREE.Color(color));

const GamingRoom = ({ uWallColor }: IModelProps) => {
  const { nodes } = useGLTF("./models/gamingRoom/gaming-room.glb");
  const bakedTexture = useTexture(
    "./models/gamingRoom/gaming-baked-texture.jpg"
  );
  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;

  const posterUniforms = useMemo(
    () => ({
      uColors: new THREE.Uniform(palletePoster),
      uTimeFactor: new THREE.Uniform(0.03),
    }),
    []
  );

  return (
    <group position={[-12, 0, 3]} rotation={[0, 5, 0]}>
      <mesh geometry={(nodes["merged-geometry"] as THREE.Mesh).geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <Emission
        node={nodes["gaming-room-wall-1"] as THREE.Mesh}
        vertexShader={wallVertexShader}
        fragmentShader={gradientFragmentShader}
        uWallColor={uWallColor}
      />
      <Emission
        node={nodes["gaming-room-wall-2"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
      />
      <Emission
        node={nodes["gaming-room-wall-3"] as THREE.Mesh}
        vertexShader={wallVertexShader}
        fragmentShader={wallFragmentShader}
        uWallColor={uWallColor}
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
