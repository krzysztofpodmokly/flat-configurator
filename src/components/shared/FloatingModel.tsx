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
  uWallColor?: string;
};

type ModelProps = {
  uWallColor?: string;
};

const modelsMap = {
  "all-rooms": (props: ModelProps) => <AllRooms {...props} />,
  "dining-room": (props: ModelProps) => <DiningRoom {...props} />,
  "bath-room": (props: ModelProps) => <BathRoom {...props} />,
  "gaming-room": (props: ModelProps) => <GamingRoom {...props} />,
  "bed-room": (props: ModelProps) => <BedRoom {...props} />,
};

function FloatingModel({
  model,
  floatSpeed = 1,
  rotationIntensity = 0.3,
  floatIntensity = 0.1,
  floatingRange = [-0.01, 0.01],
  uWallColor,
}: FloatingModelProps) {
  return (
    <Float
      speed={floatSpeed}
      floatingRange={floatingRange}
      floatIntensity={floatIntensity}
      rotationIntensity={rotationIntensity}
    >
      {modelsMap[model]({ uWallColor })}
    </Float>
  );
}

export default FloatingModel;
