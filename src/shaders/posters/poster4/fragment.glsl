varying vec2 vUv;

uniform sampler2D uTexture;
uniform float uTime;

void main() {
  vec2 uv = vUv;
  uv = 1.0 - uv;
  // uv = uv - vec2(0.5, 0.5);
  uv.x += sin(uv.x * 10. + uTime) * 0.05;
  uv.y += sin(uv.x * 10. + uTime) * 0.05;

  vec4 color = texture2D(uTexture, uv);
  gl_FragColor = vec4(color);
}