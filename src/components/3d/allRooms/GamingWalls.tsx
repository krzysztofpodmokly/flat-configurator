import * as THREE from "three";

import Emission from "../../../emissions/Emission";
import fragmentShader from "../../../shaders/gamingRoom/fragment.glsl";
import vertexShader from "../../../shaders/gamingRoom/vertex.glsl";

type Props = {
  nodes: Record<string, THREE.Object3D>;
  uWallColor?: string;
};

const GamingWalls = ({ nodes, uWallColor }: Props) => {
  return (
    <>
      <Emission
        node={nodes["gaming-room-wall-1"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
      />
      <Emission
        node={nodes["gaming-room-wall-2"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
      />
      <Emission
        node={nodes["gaming-room-wall-3"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
      />
      <Emission
        node={nodes["gaming-room-wall-4"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
      />
    </>
  );
};

export default GamingWalls;
