import FloatingModel from "../shared/FloatingModel";

type Props = {};

function Experience({}: Props) {
  return (
    <>
      <FloatingModel model="all-rooms" />
      <FloatingModel model="dining-room" />
      <FloatingModel model="bath-room" />
      <FloatingModel model="gaming-room" />
      <FloatingModel model="bed-room" />
    </>
  );
}

export default Experience;
