import { useSnapScroll } from "../../hooks/useSnapScroll";
import CameraRig from "../cameraRig/CameraRig";
import FloatingModel from "../shared/FloatingModel";

type Props = {};

function Experience({}: Props) {
  const { position } = useSnapScroll();

  return (
    <>
      {/* <CameraRig> */}
      <FloatingModel model="all-rooms" positionY={0} />
      {/* <FloatingModel model="dining-room" positionY={0} /> */}
      {/* <FloatingModel model="bath-room" positionY={0} /> */}
      {/* <FloatingModel model="gaming-room" positionY={0} /> */}
      {/* <FloatingModel model="bed-room" positionY={0} /> */}
      {/* </CameraRig> */}
    </>
  );
}

export default Experience;
