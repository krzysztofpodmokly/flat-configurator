import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";

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

const AllRooms = ({ uWallColor }: { uWallColor: string }) => {
  const { nodes } = useGLTF("./models/allRooms/all-rooms-compressed.glb");
  const bakedTexture = useTexture("./models/allRooms/all-rooms-texture.jpg");
  // const { position } = useStore((state) => state);

  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;

  const params = useControls({
    diningRoom: "#abb4ac",
    corridor: "#ced4da",
    storeRoom: "#352208",
    gamingRoom: "#343a40",
    bedRoom: "#d8d8d8",
  });

  return (
    <group position={[-3, 0, 4]} rotation={[0, 0, 0]}>
      <mesh geometry={(nodes["merged-geometry"] as THREE.Mesh).geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <Posters nodes={nodes} />
      <DiningWalls nodes={nodes} uWallColor={params.diningRoom} />
      <CorridorWalls nodes={nodes} uWallColor={params.corridor} />
      <BedroomWalls nodes={nodes} uWallColor={params.bedRoom} />
      <GamingWalls nodes={nodes} uWallColor={params.gamingRoom} />
      <StoreroomWalls nodes={nodes} uWallColor={params.storeRoom} />

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
