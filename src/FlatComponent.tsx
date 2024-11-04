import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
// import { Canvas, useLoader } from "@react-three/fiber";

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

import gamingRoomFragmentShader from "./shaders/gamingRoom/walls/fragment.glsl";
import gamingRoomVertexShader from "./shaders/gamingRoom/walls/vertex.glsl";

import diningTvFragmentShader from "./shaders/diningTv/fragment.glsl";
import diningTvVertexShader from "./shaders/diningTv/vertex.glsl";

import dummyFragmentShader from "./shaders/dummy/fragment.glsl";
import dummyVertexShader from "./shaders/dummy/vertex.glsl";

import gamingPosterFragmentShader1 from "./shaders/posters/poster1/fragment.glsl";
import gamingPosterVertexShader1 from "./shaders/posters/poster1/vertex.glsl";

import gamingPosterFragmentShader2 from "./shaders/posters/poster2/fragment.glsl";
import gamingPosterVertexShader2 from "./shaders/posters/poster2/vertex.glsl";

import gamingPosterFragmentShader3 from "./shaders/posters/poster3/fragment.glsl";
import gamingPosterVertexShader3 from "./shaders/posters/poster3/vertex.glsl";

import posterFragment1 from "./shaders/posters/poster4/fragment.glsl";
import posterVertex1 from "./shaders/posters/poster4/vertex.glsl";

import * as THREE from "three";
import { useControls } from "leva";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
// import { TUniform } from "./interfaces";

