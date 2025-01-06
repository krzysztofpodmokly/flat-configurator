import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

import dummyFragmentShader from "../../../shaders/dummy/fragment.glsl";
import dummyVertexShader from "../../../shaders/dummy/vertex.glsl";
import ComputerDisplays from "../../../emissions/computerDisplays/ComputerDisplays";
import Mirror from "../../../emissions/mirror/Mirror";
import MoonLight from "../../../emissions/moonLight/MoonLight";
import Posters from "./Posters";
import DiningWalls from "./DiningWalls";
import CorridorWalls from "./CorridorWalls";
import BedroomWalls from "./BedroomWalls";
import GamingWalls from "./GamingWalls";
import StoreroomWalls from "./StoreroomWalls";
import { useStore } from "../../../store/Store";
// import { useThree } from "@react-three/fiber";
// import { useMediaQuery } from "../../../hooks/useMediaQuery";

useGLTF.preload("./models/allRooms/all-rooms.glb");
useTexture.preload("./models/allRooms/all-rooms-texture.jpg");

const AllRooms = () => {
  const { nodes } = useGLTF("./models/allRooms/all-rooms.glb");
  const bakedTexture = useTexture("./models/allRooms/all-rooms-texture.jpg");
  // const isMobile = useMediaQuery("(max-width: 640px)", true);
  // const { viewport } = useThree();

  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;

  const { diningRoom, corridor, storeRoom, bedRoom, gamingRoom } = useStore(
    (state) => state.roomColors,
  );

  // const mobileDimension = viewport.width / 11;
  // const scale: [number, number, number] = isMobile
  //   ? [mobileDimension, mobileDimension, mobileDimension]
  //   : [1, 1, 1];

  // const position: [number, number, number] = isMobile
  //   ? [-12, 9, 14]
  //   : [-16.5, 10.5, 17.5];

  return (
    <group position={[-16.5, 10.5, 17.5]} rotation={[0, 0.15, 0.2]}>
      <mesh
        geometry={(nodes["merged-geometry"] as THREE.Mesh).geometry}
        position={(nodes["merged-geometry"] as THREE.Mesh).position}
        rotation={(nodes["merged-geometry"] as THREE.Mesh).rotation}
        scale={(nodes["merged-geometry"] as THREE.Mesh).scale}
      >
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <Posters nodes={nodes} />
      <DiningWalls nodes={nodes} uWallColor={diningRoom} />
      <CorridorWalls nodes={nodes} uWallColor={corridor} />
      <BedroomWalls nodes={nodes} uWallColor={bedRoom} />
      <GamingWalls nodes={nodes} uWallColor={gamingRoom} />
      <StoreroomWalls nodes={nodes} uWallColor={storeRoom} />

      <ComputerDisplays nodes={nodes} />
      <Mirror nodes={nodes} />
      <MoonLight nodes={nodes} />

      {/* DUMMY WALLS */}
      <mesh position={[3.288, 2.843, -1.77]} scale={[0.17, 0.185, 4.26]}>
        <meshBasicMaterial color={"#e1e1e1"} />
        <boxGeometry />
      </mesh>

      <mesh
        geometry={(nodes[`dining-room-wall-4`] as THREE.Mesh).geometry}
        position={nodes["dining-room-wall-4"].position}
        rotation={nodes["dining-room-wall-4"].rotation}
        scale={nodes["dining-room-wall-4"].scale}
      >
        <shaderMaterial
          fragmentShader={dummyFragmentShader}
          vertexShader={dummyVertexShader}
        />
      </mesh>
    </group>
  );
};

export default AllRooms;
