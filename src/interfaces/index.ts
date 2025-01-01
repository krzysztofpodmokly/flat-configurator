import * as THREE from "three";

export type TUniform =
  | "uDiningRoom"
  | "uCorridor"
  | "uBathRoom"
  | "uStoreRoom"
  | "uGamingRoom"
  | "uBedRoom";

export interface IEmission {
  nodes: Record<string, THREE.Object3D>;
  params?: Record<string, string>;
}

export interface IModelProps {
  positionY: number;
}
