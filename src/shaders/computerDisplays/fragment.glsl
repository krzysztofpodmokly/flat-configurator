varying vec2 vUv;

uniform vec3 uComputerDisplay;
uniform sampler2D uTexture;
uniform float uTime;

void main() {
  
  // rotate uvs by 90deg
  vec2 uv = vec2(vUv.y, 1.0 - vUv.x);
  uv.y -= uTime * 0.25;


  vec4 texture = texture2D(uTexture, uv);

  gl_FragColor = vec4(texture);

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}