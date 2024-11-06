import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import "./index.css";
import { Environment } from "@react-three/drei";
import FlatComponent from "./FlatComponent";

function App() {
  return (
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
      <Environment background preset="sunset" backgroundBlurriness={0.5} />
      <FlatComponent />
    </Canvas>
  );
}

export default App;
