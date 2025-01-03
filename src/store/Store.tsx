import { create } from "zustand";

interface IStore {
  roomColors: { [room: string]: string };
  setRoomColor: (room: string, color: string) => void;
}

export const useStore = create<IStore>((set) => ({
  roomColors: {
    diningRoom: "#abb4ac",
    storeRoom: "#352208",
    bedRoom: "#d8d8d8",
    gamingRoom: "#343a40",
    corridor: "#ced4da",
  },
  setRoomColor: (room: string, color: string) =>
    set((state) => ({
      roomColors: {
        ...state.roomColors,
        [room]: color,
      },
    })),
}));
