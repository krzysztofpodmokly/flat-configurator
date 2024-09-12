uniform vec3 uBathRoom;

void main() {
  gl_FragColor = vec4(vec3(uBathRoom), 1.0);

  #include <colorspace_fragment>
}