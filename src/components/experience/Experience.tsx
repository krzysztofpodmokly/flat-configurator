import { useFrame, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import GamingRoom from "../gamingRoom/GamingRoom";
import AllRooms from "../allRooms/AllRooms";

import { useStore } from "../../store/store";
import * as THREE from "three";
import BathRoom from "../bathRoom/BathRoom";
import DiningRoom from "../diningRoom/DiningRoom";
import BedRoom from "../bedRoom/BedRoom";

gsap.registerPlugin(useGSAP);

type Props = {};

function Experience({}: Props) {
  return (
    <>
      <AllRooms />
      <DiningRoom />
      <BathRoom />
      <GamingRoom />
      <BedRoom />
    </>
  );
}

export default Experience;
