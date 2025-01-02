import * as THREE from "three";

import gamingPosterVertexShader3 from "../../../shaders/posters/poster3/vertex.glsl";
import gamingPosterFragmentShader3 from "../../../shaders/posters/poster3/fragment.glsl";
import gamingPosterVertexShader2 from "../../../shaders/posters/poster2/vertex.glsl";
import gamingPosterFragmentShader2 from "../../../shaders/posters/poster2/fragment.glsl";
import Emission from "../../../emissions/Emission";

type Props = {
  nodes: Record<string, THREE.Object3D>;
};

const Posters = ({ nodes }: Props) => {
  return (
    <>
      <Emission
        node={nodes["poster-1"] as THREE.Mesh}
        vertexShader={gamingPosterVertexShader3}
        fragmentShader={gamingPosterFragmentShader3}
      />

      <Emission
        node={nodes["poster-2"] as THREE.Mesh}
        image="./textures/supra.jpg"
      />

      <Emission
        node={nodes["poster-3"] as THREE.Mesh}
        image="./textures/skyline.jpg"
      />

      <Emission
        node={nodes["poster-4"] as THREE.Mesh}
        image="./textures/lotr.jpg"
      />

      <Emission
        node={nodes["poster-5"] as THREE.Mesh}
        image="./textures/cat.jpg"
      />

      <Emission
        node={nodes["poster-6"] as THREE.Mesh}
        image="./textures/flame.jpg"
      />

      <Emission
        node={nodes["poster-7"] as THREE.Mesh}
        image="./textures/patronus.jpg"
      />

      <Emission
        node={nodes["poster-8"] as THREE.Mesh}
        image="./textures/cyborg.jpg"
      />

      <Emission
        node={nodes["poster-9"] as THREE.Mesh}
        vertexShader={gamingPosterVertexShader2}
        fragmentShader={gamingPosterFragmentShader2}
      />

      <Emission
        node={nodes["poster-10"] as THREE.Mesh}
        image="./textures/italy.jpg"
      />
    </>
  );
};

export default Posters;
