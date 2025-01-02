import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { IModelProps } from "../../../interfaces";
import { useRef } from "react";
import Emission from "../../../emissions/Emission";

const DiningRoom = ({ positionY }: IModelProps) => {
  const { nodes } = useGLTF("./models/diningRoom/dining-room-origin.glb");
  const bakedTexture = useTexture(
    "./models/diningRoom/dining-room-texture.jpg"
  );

  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;
  const ref = useRef<THREE.Group>(null);

  return (
    <group position={[-10, positionY, 4]} rotation={[0, 3, 0]} ref={ref}>
      <mesh geometry={(nodes["merged-geometry"] as THREE.Mesh).geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <Emission
        node={nodes["poster-1"] as THREE.Mesh}
        image={"./textures/cat.jpg"}
      />
      <Emission
        node={nodes["poster-2"] as THREE.Mesh}
        image={"./textures/cat.jpg"}
      />
      <Emission
        node={nodes["poster-3"] as THREE.Mesh}
        image={"./textures/cat.jpg"}
      />

      <Emission
        node={nodes["tv-grid"] as THREE.Mesh}
        image={"./textures/cat.jpg"}
      />

      <Emission
        node={nodes["wall-1"] as THREE.Mesh}
        image={"./textures/cat.jpg"}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />

      <Emission
        node={nodes["wall-2"] as THREE.Mesh}
        image={"./textures/cat.jpg"}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </group>
  );
};

export default DiningRoom;
