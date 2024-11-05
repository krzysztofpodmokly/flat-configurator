import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

import corridorFragmentShader from "../../shaders/corridor/fragment.glsl";
import corridorVertexShader from "../../shaders/corridor/vertex.glsl";
import { generateArray } from "../../utils";
import { IEmission } from "../../interfaces";

const Corridor = ({ nodes, params }: IEmission) => {
  const numCorridorWalls = 9;
  const corridorWallRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    // const elapsedTime = state.clock.getElapsedTime();

    if (corridorWallRef.current) {
      corridorWallRef.current.uniforms.uCorridor.value.set(params.corridor);
    }
  });

  const uniforms = useMemo(
    () => ({
      uCorridor: new THREE.Uniform(new THREE.Color(params.corridor)),
    }),
    []
  );

  return generateArray(numCorridorWalls).map((wallNumber) => {
    return (
      <mesh
        key={wallNumber}
        geometry={(nodes[`corridor-wall-${wallNumber}`] as THREE.Mesh).geometry}
        position={nodes[`corridor-wall-${wallNumber}`].position}
        rotation={nodes[`corridor-wall-${wallNumber}`].rotation}
        scale={nodes[`corridor-wall-${wallNumber}`].scale}
      >
        <shaderMaterial
          fragmentShader={corridorFragmentShader}
          vertexShader={corridorVertexShader}
          uniforms={uniforms}
          ref={corridorWallRef}
        />
      </mesh>
    );
  });
};

export default Corridor;
