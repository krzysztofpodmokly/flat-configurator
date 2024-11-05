import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

import gamingRoomFragmentShader from "../../shaders/gamingRoom/fragment.glsl";
import gamingRoomVertexShader from "../../shaders/gamingRoom/vertex.glsl";
import { generateArray } from "../../utils";
import { IEmission } from "../../interfaces";

const Gamingroom = ({ nodes, params }: IEmission) => {
  const numGamingRoomWalls = 4;
  const gamingRoomWallRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    // const elapsedTime = state.clock.getElapsedTime();

    if (gamingRoomWallRef.current) {
      gamingRoomWallRef.current.uniforms.uGamingRoom.value.set(
        params.gamingRoom
      );
    }
  });

  const uniforms = useMemo(
    () => ({
      uGamingRoom: new THREE.Uniform(new THREE.Color(params.gamingRoom)),
    }),
    []
  );

  return generateArray(numGamingRoomWalls).map((wallNumber) => {
    return (
      <mesh
        key={wallNumber}
        geometry={
          (nodes[`gaming-room-wall-${wallNumber}`] as THREE.Mesh).geometry
        }
        position={nodes[`gaming-room-wall-${wallNumber}`].position}
        rotation={nodes[`gaming-room-wall-${wallNumber}`].rotation}
        scale={nodes[`gaming-room-wall-${wallNumber}`].scale}
      >
        <shaderMaterial
          fragmentShader={gamingRoomFragmentShader}
          vertexShader={gamingRoomVertexShader}
          uniforms={uniforms}
          ref={gamingRoomWallRef}
        />
      </mesh>
    );
  });
};

export default Gamingroom;
