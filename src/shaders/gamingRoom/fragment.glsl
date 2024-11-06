varying vec2 vUv;

uniform vec3 uGamingRoom;

void main() {
  float strength = smoothstep(0.0, 0.6, vUv.x);

  vec3 finalColor = mix(uGamingRoom * 0.8, uGamingRoom, strength);  

  gl_FragColor = vec4(finalColor, 1.0);

  #include <colorspace_fragment>
}