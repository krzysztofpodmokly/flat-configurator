varying vec2 vUv;

uniform sampler2D uTexture;
uniform float uTime;
uniform float uDelay;

void main() {
  vec2 uv = vUv;
  // uv.x = 1.0 - uv.x;
  uv.y = 1.0 - uv.y; 


  uv.y += sin(uTime * 0.7) * uDelay;
  uv.x += cos(uTime  * 0.9) * uDelay;

  vec4 color = texture2D(uTexture, uv);
  gl_FragColor = vec4(color);
}