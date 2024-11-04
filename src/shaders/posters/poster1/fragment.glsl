varying vec2 vUv;

uniform vec2 uResolution;
uniform float uTime;

void main() {
  vec2 scaledUv = vUv * uResolution / max(uResolution.x, uResolution.y);

  scaledUv = scaledUv - 0.5;
  scaledUv = scaledUv * 2.0;
  scaledUv.x *= uResolution.x / uResolution.y;

  float d = length(scaledUv);
  d = sin(d * 8. + uTime) / 8.;
  d = abs(d);

  d = 0.02 / d; // neon color

  vec3 col = vec3(1.0, 2.0, 3.0);
  col *= d;

  gl_FragColor = vec4(col, 1.0);
}