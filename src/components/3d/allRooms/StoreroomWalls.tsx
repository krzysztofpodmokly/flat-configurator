import * as THREE from "three";

import Emission from "../../../emissions/Emission";
import fragmentShader from "../../../shaders/storeRoom/fragment.glsl";
import vertexShader from "../../../shaders/storeRoom/vertex.glsl";

type Props = {
  nodes: Record<string, THREE.Object3D>;
  uWallColor?: string;
};

const StoreroomWalls = ({ nodes, uWallColor }: Props) => {
  return (
    <>
      <Emission
        node={nodes["storeroom-wall-1"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
      />
      <Emission
        node={nodes["storeroom-wall-2"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
      />
      <Emission
        node={nodes["storeroom-wall-3"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
      />
      <Emission
        node={nodes["storeroom-wall-4"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
      />
    </>
  );
};

export default StoreroomWalls;
