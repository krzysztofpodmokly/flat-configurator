import * as THREE from "three";

import { Center, View } from "@react-three/drei";

import { useRef, useState } from "react";
import FloatingModel, { FloatingModelProps } from "../shared/FloatingModel";
import gsap from "gsap";

import Button from "../button/Button";
import ViewCanvas from "../shared/ViewCanvas";
import ColorPicker from "../colorPicker/ColorPicker";
import { useStore } from "../../store/Store";

type ModelConfig = {
  name: FloatingModelProps["model"];
  color: string;
  roomType: string;
  spec: {
    area: string;
  };
  position: THREE.Vector3;
};

const MODELS: ModelConfig[] = [
  {
    name: "allRooms",
    color: "#d6ccc2",
    roomType: "All Rooms",
    spec: { area: "65 m²" },
    position: new THREE.Vector3(-4, 3, 3.8),
  },
  {
    name: "diningRoom",
    color: "#353535",
    roomType: "Dining Room",
    spec: { area: "27 m²" },
    position: new THREE.Vector3(-3.5, 3, 3.5),
  },
  {
    name: "storeRoom",
    color: "#fefae0",
    roomType: "Bathroom & Storeroom",
    spec: { area: "4.5 + 3m²" },
    position: new THREE.Vector3(-3.7, 3, 3.7),
  },
  {
    name: "gamingRoom",
    color: "#03045e",
    roomType: "Gaming Room",
    spec: { area: "10 m²" },
    position: new THREE.Vector3(-3.8, 3, 3.8),
  },
  {
    name: "bedRoom",
    color: "#283618",
    roomType: "Bedroom",
    spec: { area: "11 m²" },
    position: new THREE.Vector3(-4, 3, 4),
  },
];

const Carousel = () => {
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const modelRef = useRef<THREE.Group>(null);
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const { roomColors } = useStore((state) => state);

  const changeModel = (index: number) => {
    if (!modelRef.current) return;

    const nextIndex = (index + MODELS.length) % MODELS.length;

    const tl = gsap.timeline();

    tl.to(modelRef.current.scale, {
      x: 0,
      y: 0,
      z: 0,
      ease: "power2.inOut",
      duration: 0.2,
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
          ease: "power2.inOut",
          duration: 0.5,
        },
        "-=1.0",
      );

    // setCurrentModelIndex(nextIndex);
  };

  const currentColor =
    MODELS[currentModelIndex].name === "allRooms"
      ? "diningRoom"
      : MODELS[currentModelIndex].name;

  return (
    <main className="carousel relative flex h-screen flex-col justify-center overflow-hidden py-6 text-white md:block">
      <div className="background absolute inset-0 bg-[#d6ccc2] opacity-50" />

      <div className="grid w-screen grid-cols-1 items-center justify-center md:grid-cols-[auto,minmax(300px,1200px),auto]">
        <Button
          onClick={() => changeModel(currentModelIndex - 1)}
          className="max-md:hidden"
        />
        <View className="border-1 mx-5 aspect-auto h-[70vmin] min-h-40 rounded-xl border-2 border-white bg-white/10">
          <Center position={MODELS[currentModelIndex].position}>
            <FloatingModel
              model={MODELS[currentModelIndex].name}
              ref={modelRef}
            />
          </Center>
        </View>
        <ViewCanvas />
        <Button
          onClick={() => changeModel(currentModelIndex + 1)}
          direction="right"
          className="max-md:hidden"
        />
      </div>

      <div className="carousel-buttons-mobile mt-4 flex h-min items-center justify-center gap-3 md:hidden">
        <Button onClick={() => changeModel(currentModelIndex - 1)} />
        <Button
          onClick={() => changeModel(currentModelIndex + 1)}
          direction="right"
        />
      </div>

      <div className="text-area relative mx-auto mt-6 w-fit text-center md:mt-5">
        <div className="flex items-center justify-center rounded-xl border-2 border-white bg-white/10 p-3 text-2xl font-medium opacity-85 md:text-4xl">
          <div className="flex">
            <p className="mx-3">{MODELS[currentModelIndex].roomType}</p> |
            <p className="mx-3">{MODELS[currentModelIndex].spec.area}</p>
          </div>
          <button
            onClick={() => setIsPickerVisible(!isPickerVisible)}
            className="rounded-full border-2 border-white p-3"
            style={{
              backgroundColor: roomColors[currentColor],
            }}
          />
        </div>
        <div className="mx-auto mt-3 flex justify-center max-md:h-[250px]">
          {isPickerVisible ? <ColorPicker roomType={currentColor} /> : null}
        </div>
      </div>
    </main>
  );
};

export default Carousel;
