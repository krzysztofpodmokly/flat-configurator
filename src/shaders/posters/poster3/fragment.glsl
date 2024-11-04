varying vec2 vUv;

uniform vec2 uResolution;
uniform float uTime;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  // Normalize UV to maintain circular proportions
  vec2 uv = (vUv - vec2(0.4, 0.5)) * 2.0;
  uv *= min(uResolution.x, uResolution.y) / uResolution;  // Adjust both x and y
    // Define colors
  vec3 color1 = vec3(0.667, 0.500, 0.500);
  vec3 color2 = vec3(0.500, 0.667, 0.500);
  vec3 color3 = vec3(0.667, 0.666, 0.500);
  vec3 color4 = vec3(0.200, 0.000, 0.500);

  vec2 uv0 = uv;
  vec3 finalColor = vec3(0.0);

  for (float i = 0.0; i < 4.0; i++) {
    uv = fract(uv * 1.5) - 0.5;

    float d = length(uv) * exp(-length(uv0));  // Distance calculation for circular shape
    vec3 col = palette(length(uv0) + i*.4 + uTime * .4, color1, color2, color3, color4);

    // Sinusoidal distance modulation
    d = sin(d * 8.0 + uTime) / 8.0;
    d = abs(d);

    // Neon effect
    d = pow(0.01 / d, 1.2);

    finalColor += col * d;
  }


  gl_FragColor = vec4(finalColor, 1.0);
}
