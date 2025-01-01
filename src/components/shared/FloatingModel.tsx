import { Float } from "@react-three/drei";
import AllRooms from "../3d/allRooms/AllRooms";
import BedRoom from "../3d/bedRoom/BedRoom";
import GamingRoom from "../3d/gamingRoom/GamingRoom";
import BathRoom from "../3d/bathRoom/BathRoom";
import DiningRoom from "../3d/diningRoom/DiningRoom";

type FloatingModelProps = {
  model: keyof typeof modelsMap;
  floatSpeed?: number;
  floatingRange?: [number, number];
  floatIntensity?: number;
  rotationIntensity?: number;
};

const modelsMap = {
  "all-rooms": <AllRooms />,
  "dining-room": <DiningRoom />,
  "bath-room": <BathRoom />,
  "gaming-room": <GamingRoom />,
  "bed-room": <BedRoom />,
};

function FloatingModel({
  model,
  floatSpeed = 1,
  rotationIntensity = 0.3,
  floatIntensity = 0.1,
  floatingRange = [-0.01, 0.01],
}: FloatingModelProps) {
  return (
    <Float
      speed={floatSpeed}
      floatingRange={floatingRange}
      floatIntensity={floatIntensity}
      rotationIntensity={rotationIntensity}
    >
      {modelsMap[model]}
    </Float>
  );
}

export default FloatingModel;
