import { HexColorPicker } from "react-colorful";

import { useStore } from "../../store/Store";

type Props = {
  roomType: string;
};

const ColorPicker = ({ roomType }: Props) => {
  const { roomColors, setRoomColor } = useStore((state) => state);
  return (
    <div className="color-picker top-0 md:absolute md:right-[-220px]">
      <HexColorPicker
        color={roomColors[roomType]}
        onChange={(color) => setRoomColor(roomType, color)}
      />
    </div>
  );
};

export default ColorPicker;
