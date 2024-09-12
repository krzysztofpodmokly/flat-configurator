uniform vec3 uDiningRoom;

void main() {
  gl_FragColor = vec4(vec3(uDiningRoom), 1.0);

  #include <colorspace_fragment>
}