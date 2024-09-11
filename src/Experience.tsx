import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import diningRoomFragmentShader from "./shaders/diningRoom/fragment.glsl";
import diningRoomVertexShader from "./shaders/diningRoom/vertex.glsl";

import bedRoomFragmentShader from "./shaders/bedRoom/fragment.glsl";
import bedRoomVertexShader from "./shaders/bedRoom/vertex.glsl";

import corridorFragmentShader from "./shaders/corridor/fragment.glsl";
import corridorVertexShader from "./shaders/corridor/vertex.glsl";

import bathRoomFragmentShader from "./shaders/bathRoom/fragment.glsl";
import bathRoomVertexShader from "./shaders/bathRoom/vertex.glsl";

import storeRoomFragmentShader from "./shaders/storeRoom/fragment.glsl";
import storeRoomVertexShader from "./shaders/storeRoom/vertex.glsl";

import gamingRoomFragmentShader from "./shaders/gamingRoom/fragment.glsl";
import gamingRoomVertexShader from "./shaders/gamingRoom/vertex.glsl";

import * as THREE from "three";
import { useControls } from "leva";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { TUniform } from "./interfaces";

const Experience = () => {
  const { nodes } = useGLTF("./model/8k/flat-optimized-3.glb");
  const bakedTexture = useTexture("./model/8k/baked-8k.jpg");
  bakedTexture.flipY = false;
  // bakedTexture.colorSpace = THREE.SRGBColorSpace;

  console.log(nodes);

  const numDiningRoomWalls = 5;
  const numCorridorWalls = 11;
  const numGamingRoomWalls = 5;
  const numBathroomWalls = 4;
  const numBedroomWalls = 5;
  const numStoreRoomWalls = 4;

  const generateArray = (n: number) => {
    return Array.from({ length: n }, (_, i) => i + 1);
  };

  const diningRoomWallRef = useRef<
    THREE.ShaderMaterial & { uniforms: Record<TUniform, THREE.Uniform> }
  >(null);
  const bathRoomWallRef = useRef<
    THREE.ShaderMaterial & { uniforms: Record<TUniform, THREE.Uniform> }
  >(null);
  const corridorWallRef = useRef<
    THREE.ShaderMaterial & { uniforms: Record<TUniform, THREE.Uniform> }
  >(null);
  const storeRoomWallRef = useRef<
    THREE.ShaderMaterial & { uniforms: Record<TUniform, THREE.Uniform> }
  >(null);
  const gamingRoomWallRef = useRef<
    THREE.ShaderMaterial & { uniforms: Record<TUniform, THREE.Uniform> }
  >(null);
  const bedRoomWallRef = useRef<
    THREE.ShaderMaterial & { uniforms: Record<TUniform, THREE.Uniform> }
  >(null);

  const params = useControls({
    diningRoom: "#abb4ac",
    corridor: "#ced4da",
    bathRoom: "#000",
    storeRoom: "#583101",
    gamingRoom: "#11455f",
    bedRoom: "#d8d8d8",
  });

  const uniforms = useMemo(
    () => ({
      uDiningRoom: new THREE.Uniform(new THREE.Color(params.diningRoom)),
      uCorridor: new THREE.Uniform(new THREE.Color(params.corridor)),
      uBathRoom: new THREE.Uniform(new THREE.Color(params.bathRoom)),
      uStoreRoom: new THREE.Uniform(new THREE.Color(params.storeRoom)),
      uGamingRoom: new THREE.Uniform(new THREE.Color(params.gamingRoom)),
      uBedRoom: new THREE.Uniform(new THREE.Color(params.gamingRoom)),
    }),
    []
  );

  useFrame(() => {
    // const elapsedTime = state.clock.getElapsedTime();

    if (diningRoomWallRef.current) {
      diningRoomWallRef.current.uniforms.uDiningRoom.value.set(
        params.diningRoom
      );
    }

    if (bathRoomWallRef.current) {
      bathRoomWallRef.current.uniforms.uBathRoom.value.set(params.bathRoom);
    }

    if (corridorWallRef.current) {
      corridorWallRef.current.uniforms.uCorridor.value.set(params.corridor);
    }

    if (storeRoomWallRef.current) {
      storeRoomWallRef.current.uniforms.uStoreRoom.value.set(params.storeRoom);
    }

    if (gamingRoomWallRef.current) {
      gamingRoomWallRef.current.uniforms.uGamingRoom.value.set(
        params.gamingRoom
      );
    }

    if (bedRoomWallRef.current) {
      bedRoomWallRef.current.uniforms.uBedRoom.value.set(params.bedRoom);
    }
  });

  return (
    <>
      <OrbitControls makeDefault />
      <color args={["#201919"]} attach="background" />
      <mesh geometry={(nodes["merged-geometry"] as THREE.Mesh).geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      {generateArray(numDiningRoomWalls).map((wallNumber) => {
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
      })}

      {generateArray(numBathroomWalls).map((wallNumber) => {
        return (
          <mesh
            key={wallNumber}
            geometry={
              (nodes[`bathroom-wall-${wallNumber}`] as THREE.Mesh).geometry
            }
            position={nodes[`bathroom-wall-${wallNumber}`].position}
            rotation={nodes[`bathroom-wall-${wallNumber}`].rotation}
            scale={nodes[`bathroom-wall-${wallNumber}`].scale}
          >
            <shaderMaterial
              fragmentShader={bathRoomFragmentShader}
              vertexShader={bathRoomVertexShader}
              uniforms={uniforms}
              ref={bathRoomWallRef}
            />
          </mesh>
        );
      })}

      {generateArray(numBedroomWalls).map((wallNumber) => {
        return (
          <mesh
            key={wallNumber}
            geometry={
              (nodes[`bedroom-wall-${wallNumber}`] as THREE.Mesh).geometry
            }
            position={nodes[`bedroom-wall-${wallNumber}`].position}
            rotation={nodes[`bedroom-wall-${wallNumber}`].rotation}
            scale={nodes[`bedroom-wall-${wallNumber}`].scale}
          >
            <shaderMaterial
              fragmentShader={bedRoomFragmentShader}
              vertexShader={bedRoomVertexShader}
              uniforms={uniforms}
              ref={bedRoomWallRef}
            />
          </mesh>
        );
      })}

      {generateArray(numCorridorWalls).map((wallNumber) => {
        return (
          <mesh
            key={wallNumber}
            geometry={
              (nodes[`corridor-wall-${wallNumber}`] as THREE.Mesh).geometry
            }
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
      })}

      {generateArray(numGamingRoomWalls).map((wallNumber) => {
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
      })}

      {generateArray(numStoreRoomWalls).map((wallNumber) => {
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
      })}
    </>
  );
};

export default Experience;
