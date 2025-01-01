import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import "./index.css";
import { Environment, OrbitControls } from "@react-three/drei";

import PostProcessingEffects from "./postprocessing/PostProcessingEffects";

import { useRef } from "react";
import Experience from "./components/experience/Experience";

function App() {
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
        {/* <OrbitControls
          target={[0, 0, 0]}
          dampingFactor={0.1}
          zoomSpeed={0.5}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.3}
          maxDistance={20}
          minDistance={10}
          screenSpacePanning={false}
        /> */}
        <Environment background preset="sunset" backgroundBlurriness={0.5} />
        <Experience />
        {/* <PostProcessingEffects /> */}
      </Canvas>
    </>
  );
}

export default App;
