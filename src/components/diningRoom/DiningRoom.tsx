import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
// import { useControls } from "leva";

import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import { useStore } from "../../store/store";

const DiningRoom = () => {
  const { nodes } = useGLTF("./models/diningRoom/dining-room-compressed.glb");
  const bakedTexture = useTexture(
    "./models/diningRoom/dining-room-texture.jpg"
  );
  const position = useStore((state) => state.position);

  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;

  return (
    <group position={[-10, position - 4, 4]} rotation={[0, 3, 0]}>
      <color args={["#201919"]} attach="background" />
      <mesh geometry={(nodes["merged-geometry"] as THREE.Mesh).geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <mesh
        geometry={(nodes["poster-2"] as THREE.Mesh).geometry}
        position={nodes["poster-2"].position}
        rotation={nodes["poster-2"].rotation}
        scale={nodes["poster-2"].scale}
      >
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>

      <mesh
        geometry={(nodes["poster-1"] as THREE.Mesh).geometry}
        position={nodes["poster-1"].position}
        rotation={nodes["poster-1"].rotation}
        scale={nodes["poster-1"].scale}
      >
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>

      <mesh
        geometry={(nodes["poster-3"] as THREE.Mesh).geometry}
        position={nodes["poster-3"].position}
        rotation={nodes["poster-3"].rotation}
        scale={nodes["poster-3"].scale}
      >
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>

      <mesh
        geometry={(nodes["tv-grid"] as THREE.Mesh).geometry}
        position={nodes["tv-grid"].position}
        rotation={nodes["tv-grid"].rotation}
        scale={nodes["tv-grid"].scale}
      >
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>

      <mesh
        geometry={(nodes["wall-1"] as THREE.Mesh).geometry}
        position={nodes["wall-1"].position}
        rotation={nodes["wall-1"].rotation}
        scale={nodes["wall-1"].scale}
      >
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>

      <mesh
        geometry={(nodes["wall-2"] as THREE.Mesh).geometry}
        position={nodes["wall-2"].position}
        rotation={nodes["wall-2"].rotation}
        scale={nodes["wall-2"].scale}
      >
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
    </group>
  );
};

export default DiningRoom;
