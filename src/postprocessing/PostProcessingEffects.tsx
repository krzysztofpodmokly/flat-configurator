import {
  EffectComposer,
  Bloom,
  Vignette,
  SMAA,
  Autofocus,
} from "@react-three/postprocessing";

const PostProcessingEffects = () => {
  return (
    <EffectComposer enableNormalPass multisampling={0} autoClear={false}>
      <Autofocus bokehScale={4} focusRange={0.5} resolutionScale={0.5} />
      <SMAA />
      <Bloom
        luminanceThreshold={0.2}
        luminanceSmoothing={0.5}
        intensity={0.3}
        levels={9}
        mipmapBlur
      />
      <Vignette offset={0.3} darkness={0.7} />
    </EffectComposer>
  );
};

export default PostProcessingEffects;
