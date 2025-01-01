import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { IModelProps } from "../../../interfaces";

const GamingRoom = ({ positionY }: IModelProps) => {
  const { nodes } = useGLTF("./models/gamingRoom/gaming-room.glb");
  const bakedTexture = useTexture(
    "./models/gamingRoom/gaming-baked-texture.jpg"
  );
  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;

  console.log(positionY);
  return (
    <group position={[-12, positionY, 3]} rotation={[0, 5, 0]}>
      <mesh geometry={(nodes["merged-geometry"] as THREE.Mesh).geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <mesh geometry={(nodes["gaming-room-wall-1"] as THREE.Mesh).geometry}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>

      <mesh geometry={(nodes["gaming-room-wall-2"] as THREE.Mesh).geometry}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>

      <mesh geometry={(nodes["gaming-room-wall-3"] as THREE.Mesh).geometry}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>

      <mesh geometry={(nodes["poster-1"] as THREE.Mesh).geometry}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>

      <mesh geometry={(nodes["poster-2"] as THREE.Mesh).geometry}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>

      <mesh geometry={(nodes["poster-3"] as THREE.Mesh).geometry}>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
    </group>
  );
};

export default GamingRoom;