const FlatComponent = () => {
  const { nodes } = useGLTF("./model/8k/flat.glb");
  const bakedTexture = useTexture("./model/8k/baked.jpg");
  const catPosterTexture = useTexture("./textures/cat.jpg");
  const lotrPosterTexture = useTexture("./textures/lotr.jpg");
  const simpsonsPosterTexture = useTexture("./textures/simpsons.jpg");
  const italyPosterTexture = useTexture("./textures/italy.jpg");
  const ancientCyborgPosterTexture = useTexture("./textures/cyborg.jpg");
  const flamePosterTexture = useTexture("./textures/flame.jpg");
  const mixerPosterTexture = useTexture("./textures/mixer.jpg");
  const patronusPosterTexture = useTexture("./textures/patronus.jpg");
  const cosmosPosterTexture = useTexture("./textures/cosmos.jpg");

  bakedTexture.flipY = false;
  bakedTexture.colorSpace = THREE.SRGBColorSpace;

  const numDiningRoomWalls = 3;
  const numCorridorWalls = 9;
  const numGamingRoomWalls = 4;
  const numBedroomWalls = 4;
  const numStoreRoomWalls = 4;
  const numPictures = 10;

  const generateArray = (n: number) => {
    return Array.from({ length: n }, (_, i) => i + 1);
  };

  const diningRoomWallRef = useRef<THREE.ShaderMaterial>(null);
  const corridorWallRef = useRef<THREE.ShaderMaterial>(null);
  const storeRoomWallRef = useRef<THREE.ShaderMaterial>(null);
  const gamingRoomWallRef = useRef<THREE.ShaderMaterial>(null);
  const bedRoomWallRef = useRef<THREE.ShaderMaterial>(null);
  const posterRef = useRef<THREE.ShaderMaterial>(null);

  const params = useControls({
    diningRoom: "#abb4ac",
    corridor: "#ced4da",
    storeRoom: "#583101",
    gamingRoom: "#11455f",
    bedRoom: "#d8d8d8",
  });

  const roomUniforms = useMemo(
    () => ({
      uDiningRoom: new THREE.Uniform(new THREE.Color(params.diningRoom)),
      uCorridor: new THREE.Uniform(new THREE.Color(params.corridor)),
      uStoreRoom: new THREE.Uniform(new THREE.Color(params.storeRoom)),
      uGamingRoom: new THREE.Uniform(new THREE.Color(params.gamingRoom)),
      uBedRoom: new THREE.Uniform(new THREE.Color(params.gamingRoom)),
    }),
    []
  );

  const posterUniforms = useMemo(
    () => ({
      uTime: new THREE.Uniform(0),
      uResolution: new THREE.Uniform(
        new THREE.Vector2(window.innerWidth, window.innerHeight)
      ),
      // uCatPosterTexture: new THREE.Uniform(catPosterTexture),
      // uLotrPosterTexture: new THREE.Uniform(lotrPosterTexture),
      // uSimpsonsPosterTexture: new THREE.Uniform(simpsonsPosterTexture),
      // uItalyPosterTexture: new THREE.Uniform(italyPosterTexture),
      // uCyborgPosterTexture: new THREE.Uniform(ancientCyborgPosterTexture),
      // uFlamePosterTexture: new THREE.Uniform(flamePosterTexture),
      // uMixerPosterTexture: new THREE.Uniform(mixerPosterTexture),
      // uPatronusPosterTexture: new THREE.Uniform(patronusPosterTexture),
    }),
    []
  );

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    if (diningRoomWallRef.current) {
      diningRoomWallRef.current.uniforms.uDiningRoom.value.set(
        params.diningRoom
      );
    }

    if (corridorWallRef.current) {
      corridorWallRef.current.uniforms.uCorridor.value.set(params.corridor);
    }

    if (bedRoomWallRef.current) {
      bedRoomWallRef.current.uniforms.uBedRoom.value.set(params.bedRoom);
    }

    if (gamingRoomWallRef.current) {
      gamingRoomWallRef.current.uniforms.uGamingRoom.value.set(
        params.gamingRoom
      );
    }

    if (storeRoomWallRef.current) {
      storeRoomWallRef.current.uniforms.uStoreRoom.value.set(params.storeRoom);
    }

    if (posterRef.current) {
      posterRef.current.uniforms.uTime.value = elapsedTime;
    }
  });

  const postersConfigMap = [
    {
      id: 1,
      vertexShader: gamingPosterVertexShader3,
      fragmentShader: gamingPosterFragmentShader3,
    },
    {
      id: 2,
      vertexShader: gamingPosterVertexShader2,
      fragmentShader: gamingPosterFragmentShader2,
    },
    {
      id: 3,
      vertexShader: gamingPosterVertexShader1,
      fragmentShader: gamingPosterFragmentShader1,
    },
    {
      id: 4,
      vertexShader: posterVertex1,
      fragmentShader: posterFragment1,
      uniforms: {
        ...posterUniforms,
        uTexture: new THREE.Uniform(lotrPosterTexture),
      },
    },
    {
      id: 5,
      vertexShader: posterVertex1,
      fragmentShader: posterFragment1,
      uniforms: {
        ...posterUniforms,
        uTexture: new THREE.Uniform(catPosterTexture),
      },
    },
    {
      id: 6,
      vertexShader: posterVertex1,
      fragmentShader: posterFragment1,
      uniforms: {
        ...posterUniforms,
        uTexture: new THREE.Uniform(flamePosterTexture),
      },
    },
    {
      id: 7,
      vertexShader: posterVertex1,
      fragmentShader: posterFragment1,
      uniforms: {
        ...posterUniforms,
        uTexture: new THREE.Uniform(italyPosterTexture),
      },
    },
    {
      id: 8,
      vertexShader: posterVertex1,
      fragmentShader: posterFragment1,
      uniforms: {
        ...posterUniforms,
        uTexture: new THREE.Uniform(ancientCyborgPosterTexture),
      },
    },
    {
      id: 9,
      vertexShader: posterVertex1,
      fragmentShader: posterFragment1,
      uniforms: {
        ...posterUniforms,
        uTexture: new THREE.Uniform(cosmosPosterTexture),
      },
    },
    {
      id: 10,
      vertexShader: posterVertex1,
      fragmentShader: posterFragment1,
      uniforms: {
        ...posterUniforms,
        uTexture: new THREE.Uniform(italyPosterTexture),
      },
    },
  ];

  return (
    <>
      <OrbitControls makeDefault />
      <color args={["#201919"]} attach="background" />
      <mesh geometry={(nodes["merged-geometry"] as THREE.Mesh).geometry}>
        <meshBasicMaterial map={bakedTexture} />
      </mesh>

      <mesh
        geometry={(nodes[`dining-room-wall-4`] as THREE.Mesh).geometry}
        position={nodes["dining-room-wall-4"].position}
        rotation={nodes["dining-room-wall-4"].rotation}
        scale={nodes["dining-room-wall-4"].scale}
      >
        <shaderMaterial
          fragmentShader={dummyFragmentShader}
          vertexShader={dummyVertexShader}
          uniforms={posterUniforms}
          ref={posterRef}
        />
      </mesh>

      {generateArray(numPictures).map((picture, index) => {
        return (
          <mesh
            key={picture}
            geometry={(nodes[`poster-${picture}`] as THREE.Mesh).geometry}
            position={nodes[`poster-${picture}`].position}
            rotation={nodes[`poster-${picture}`].rotation}
            scale={nodes[`poster-${picture}`].scale}
          >
            <shaderMaterial
              fragmentShader={postersConfigMap[index].fragmentShader}
              vertexShader={postersConfigMap[index].vertexShader}
              uniforms={postersConfigMap[index].uniforms || posterUniforms}
              // ref={diningRoomWallRef}
            />
          </mesh>
        );
      })}

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
              uniforms={roomUniforms}
              ref={diningRoomWallRef}
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
              uniforms={roomUniforms}
              ref={corridorWallRef}
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
              uniforms={roomUniforms}
              ref={bedRoomWallRef}
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
              uniforms={roomUniforms}
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
              uniforms={roomUniforms}
              ref={storeRoomWallRef}
            />
          </mesh>
        );
      })}

      <mesh position={[3.288, 2.843, -1.77]} scale={[0.17, 0.185, 4.26]}>
        <meshBasicMaterial color={"#e1e1e1"} />
        <boxGeometry />
      </mesh>
    </>
  );
};

export default FlatComponent;
