import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

import diningRoomFragmentShader from "../../shaders/diningRoom/fragment.glsl";
import diningRoomVertexShader from "../../shaders/diningRoom/vertex.glsl";
import { generateArray } from "../../utils";

const Diningroom = ({ nodes, params }: { nodes: any; params: any }) => {
  const numDiningRoomWalls = 3;
  const diningRoomWallRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    // const elapsedTime = state.clock.getElapsedTime();

    if (diningRoomWallRef.current) {
      diningRoomWallRef.current.uniforms.uDiningRoom.value.set(
        params.diningRoom
      );
    }
  });

  const uniforms = useMemo(
    () => ({
      uDiningRoom: new THREE.Uniform(new THREE.Color(params.diningRoom)),
    }),
    []
  );

  return generateArray(numDiningRoomWalls).map((wallNumber) => {
    return (
      <mesh
        key={wallNumber}
        geometry={
          (nodes[`dining-room-wall-${wallNumber}`] as THREE.Mesh).geometry
        }
        position={nodes[`dining-room-wall-${wallNumber}`].position}
        rotation={nodes[`dining-room-wall-${wallNumber}`].rotation}
        scale={nodes[`dining-room-wall-${wallNumber}`].scale}
      >
        <shaderMaterial
          fragmentShader={diningRoomFragmentShader}
          vertexShader={diningRoomVertexShader}
          uniforms={uniforms}
          ref={diningRoomWallRef}
        />
      </mesh>
    );
  });
};

export default Diningroom;
