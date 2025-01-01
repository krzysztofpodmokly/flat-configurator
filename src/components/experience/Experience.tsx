import { useSnapScroll } from "../../hooks/useSnapScroll";
import CameraRig from "../cameraRig/CameraRig";
import FloatingModel from "../shared/FloatingModel";

type Props = {};

function Experience({}: Props) {
  const { position } = useSnapScroll();

  return (
    <>
      <CameraRig>
        <FloatingModel model="all-rooms" positionY={position} />
        <FloatingModel model="dining-room" positionY={position - 8} />
        <FloatingModel model="bath-room" positionY={position - 16} />
        <FloatingModel model="gaming-room" positionY={position - 24} />
        <FloatingModel model="bed-room" positionY={position - 32} />
      </CameraRig>
    </>
  );
}

export default Experience;
