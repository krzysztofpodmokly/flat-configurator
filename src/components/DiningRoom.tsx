import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
// import { useControls } from "leva";

const DiningRoom = () => {
  const { nodes } = useGLTF("./model/diningRoom/dining-room.glb");
  const bakedTexture = useTexture("./model/diningRoom/baked-8k.jpg");

  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;

  return (
    <>
      <color args={["#201919"]} attach="background" />
      <mesh geometry={(nodes["merged-geometry"] as THREE.Mesh).geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>
    </>
  );
};

export default DiningRoom;
