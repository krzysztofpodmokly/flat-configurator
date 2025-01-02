uniform vec3 uWall;

void main() {
  gl_FragColor = vec4(vec3(uWall), 1.0);

  #include <colorspace_fragment>
}