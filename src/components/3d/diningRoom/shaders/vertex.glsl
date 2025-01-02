uniform float uTime;
varying vec2 vUv;

void main() {
  vec3 updatedPosition = vec3(position.x, position.y, position.z);
  
  vec4 modelPosition = modelMatrix * vec4(updatedPosition, 1.0);
  gl_Position = projectionMatrix * viewMatrix * modelPosition;

  vUv = uv; 
}
