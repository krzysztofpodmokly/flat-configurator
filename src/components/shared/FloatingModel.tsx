import { Float } from "@react-three/drei";
import AllRooms from "../3d/allRooms/AllRooms";
import BedRoom from "../3d/bedRoom/BedRoom";
import GamingRoom from "../3d/gamingRoom/GamingRoom";
import BathRoom from "../3d/bathRoom/BathRoom";
import DiningRoom from "../3d/diningRoom/DiningRoom";
import { forwardRef } from "react";
import { Group } from "three";

export interface FloatingModelProps {
  model: keyof typeof modelsMap;
  floatSpeed?: number;
  floatingRange?: [number, number];
  floatIntensity?: number;
  rotationIntensity?: number;
}

const modelsMap = {
  allRooms: <AllRooms />,
  diningRoom: <DiningRoom />,
  storeRoom: <BathRoom />,
  gamingRoom: <GamingRoom />,
  bedRoom: <BedRoom />,
};

const FloatingModel = forwardRef<Group, FloatingModelProps>(
  (
    {
      model,
      floatSpeed = 1,
      rotationIntensity = 0.07,
      floatIntensity = 0.3,
      floatingRange = [-0.1, 0.1],
    },
    ref,
  ) => {
    return (
      <group ref={ref}>
        <Float
          speed={floatSpeed}
          floatingRange={floatingRange}
          floatIntensity={floatIntensity}
          rotationIntensity={rotationIntensity}
        >
          {modelsMap[model]}
        </Float>
      </group>
    );
  },
);

export default FloatingModel;
