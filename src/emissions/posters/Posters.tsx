import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

import diningRoomFragmentShader from "../../shaders/diningRoom/fragment.glsl";
import diningRoomVertexShader from "../../shaders/diningRoom/vertex.glsl";
import { generateArray } from "../../utils";
import { useTexture } from "@react-three/drei";

import gamingPosterFragmentShader1 from "../../shaders/posters/poster1/fragment.glsl";
import gamingPosterVertexShader1 from "../../shaders/posters/poster1/vertex.glsl";

import gamingPosterFragmentShader2 from "../../shaders/posters/poster2/fragment.glsl";
import gamingPosterVertexShader2 from "../../shaders/posters/poster2/vertex.glsl";

import gamingPosterFragmentShader3 from "../../shaders/posters/poster3/fragment.glsl";
import gamingPosterVertexShader3 from "../../shaders/posters/poster3/vertex.glsl";

import posterFragment1 from "../../shaders/posters/poster4/fragment.glsl";
import posterVertex1 from "../../shaders/posters/poster4/vertex.glsl";

const Posters = ({ nodes, params }: { nodes: any; params: any }) => {
  const numPictures = 10;
  const posterRef = useRef<THREE.ShaderMaterial>(null);
  const catPosterTexture = useTexture("./textures/cat.jpg");
  const lotrPosterTexture = useTexture("./textures/lotr.jpg");
  const simpsonsPosterTexture = useTexture("./textures/simpsons.jpg");
  const italyPosterTexture = useTexture("./textures/italy.jpg");
  const ancientCyborgPosterTexture = useTexture("./textures/cyborg.jpg");
  const flamePosterTexture = useTexture("./textures/flame.jpg");
  const mixerPosterTexture = useTexture("./textures/mixer.jpg");
  const patronusPosterTexture = useTexture("./textures/patronus.jpg");
  const cosmosPosterTexture = useTexture("./textures/cosmos.jpg");

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    if (posterRef.current) {
      posterRef.current.uniforms.uTime.value = elapsedTime;
    }
  });

  const uniforms = useMemo(
    () => ({
      uTime: new THREE.Uniform(0),
      uResolution: new THREE.Uniform(
        new THREE.Vector2(window.innerWidth, window.innerHeight)
      ),
    }),
    []
  );

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
        ...uniforms,
        uTexture: new THREE.Uniform(lotrPosterTexture),
      },
    },
    {
      id: 5,
      vertexShader: posterVertex1,
      fragmentShader: posterFragment1,
      uniforms: {
        ...uniforms,
        uTexture: new THREE.Uniform(catPosterTexture),
      },
    },
    {
      id: 6,
      vertexShader: posterVertex1,
      fragmentShader: posterFragment1,
      uniforms: {
        ...uniforms,
        uTexture: new THREE.Uniform(flamePosterTexture),
      },
    },
    {
      id: 7,
      vertexShader: posterVertex1,
      fragmentShader: posterFragment1,
      uniforms: {
        ...uniforms,
        uTexture: new THREE.Uniform(italyPosterTexture),
      },
    },
    {
      id: 8,
      vertexShader: posterVertex1,
      fragmentShader: posterFragment1,
      uniforms: {
        ...uniforms,
        uTexture: new THREE.Uniform(ancientCyborgPosterTexture),
      },
    },
    {
      id: 9,
      vertexShader: posterVertex1,
      fragmentShader: posterFragment1,
      uniforms: {
        ...uniforms,
        uTexture: new THREE.Uniform(cosmosPosterTexture),
      },
    },
    {
      id: 10,
      vertexShader: posterVertex1,
      fragmentShader: posterFragment1,
      uniforms: {
        ...uniforms,
        uTexture: new THREE.Uniform(italyPosterTexture),
      },
    },
  ];

  return generateArray(numPictures).map((picture, index) => {
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
          uniforms={postersConfigMap[index].uniforms || uniforms}
          ref={posterRef}
        />
      </mesh>
    );
  });
};

export default Posters;
