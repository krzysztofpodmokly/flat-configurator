varying vec2 vUv;

uniform vec3 uStoreRoom;
uniform bool uGradientLeft;
uniform bool uGradientRight;
uniform bool uGradientBottom;

void main() {
  float top = vUv.y  * 1.;
  float bottom = (1. - vUv.y) * 1.;
  float left = vUv.x * 10.;
  float right = (1. - vUv.x) * 1.;

 float strength = top;

  if (uGradientLeft) {
    strength = left;
  } else if (uGradientRight) {
    strength = right;
  } else if (uGradientBottom) {
    strength = bottom;
  }

  vec3 finalColor = uStoreRoom * strength;  

  gl_FragColor = vec4(finalColor, 1.0);


  #include <colorspace_fragment>
}