import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

import storeRoomFragmentShader from "../../shaders/storeRoom/fragment.glsl";
import storeRoomVertexShader from "../../shaders/storeRoom/vertex.glsl";
import { generateArray } from "../../utils";
import { IEmission } from "../../interfaces";

const Storeroom = ({ nodes, params }: IEmission) => {
  const numStoreRoomWalls = 4;
  const storeRoomWallRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    // const elapsedTime = state.clock.getElapsedTime();

    if (storeRoomWallRef.current) {
      storeRoomWallRef.current.uniforms.uStoreRoom.value.set(params?.storeRoom);
    }
  });

  const uniforms = useMemo(
    () => ({
      uStoreRoom: new THREE.Uniform(new THREE.Color(params?.storeRoom)),
    }),
    []
  );

  return generateArray(numStoreRoomWalls).map((wallNumber) => {
    return (
      <mesh
        key={wallNumber}
        geometry={
          (nodes[`storeroom-wall-${wallNumber}`] as THREE.Mesh).geometry
        }
        position={nodes[`storeroom-wall-${wallNumber}`].position}
        rotation={nodes[`storeroom-wall-${wallNumber}`].rotation}
        scale={nodes[`storeroom-wall-${wallNumber}`].scale}
      >
        <shaderMaterial
          fragmentShader={storeRoomFragmentShader}
          vertexShader={storeRoomVertexShader}
          uniforms={uniforms}
          ref={storeRoomWallRef}
        />
      </mesh>
    );
  });
};

export default Storeroom;
