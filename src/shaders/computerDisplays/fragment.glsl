varying vec2 vUv;

uniform vec3 uComputerDisplay;
uniform sampler2D uTexture;
uniform float uTime;
uniform bool uHorizontal;

void main() {
  vec2 uv = vUv;
  uv = vec2(1.0 - vUv.y, vUv.x);

  if (uHorizontal) {
    uv.x += uTime * 0.25;
    // uv.x = 1.0 - uv.y;
  } else {
    // rotate uvs by 90deg
    uv = vec2(vUv.y, 1.0 - vUv.x);
    uv.y -= uTime * 0.25;
  }

  vec4 texture = texture2D(uTexture, uv);

  gl_FragColor = vec4(texture);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}