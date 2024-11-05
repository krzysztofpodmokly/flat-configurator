import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

import bedroomFragmentShader from "../../shaders/bedRoom/fragment.glsl";
import bedroomVertexShader from "../../shaders/bedRoom/vertex.glsl";
import { generateArray } from "../../utils";

const Bedroom = ({ nodes, params }: { nodes: any; params: any }) => {
  const numBedroomWalls = 4;
  const bedRoomWallRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    // const elapsedTime = state.clock.getElapsedTime();

    if (bedRoomWallRef.current) {
      bedRoomWallRef.current.uniforms.uBedRoom.value.set(params.bedRoom);
    }
  });

  const uniforms = useMemo(
    () => ({
      uBedRoom: new THREE.Uniform(new THREE.Color(params.bedRoom)),
    }),
    []
  );

  return generateArray(numBedroomWalls).map((wallNumber) => {
    return (
      <mesh
        key={wallNumber}
        geometry={(nodes[`bedroom-wall-${wallNumber}`] as THREE.Mesh).geometry}
        position={nodes[`bedroom-wall-${wallNumber}`].position}
        rotation={nodes[`bedroom-wall-${wallNumber}`].rotation}
        scale={nodes[`bedroom-wall-${wallNumber}`].scale}
      >
        <shaderMaterial
          fragmentShader={bedroomFragmentShader}
          vertexShader={bedroomVertexShader}
          uniforms={uniforms}
          ref={bedRoomWallRef}
        />
      </mesh>
    );
  });
};

export default Bedroom;
