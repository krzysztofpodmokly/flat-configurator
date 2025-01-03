import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { View } from "@react-three/drei";

const ViewCanvas = () => {
  return (
    <Canvas
      className="webgl"
      camera={{
        fov: 35,
        near: 0.1,
        far: 300,
        position: [-15, 5, 10],
      }}
      shadows
      gl={{
        antialias: true,
        alpha: false,
      }}
      style={{
        position: "fixed",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 30,
      }}
    >
      <Suspense fallback={null}>
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

        <View.Port />
        {/* <PostProcessingEffects /> */}
      </Suspense>
    </Canvas>
  );
};

export default ViewCanvas;
