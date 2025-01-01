import { useSnapScroll } from "../../hooks/useSnapScroll";
import FloatingModel from "../shared/FloatingModel";

type Props = {};

function Experience({}: Props) {
  const { position } = useSnapScroll();

  return (
    <>
      <FloatingModel model="all-rooms" positionY={position} />
      <FloatingModel model="dining-room" positionY={position - 4} />
      <FloatingModel model="bath-room" positionY={position - 8} />
      <FloatingModel model="gaming-room" positionY={position - 12} />
      <FloatingModel model="bed-room" positionY={position - 16} />
    </>
  );
}

export default Experience;
