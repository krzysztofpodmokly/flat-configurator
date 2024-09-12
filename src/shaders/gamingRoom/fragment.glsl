uniform vec3 uGamingRoom;

void main() {
  gl_FragColor = vec4(vec3(uGamingRoom), 1.0);

  #include <colorspace_fragment>
}