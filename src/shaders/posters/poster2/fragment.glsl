varying vec2 vUv;

uniform vec2 uResolution;
uniform float uTime;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  // Normalize UV to maintain circular proportions
  vec2 uv = (vUv - vec2(0.5, 0.6)) * 2.0;
  uv *= min(uResolution.x, uResolution.y) / uResolution;  // Adjust both x and y

  // Define colors
  vec3 color1 = vec3(0.5, 0.5, 0.5);
  vec3 color2 = vec3(0.5, 0.5, 0.5);
  vec3 color3 = vec3(1.0, 1.0, 1.0);
  vec3 color4 = vec3(0.263, 0.416, 0.557);

  float d = length(uv);  // Distance calculation for circular shape
  vec3 col = palette(d + uTime * .3, color1, color2, color3, color4);

  // Sinusoidal distance modulation
  d = sin(d * 8.0 + uTime) / 8.0;
  d = abs(d);

  // Neon effect
  d = 0.02 / d;
  col *= d;

  gl_FragColor = vec4(col, 1.0);
}
