uniform vec3 uCorridor;

void main() {
  gl_FragColor = vec4(vec3(uCorridor), 1.0);
}