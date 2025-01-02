import * as THREE from "three";

import Emission from "../../../emissions/Emission";
import fragmentShader from "../../../shaders/diningRoom/fragment.glsl";
import vertexShader from "../../../shaders/diningRoom/vertex.glsl";

type Props = {
  nodes: Record<string, THREE.Object3D>;
  uWallColor?: string;
};

const DiningWalls = ({ nodes, uWallColor }: Props) => {
  return (
    <>
      <Emission
        node={nodes["dining-room-wall-1"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
        // roomType="diningRoom"
      />
      <Emission
        node={nodes["dining-room-wall-2"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
        // roomType="diningRoom"
      />
      <Emission
        node={nodes["dining-room-wall-3"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
        // roomType="diningRoom"
      />
    </>
  );
};

export default DiningWalls;
