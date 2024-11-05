varying vec2 vUv;

uniform sampler2D uTexture;
uniform float uTime;

void main() {
  vec2 uv = vUv;
  uv = 1.0 - uv;
  // uv = uv - vec2(0.5, 0.5);
  uv.x *= 0.9;
  uv.y *= 0.9; 
  uv.y += sin(uTime * 0.7) * 0.05;
  uv.x += cos(uTime  * 0.9) * 0.02;

  vec4 color = texture2D(uTexture, uv);
  gl_FragColor = vec4(color);
}