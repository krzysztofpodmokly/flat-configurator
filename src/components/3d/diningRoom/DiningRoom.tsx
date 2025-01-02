import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

import { IModelProps } from "../../../interfaces";
import { useMemo, useRef } from "react";
import Emission from "../../../emissions/Emission";
import fragmentShaderWall from "../../../shaders/diningRoom/fragment.glsl";
import vertexShaderWall from "../../../shaders/diningRoom/vertex.glsl";

import fragmentShader from "./shaders/fragment.glsl";
import vertexShader from "./shaders/vertex.glsl";

const palleteTv = ["#7ae582", "#25a18e", "#9fffcb", "#00a5cf", "#004e64"].map(
  (color) => new THREE.Color(color)
);

const palletePoster1 = [
  "#6d4c3d",
  "#727d71",
  "#dcc9b6",
  "#a39171",
  "#abc4ab",
].map((color) => new THREE.Color(color));

const palletePoster2 = [
  "#ffb703",
  "#8ecae6",
  "#219ebc",
  "#023047",
  "#fb8500",
].map((color) => new THREE.Color(color));

const DiningRoom = ({ uWallColor }: IModelProps) => {
  const { nodes } = useGLTF("./models/diningRoom/dining-room-origin.glb");
  const bakedTexture = useTexture(
    "./models/diningRoom/dining-room-texture.jpg"
  );

  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;
  const ref = useRef<THREE.Group>(null);

  const tvUniforms = useMemo(
    () => ({
      uColors: new THREE.Uniform(palleteTv),
      uTimeFactor: new THREE.Uniform(0.02),
    }),
    []
  );

  const poster1Uniforms = useMemo(
    () => ({
      uColors: new THREE.Uniform(palletePoster1),
      uTimeFactor: new THREE.Uniform(0.04),
    }),
    []
  );

  const poster2Uniforms = useMemo(
    () => ({
      uColors: new THREE.Uniform(palletePoster2),
      uTimeFactor: new THREE.Uniform(0.03),
    }),
    []
  );

  return (
    <group position={[-10, 0, 4]} rotation={[0, 3, 0]} ref={ref}>
      <mesh geometry={(nodes["merged-geometry"] as THREE.Mesh).geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <Emission
        node={nodes["poster-1"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        extraUniforms={poster2Uniforms}
      />
      <Emission
        node={nodes["poster-2"] as THREE.Mesh}
        image={"./textures/italy.jpg"}
      />
      <Emission
        node={nodes["poster-3"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        extraUniforms={poster1Uniforms}
      />

      <Emission
        node={nodes["tv-grid"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        extraUniforms={tvUniforms}
      />

      <Emission
        node={nodes["wall-1"] as THREE.Mesh}
        vertexShader={vertexShaderWall}
        fragmentShader={fragmentShaderWall}
        uWallColor={uWallColor}
      />

      <Emission
        node={nodes["wall-2"] as THREE.Mesh}
        vertexShader={vertexShaderWall}
        fragmentShader={fragmentShaderWall}
        uWallColor={uWallColor}
      />
    </group>
  );
};

export default DiningRoom;
