import * as THREE from "three";

export interface IEmission {
  nodes: Record<string, THREE.Object3D>;
  params?: Record<string, string>;
}
