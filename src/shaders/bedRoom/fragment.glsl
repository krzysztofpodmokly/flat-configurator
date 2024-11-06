varying vec2 vUv;

uniform vec3 uBedRoom;

void main() {
  float strength = smoothstep(0.0, 0.05, vUv.y);

  vec3 finalColor = mix(uBedRoom * 0.8, uBedRoom, strength);  

  gl_FragColor = vec4(finalColor, 1.0);

  #include <colorspace_fragment>
}