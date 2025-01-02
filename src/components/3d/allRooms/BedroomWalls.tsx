import * as THREE from "three";

import Emission from "../../../emissions/Emission";
import fragmentShader from "../../../shaders/bedRoom/fragment.glsl";
import vertexShader from "../../../shaders/bedRoom/vertex.glsl";

type Props = {
  nodes: Record<string, THREE.Object3D>;
  uWallColor?: string;
};

const BedroomWalls = ({ nodes, uWallColor }: Props) => {
  return (
    <>
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
    </>
  );
};

export default BedroomWalls;
