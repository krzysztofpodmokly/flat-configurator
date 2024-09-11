import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
// import { Perf } from "r3f-perf";
import Experience from "./Experience";

import "./index.css";

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
      {/* <Perf /> */}
      <Experience />
    </Canvas>
  );
}

export default App;
