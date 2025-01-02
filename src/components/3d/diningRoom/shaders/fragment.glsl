uniform float uTime;
varying vec2 vUv;
uniform vec3 uColors[5];
uniform float uTimeFactor;

#include "../../../../shaders/includes/perlinNoise.glsl"

void main() {

  vec3 color = uColors[1];
  vec2 noiseCoord = vUv * vec2(5., 6.);

  for (int i = 0; i < 5; i++) {
    float noiseFlow = 5. + float(i) * 0.3 * uTimeFactor;
    float noiseSpeed = 10. + float(i) * 0.3 * uTimeFactor;

    float noiseSeed = 1. + float(i) * 10. * uTimeFactor;
    vec2 noiseFrequency = vec2(0.1, 0.2); 
    float noiseFloor = 0.1;
    float noiseCeil = 0.6 + float(i) * 0.07 * uTimeFactor;

    float noise = smoothstep(
      noiseFloor,
      noiseCeil,
      cnoise(
        vec3(
          noiseCoord.x * noiseFrequency.x + uTime * uTimeFactor * noiseFlow,
          noiseCoord.y * noiseFrequency.y,
          uTime * uTimeFactor * noiseSpeed + noiseSeed
        )
      )
    );

    color = mix(color, uColors[i], noise);
  }

  gl_FragColor = vec4(color, 1.0);
}
