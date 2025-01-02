import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

import fragmentShader from "../../../shaders/bedRoom/fragment.glsl";
import vertexShader from "../../../shaders/bedRoom/vertex.glsl";
import Emission from "../../../emissions/Emission";
import ComputerDisplays from "../../../emissions/computerDisplays/ComputerDisplays";
import gamingPosterVertexShader2 from "../../../shaders/posters/poster2/vertex.glsl";
import gamingPosterFragmentShader2 from "../../../shaders/posters/poster2/fragment.glsl";

const BedRoom = ({ uWallColor }: { uWallColor: string }) => {
  const { nodes } = useGLTF("./models/bedRoom/bedroom.glb");
  const bakedTexture = useTexture("./models/bedRoom/bedroom-baked-texture.jpg");

  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;

  return (
    <group position={[-12, 0, 6]} rotation={[0, 5, 0]}>
      <mesh geometry={(nodes["merged-geometry"] as THREE.Mesh).geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <Emission
        node={nodes["bedroom-wall-1"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
      />
      <Emission
        node={nodes["bedroom-wall-2"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
      />
      <Emission
        node={nodes["bedroom-wall-3"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
      />
      <Emission
        node={nodes["bedroom-wall-4"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
      />
      <Emission
        node={nodes["bedroom-wall-5"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
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
