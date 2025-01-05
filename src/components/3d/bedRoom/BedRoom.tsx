import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

import fragmentShader from "../../../shaders/bedRoom/fragment.glsl";
import vertexShader from "../../../shaders/bedRoom/vertex.glsl";
import Emission from "../../../emissions/Emission";
import ComputerDisplays from "../../../emissions/computerDisplays/ComputerDisplays";
import gamingPosterVertexShader2 from "../../../shaders/posters/poster2/vertex.glsl";
import gamingPosterFragmentShader2 from "../../../shaders/posters/poster2/fragment.glsl";
import { useStore } from "../../../store/Store";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { useThree } from "@react-three/fiber";

useGLTF.preload("./models/bedRoom/bedroom.glb");
useTexture.preload("./models/bedRoom/bedroom-texture.jpg");

const BedRoom = () => {
  const { nodes } = useGLTF("./models/bedRoom/bedroom.glb");
  const bakedTexture = useTexture("./models/bedRoom/bedroom-texture.jpg");
  const bedRoom = useStore((state) => state.roomColors.bedRoom);
  const isMobile = useMediaQuery("(max-width: 640px)", true);
  const { viewport } = useThree();

  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;

  const mobileDimension = viewport.width / 11;
  const scale: [number, number, number] = isMobile
    ? [mobileDimension, mobileDimension, mobileDimension]
    : [1, 1, 1];

  const position: [number, number, number] = isMobile
    ? [-21, 11, 16.6]
    : [-23, 11.7, 17.5];

  return (
    <group position={position} rotation={[0, 4.5, -0.3]} scale={scale}>
      <mesh
        geometry={(nodes["merged-geometry"] as THREE.Mesh).geometry}
        position={(nodes["merged-geometry"] as THREE.Mesh).position}
        rotation={(nodes["merged-geometry"] as THREE.Mesh).rotation}
        scale={(nodes["merged-geometry"] as THREE.Mesh).scale}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <Emission
        node={nodes["bedroom-wall-1"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={bedRoom}
      />
      <Emission
        node={nodes["bedroom-wall-2"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={bedRoom}
      />
      <Emission
        node={nodes["bedroom-wall-3"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={bedRoom}
      />
      <Emission
        node={nodes["bedroom-wall-4"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={bedRoom}
      />
      <Emission
        node={nodes["bedroom-wall-5"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={bedRoom}
      />

      <ComputerDisplays nodes={nodes} />

      <Emission
        node={nodes["poster-5"] as THREE.Mesh}
        image={"./textures/italy.jpg"}
      />
      <Emission
        node={nodes["poster-9"] as THREE.Mesh}
        vertexShader={gamingPosterVertexShader2}
        fragmentShader={gamingPosterFragmentShader2}
      />
    </group>
  );
};

export default BedRoom;
