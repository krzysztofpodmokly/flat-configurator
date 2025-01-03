import { useControls } from "leva";
import FloatingModel from "../shared/FloatingModel";
import CameraRig from "../cameraRig/CameraRig";

type Props = {};

function Experience({}: Props) {
  const params = useControls({
    diningRoom: "#abb4ac",
    corridor: "#ced4da",
    storeRoom: "#352208",
    gamingRoom: "#343a40",
    bedRoom: "#d8d8d8",
  });

  return (
    <>
      {/* <CameraRig> */}
      {/* <FloatingModel model="all-rooms" /> */}
      {/* <FloatingModel model="dining-room" uWallColor={params.diningRoom} /> */}
      {/* <FloatingModel model="bath-room" uWallColor={params.storeRoom} /> */}
      {/* <FloatingModel model="gaming-room" uWallColor={params.gamingRoom} /> */}
      {/* <FloatingModel model="bed-room" uWallColor={params.bedRoom} /> */}
      {/* </CameraRig> */}
    </>
  );
}

export default Experience;
