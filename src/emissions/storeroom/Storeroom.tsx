import * as THREE from "three";

import storeRoomFragmentShader from "../../shaders/storeRoom/fragment.glsl";
import storeRoomVertexShader from "../../shaders/storeRoom/vertex.glsl";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { generateArray } from "../../utils";

const Storeroom = ({ nodes, params }: { nodes: any; params: any }) => {
  const numStoreRoomWalls = 4;
  const storeRoomWallRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    // const elapsedTime = state.clock.getElapsedTime();

    if (storeRoomWallRef.current) {
      storeRoomWallRef.current.uniforms.uStoreRoom.value.set(params.storeRoom);
    }
  });

  const storeRoomUniforms = useMemo(
    () => ({
      uStoreRoom: new THREE.Uniform(new THREE.Color(params.storeRoom)),
      uGradientLeft: new THREE.Uniform(true),
      uGradientRight: new THREE.Uniform(false),
      uGradientBottom: new THREE.Uniform(false),
    }),
    []
  );

  // return (
  //   <mesh
  //     geometry={(nodes[`storeroom-wall-1`] as THREE.Mesh).geometry}
  //     position={nodes[`storeroom-wall-1`].position}
  //     rotation={nodes[`storeroom-wall-1`].rotation}
  //     scale={nodes[`storeroom-wall-1`].scale}
  //   >
  //     <shaderMaterial
  //       fragmentShader={storeRoomFragmentShader}
  //       vertexShader={storeRoomVertexShader}
  //       uniforms={storeRoomUniforms}
  //       ref={storeRoomWallRef}
  //     />
  //   </mesh>
  // );
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
          uniforms={storeRoomUniforms}
          ref={storeRoomWallRef}
        />
      </mesh>
    );
  });
};

export default Storeroom;
