// import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import { Center, Environment, OrbitControls, View } from "@react-three/drei";

// import PostProcessingEffects from "./postprocessing/PostProcessingEffects";

import { useRef, useState } from "react";
// import Experience from "./components/experience/Experience";
import FloatingModel, { FloatingModelProps } from "../shared/FloatingModel";
// import Content from "./components/content/Content";
import gsap from "gsap";
// import CameraRig from "./components/cameraRig/CameraRig";
import Button from "../button/Button";
import ViewCanvas from "../shared/ViewCanvas";
// import ViewCanvas from "./components/shared/ViewCanvas";

type Props = {};

const MODELS: { name: FloatingModelProps["model"]; color: string }[] = [
  { name: "all-rooms", color: "#710523" },
  { name: "dining-room", color: "#572981" },
  { name: "bath-room", color: "#164405" },
  { name: "gaming-room", color: "#690B3D" },
  { name: "bed-room", color: "#4B7002" },
];

const SPINS_ON_CHANGE = 7;

const Carousel = (props: Props) => {
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const modelRef = useRef<THREE.Group>(null);

  const changeModel = (index: number) => {
    if (!modelRef.current) return;

    const nextIndex = (index + MODELS.length) % MODELS.length;

    const tl = gsap.timeline();
    tl.to(modelRef.current.scale, {
      x: 0,
      y: 0,
      z: 0,
      ease: "power1.inOut",
      duration: 0.5,
      onComplete: () => {
        // Change the model index after scaling down
        setCurrentModelIndex(nextIndex);
      },
    })
      .to(".background", {
        backgroundColor: MODELS[nextIndex].color,
        duration: 1,
        ease: "power2.inOut",
      })
      .to(
        modelRef.current.scale,
        {
          x: 1,
          y: 1,
          z: 1,
          ease: "back.inOut",
          duration: 0.5,
        },
        "-=0.5", // Optional delay between animations
      );
  };

  return (
    <main className="carousel relative grid h-screen grid-rows-[auto,4fr,auto] justify-center overflow-hidden bg-white py-12 text-white">
      <div className="background absolute inset-0 bg-[#710523] opacity-50" />

      <h2 className="relative z-50 text-center text-5xl font-bold">Hello</h2>

      <div className="grid grid-cols-[auto,auto,auto] items-center">
        {/* <div
        className="relative z-50"
        onClick={() => changeModel(currentModelIndex - 1)}
      >
        Left
      </div> */}
        <Button onClick={() => changeModel(currentModelIndex - 1)} />
        <View className="aspect-square h-[70vmin] min-h-40">
          <Center>
            <FloatingModel
              model={MODELS[currentModelIndex].name}
              ref={modelRef}
            />
          </Center>
          <Environment
            files="/hdr/lobby.hdr"
            // background
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
            // background
            // preset="sunset"
            // backgroundBlurriness={0.5}
            // backgroundIntensity={0.1}
          />
        </View>
        <ViewCanvas />
        <Button
          onClick={() => changeModel(currentModelIndex + 1)}
          direction="right"
        />
      </div>
    </main>
  );
};

export default Carousel;
