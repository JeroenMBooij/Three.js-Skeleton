import { MeshStandardMaterial } from "three";
import * as THREE from 'three'


let SphereMaterial = new MeshStandardMaterial();
SphereMaterial.metalness = 0.7;
SphereMaterial.roughness = 0.2;

SphereMaterial.color = new THREE.Color(0x292929);

export { SphereMaterial }