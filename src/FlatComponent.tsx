import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";

import dummyFragmentShader from "./shaders/dummy/fragment.glsl";
import dummyVertexShader from "./shaders/dummy/vertex.glsl";
import Storeroom from "./emissions/storeroom/Storeroom";
import Corridor from "./emissions/corridor/Corridor";
import Bedroom from "./emissions/bedroom/Bedroom";
import Gamingroom from "./emissions/gamingroom/Gamingroom";
import Diningroom from "./emissions/diningroom/Diningroom";
import Posters from "./emissions/posters/Posters";
import ComputerDisplays from "./emissions/computerDisplays/ComputerDisplays";
// import { TUniform } from "./interfaces";

const FlatComponent = () => {
  const { nodes } = useGLTF("./model/8k/flat.glb");
  const bakedTexture = useTexture("./model/8k/baked.jpg");

  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;

  const params = useControls({
    diningRoom: "#abb4ac",
    corridor: "#ced4da",
    storeRoom: "#583101",
    gamingRoom: "#11455f",
    bedRoom: "#d8d8d8",
  });

  console.log(nodes);

  return (
    <>
      <OrbitControls makeDefault />
      <color args={["#201919"]} attach="background" />
      <mesh geometry={(nodes["merged-geometry"] as THREE.Mesh).geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <Posters nodes={nodes} params={params} />
      <Diningroom nodes={nodes} params={params} />
      <Corridor nodes={nodes} params={params} />
      <Bedroom nodes={nodes} params={params} />
      <Gamingroom nodes={nodes} params={params} />
      <Storeroom nodes={nodes} params={params} />
      <ComputerDisplays nodes={nodes} params={params} />

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
    </>
  );
};

export default FlatComponent;
