import * as THREE from "three";

import { Center, Environment, View } from "@react-three/drei";

import { useRef, useState } from "react";
import FloatingModel, { FloatingModelProps } from "../shared/FloatingModel";
import gsap from "gsap";
import { useControls } from "leva";

// import CameraRig from "./components/cameraRig/CameraRig";
import Button from "../button/Button";
import ViewCanvas from "../shared/ViewCanvas";
import ColorPicker from "../colorPicker/ColorPicker";

type ModelConfig = {
  name: FloatingModelProps["model"];
  color: string;
  roomType: string;
  spec: {
    area: string;
  };
};

const MODELS: ModelConfig[] = [
  {
    name: "allRooms",
    color: "#142135",
    roomType: "All Rooms",
    spec: { area: "65 m²" },
  },
  {
    name: "diningRoom",
    color: "#1b263b",
    roomType: "Dining Room",
    spec: { area: "27 m²" },
  },
  {
    name: "storeRoom",
    color: "#e0e1dd",
    roomType: "Bathroom & Storeroom",
    spec: { area: "4.5 + 3m²" },
  },
  {
    name: "gamingRoom",
    color: "#242424",
    roomType: "Gaming Room",
    spec: { area: "10 m²" },
  },
  {
    name: "bedRoom",
    color: "#033933",
    roomType: "Bedroom",
    spec: { area: "11 m²" },
  },
];

const Carousel = () => {
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const modelRef = useRef<THREE.Group>(null);

  // const params = useControls({
  //   diningRoom: "#abb4ac",
  //   corridor: "#ced4da",
  //   storeRoom: "#352208",
  //   gamingRoom: "#343a40",
  //   bedRoom: "#d8d8d8",
  // });

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
        "-=0.5",
      );
  };

  return (
    <main className="carousel relative grid h-screen grid-rows-[auto,6fr,auto] justify-center overflow-hidden py-12 text-white">
      <div className="background absolute inset-0 bg-[#142135] opacity-50" />

      {/* <h2 className="relative z-50 text-center text-5xl font-bold">
        {MODELS[currentModelIndex].roomType}
      </h2> */}

      <div className="grid grid-cols-[auto,minmax(300px,1200px),auto] items-center">
        <Button onClick={() => changeModel(currentModelIndex - 1)} />
        <View className="border-1 mx-5 aspect-auto h-[70vmin] min-h-40 rounded-xl border-2 border-white bg-white/10">
          <Center>
            <FloatingModel
              model={MODELS[currentModelIndex].name}
              ref={modelRef}
              // colorParams={}
            />
          </Center>
          <Environment
            files="/hdr/lobby.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />
        </View>
        <ViewCanvas />
        <Button
          onClick={() => changeModel(currentModelIndex + 1)}
          direction="right"
        />
      </div>

      <div className="text-area relative mx-auto mt-5 text-center">
        <div className="flex items-center justify-center rounded-xl border-2 border-white bg-white/10 p-3 text-4xl font-medium opacity-85">
          <p className="mx-3">{MODELS[currentModelIndex].roomType}</p> |
          <p className="mx-3">{MODELS[currentModelIndex].spec.area}</p>
        </div>
      </div>
      <ColorPicker
        roomType={
          MODELS[currentModelIndex].name === "allRooms"
            ? "diningRoom"
            : MODELS[currentModelIndex].name
        }
      />
    </main>
  );
};

export default Carousel;
