import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { useTexture } from "@react-three/drei";

import { generateArray } from "../../utils";
import gamingPosterFragmentShader1 from "../../shaders/posters/poster1/fragment.glsl";
import gamingPosterVertexShader1 from "../../shaders/posters/poster1/vertex.glsl";
import gamingPosterFragmentShader2 from "../../shaders/posters/poster2/fragment.glsl";
import gamingPosterVertexShader2 from "../../shaders/posters/poster2/vertex.glsl";
import gamingPosterFragmentShader3 from "../../shaders/posters/poster3/fragment.glsl";
import gamingPosterVertexShader3 from "../../shaders/posters/poster3/vertex.glsl";
import posterFragment1 from "../../shaders/posters/poster4/fragment.glsl";
import posterVertex1 from "../../shaders/posters/poster4/vertex.glsl";
import { IEmission } from "../../interfaces";

const Posters = ({ nodes }: IEmission) => {
  const numPictures = 10;
  const posterRef = useRef<THREE.ShaderMaterial>(null);
  const catPosterTexture = useTexture("./textures/cat.jpg");
  const lotrPosterTexture = useTexture("./textures/lotr.jpg");
  const italyPosterTexture = useTexture("./textures/italy.jpg");
  const ancientCyborgPosterTexture = useTexture("./textures/cyborg.jpg");
  const flamePosterTexture = useTexture("./textures/flame.jpg");
  const patronusPosterTexture = useTexture("./textures/patronus.jpg");
  const supraPosterTexture = useTexture("./textures/supra.jpg");
  const skylinePosterTexture = useTexture("./textures/skyline.jpg");

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
      vertexShader: posterVertex1,
      fragmentShader: posterFragment1,
      uniforms: {
        ...uniforms,
        uTexture: new THREE.Uniform(supraPosterTexture),
        uDelay: new THREE.Uniform(0.07),
        uDirection: new THREE.Uniform(true),
      },
    },
    {
      id: 3,
      vertexShader: posterVertex1,
      fragmentShader: posterFragment1,
      uniforms: {
        ...uniforms,
        uTexture: new THREE.Uniform(skylinePosterTexture),
        uDelay: new THREE.Uniform(0.05),
        uDirection: new THREE.Uniform(false),
        uOffset: new THREE.Uniform(0),
      },
    },
    {
      id: 4,
      vertexShader: posterVertex1,
      fragmentShader: posterFragment1,
      uniforms: {
        ...uniforms,
        uTexture: new THREE.Uniform(lotrPosterTexture),
        uDelay: new THREE.Uniform(0.05),
        uDirection: new THREE.Uniform(true),
        uOffset: new THREE.Uniform(0.15),
      },
    },
    {
      id: 5,
      vertexShader: posterVertex1,
      fragmentShader: posterFragment1,
      uniforms: {
        ...uniforms,
        uTexture: new THREE.Uniform(catPosterTexture),
        uDelay: new THREE.Uniform(0.003),
        uDirection: new THREE.Uniform(false),
        uOffset: new THREE.Uniform(0),
      },
    },
    {
      id: 6,
      vertexShader: posterVertex1,
      fragmentShader: posterFragment1,
      uniforms: {
        ...uniforms,
        uTexture: new THREE.Uniform(flamePosterTexture),
        uDelay: new THREE.Uniform(0.05),
        uDirection: new THREE.Uniform(true),
        uOffset: new THREE.Uniform(0),
      },
    },
    {
      id: 7,
      vertexShader: posterVertex1,
      fragmentShader: posterFragment1,
      uniforms: {
        ...uniforms,
        uTexture: new THREE.Uniform(patronusPosterTexture),
        uDelay: new THREE.Uniform(0.06),
        uDirection: new THREE.Uniform(false),
        uOffset: new THREE.Uniform(0),
      },
    },
    {
      id: 8,
      vertexShader: posterVertex1,
      fragmentShader: posterFragment1,
      uniforms: {
        ...uniforms,
        uTexture: new THREE.Uniform(ancientCyborgPosterTexture),
        uDelay: new THREE.Uniform(0.025),
        uDirection: new THREE.Uniform(false),
        uOffset: new THREE.Uniform(0),
      },
    },
    {
      id: 9,
      vertexShader: gamingPosterVertexShader2,
      fragmentShader: gamingPosterFragmentShader2,
    },
    {
      id: 10,
      vertexShader: posterVertex1,
      fragmentShader: posterFragment1,
      uniforms: {
        ...uniforms,
        uTexture: new THREE.Uniform(italyPosterTexture),
        uDelay: new THREE.Uniform(0.04),
        uOffset: new THREE.Uniform(0),
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
