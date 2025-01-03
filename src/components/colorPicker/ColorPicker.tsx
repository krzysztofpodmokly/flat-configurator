import { HexColorPicker } from "react-colorful";

import { useStore } from "../../store/Store";

type Props = {
  roomType: string;
};

const ColorPicker = ({ roomType }: Props) => {
  const { roomColors, setRoomColor } = useStore((state) => state);
  return (
    <div className="color-picker absolute h-4 w-4">
      <HexColorPicker
        color={roomColors[roomType]}
        onChange={(color) => {
          console.log("color", roomType);

          setRoomColor(roomType, color);
        }}
      />
      <p>selected: {roomColors[roomType]}</p>
    </div>
  );
};

export default ColorPicker;
