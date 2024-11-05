varying vec2 vUv;

uniform vec3 uStoreRoom;

void main() {
  float strength = smoothstep(0.0, 0.05, vUv.x);

  vec3 finalColor = mix(uStoreRoom * 0.8, uStoreRoom, strength);  

  gl_FragColor = vec4(finalColor, 1.0);

  #include <colorspace_fragment>
}