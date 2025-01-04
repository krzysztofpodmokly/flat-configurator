import * as THREE from "three";

import Emission from "../../../emissions/Emission";
import fragmentShader from "../../../shaders/corridor/fragment.glsl";
import vertexShader from "../../../shaders/corridor/vertex.glsl";

type Props = {
  nodes: Record<string, THREE.Object3D>;
  uWallColor?: string;
};

const CorridorWalls = ({ nodes, uWallColor }: Props) => {
  return (
    <>
      <Emission
        node={nodes["corridor-wall-1"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
      />
      <Emission
        node={nodes["corridor-wall-2"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
      />
      <Emission
        node={nodes["corridor-wall-3"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
      />
      <Emission
        node={nodes["corridor-wall-4"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
      />
      <Emission
        node={nodes["corridor-wall-5"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
      />
      <Emission
        node={nodes["corridor-wall-6"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
      />
      <Emission
        node={nodes["corridor-wall-7"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
      />
      <Emission
        node={nodes["corridor-wall-8"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
      />
      <Emission
        node={nodes["corridor-wall-9"] as THREE.Mesh}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uWallColor={uWallColor}
      />
    </>
  );
};

export default CorridorWalls;
