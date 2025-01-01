import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import "./index.css";
import { Environment, OrbitControls } from "@react-three/drei";
import FlatComponent from "./components/3d/allRooms/AllRooms";
import DiningRoom from "./components/diningRoom/DiningRoom";
import PostProcessingEffects from "./postprocessing/PostProcessingEffects";
import BathRoom from "./components/bathRoom/BathRoom";
import GamingRoom from "./components/gamingRoom/GamingRoom";
import BedRoom from "./components/bedRoom/BedRoom";
import Content from "./components/content/Content";
import { useRef } from "react";
import Experience from "./components/experience/Experience";

function App() {
  const contentRef = useRef(null);

  return (
    <>
      <Canvas
        // flat
        className="webgl"
        camera={{
          fov: 35,
          near: 0.1,
          far: 300,
          position: [-15, 5, 10],
        }}
        shadows
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          antialias: true,
        }}
      >
        <OrbitControls
          target={[0, 0, 0]}
          dampingFactor={0.1}
          zoomSpeed={0.5}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.3}
          maxDistance={20}
          minDistance={10}
          screenSpacePanning={false}
        />
        <Environment background preset="sunset" backgroundBlurriness={0.5} />
        <Experience />
        {/* <PostProcessingEffects /> */}
        {/* <FlatComponent /> */}
        {/* <BathRoom /> */}
        {/* <DiningRoom /> */}
        {/* <GamingRoom /> */}
        {/* <BedRoom /> */}
      </Canvas>
      <Content ref={contentRef} />
    </>
  );
}

export default App;
