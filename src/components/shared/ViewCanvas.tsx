import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, Loader, View } from "@react-three/drei";

const ViewCanvas = () => {
  return (
    <>
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
          <Environment
            files="/hdr/lobby.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />

          <View.Port />
        </Suspense>
      </Canvas>
      <Loader
        containerStyles={{
          background: "#353535",
          justifyContent: "center",
        }}
        innerStyles={{
          background: "#353535",
        }}
        barStyles={{
          background: "#d6ccc2",
          height: "1px",
          width: "100vw",
          transform: "translateX(-50%)",
          position: "relative",
          left: "50%",
        }}
        dataStyles={{
          fontSize: "26px",
        }}
        dataInterpolation={(p) => `Loading ${p.toFixed(0)}%`}
      />
    </>
  );
};

export default ViewCanvas;
