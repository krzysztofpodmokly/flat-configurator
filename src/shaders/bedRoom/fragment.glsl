uniform vec3 uBedRoom;

void main() {
  gl_FragColor = vec4(vec3(uBedRoom), 1.0);

  #include <colorspace_fragment>
}