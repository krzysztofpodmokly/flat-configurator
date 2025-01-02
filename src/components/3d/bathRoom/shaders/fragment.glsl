varying vec2 vUv;

uniform vec3 uWall;

void main() {
  float strength = smoothstep(0.0, 2., vUv.y);

  vec3 finalColor = mix(uWall * 0.8, uWall, strength);  

  gl_FragColor = vec4(finalColor, 1.0);

  #include <colorspace_fragment>
}