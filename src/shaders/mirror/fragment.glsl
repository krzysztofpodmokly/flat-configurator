uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;

varying vec2 vUv;

#include ../includes/perlinNoise.glsl

void main() {
  // vec3 uColorStart = vec3(.903, 0.840, 0.813);
  // vec3 uColorEnd = vec3(0.0, 0.48, 0.73);

  vec2 displacedUv = vUv + cnoise(vec3(vUv * 5.0, uTime * 0.1));

  float strength = cnoise(vec3(displacedUv * 5., uTime * 0.2));

  float outerFlow = distance(vUv, vec2(0.5)) * 5.0 - 1.4;
  strength += outerFlow;


  // strength += step(0.3, strength) * 0.8;

  // Clamp value
  // strength = clamp(strength, 0.0, 1.0);

  vec3 color = mix(uColorA, uColorB, strength);

  gl_FragColor = vec4(color, 1.0);

  #include <colorspace_fragment>
}