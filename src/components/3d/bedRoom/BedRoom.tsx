import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

import fragmentShader from "../../../shaders/bedRoom/fragment.glsl";
import vertexShader from "../../../shaders/bedRoom/vertex.glsl";
import Emission from "../../../emissions/Emission";
import ComputerDisplays from "../../../emissions/computerDisplays/ComputerDisplays";
import gamingPosterVertexShader2 from "../../../shaders/posters/poster2/vertex.glsl";
import gamingPosterFragmentShader2 from "../../../shaders/posters/poster2/fragment.glsl";
import { useStore } from "../../../store/Store";
import { forwardRef } from "react";

useGLTF.preload("./models/bedRoom/bedroom.glb");
useTexture.preload("./models/bedRoom/bedroom-baked-texture.jpg");

const BedRoom = () => {
  const { nodes } = useGLTF("./models/bedRoom/bedroom.glb");
  const bakedTexture = useTexture("./models/bedRoom/bedroom-baked-texture.jpg");
  const bedRoom = useStore((state) => state.roomColors.bedRoom);

  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;

  // position={[-16, 5.8, 11.5]} rotation={[0, 4.5, -0.3]}
  return (
    <group position={[-23, 11.7, 17.5]} rotation={[0, 4.5, -0.3]}>
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
