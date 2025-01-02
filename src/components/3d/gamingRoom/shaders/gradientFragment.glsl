varying vec2 vUv;

uniform vec3 uWall;

void main() {
  float strength = smoothstep(0.0, 1.5, vUv.x);
    vec3 gradientColor = vec3(30.0 / 255.0, 24.0 / 255.0, 216.0 / 255.0);

  vec3 finalColor = mix(uWall * 0.8, gradientColor, strength);  

  gl_FragColor = vec4(finalColor, 1.0);

  #include <colorspace_fragment>
}