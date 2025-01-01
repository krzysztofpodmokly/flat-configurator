import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
// import { useControls } from "leva";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { useStore } from "../../store/store";

const GamingRoom = () => {
  const { nodes } = useGLTF("./models/gamingRoom/gaming-room.glb");
  const bakedTexture = useTexture(
    "./models/gamingRoom/gaming-baked-texture.jpg"
  );

  const position = useStore((state) => state.position);
  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;

  return (
    <group position={[-12, position - 12, 3]} rotation={[0, 5, 0]}>
      <color args={["#201919"]} attach="background" />
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
