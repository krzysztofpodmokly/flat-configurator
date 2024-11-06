varying vec2 vUv;

uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;

#include ../includes/perlinNoise.glsl

void main() {
  vec2 displacedUv = vUv + cnoise(vec3(vUv * 3.0, uTime * 0.1));

  float strength = cnoise(vec3(displacedUv * 3.0, uTime * 0.3));

  vec3 finalColor = mix(uColorA, uColorB, strength);

  gl_FragColor = vec4(finalColor, 1.0);

  #include <colorspace_fragment>
}