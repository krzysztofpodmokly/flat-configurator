import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Perf } from "r3f-perf";
import Experience from "./Experience";

import "./index.css";

function App() {
  return (
    <Canvas
      className="webgl"
      camera={{
        // fov: 35,
        aspect: window.innerWidth / window.innerHeight,
        // near: 0.1,
        // far: 100,
      }}
      shadows
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        antialias: true,
      }}
    >
      <Perf />
      <Experience />
    </Canvas>
  );
}

export default App;
