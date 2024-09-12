uniform vec3 uStoreRoom;

void main() {
  gl_FragColor = vec4(vec3(uStoreRoom), 1.0);

  #include <colorspace_fragment>
}