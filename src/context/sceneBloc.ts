import { Sphere, SphereType } from "../models/sphere";
import { Bloc } from "../utils/BloC";
import { SceneState, initialSceneState } from "./sceneState";

export class SceneBloc extends Bloc<SceneState> {
  constructor() {
    super(initialSceneState);
  }

  setSceneObjects(scene: SphereType[]) {
    this.changeState({
      kind: "DoneScene",
      sceneObjects: scene,
      selectedSphere: this.state.selectedSphere,
    });
  }

  clearInterface() {
    this.changeState({
      kind: "DoneScene",
      sceneObjects: [],
      selectedSphere: undefined,
    });
  }

  selectSphereById(id: string | null) {
    const selectedSphere = this.state.sceneObjects?.find(
      (sphere: SphereType) => sphere.id === id
    );

    if (selectedSphere) {
      throw new Error(`Not possible to select an sphere with id: ${id}.`);
    }

    this.changeState({
      kind: "DoneScene",
      sceneObjects: this.state.sceneObjects,
      selectedSphere: selectedSphere,
    });
  }

  rotateSelectedObject(axis: "x" | "y" | "z", angle: number, sphereId: string) {
    try {
      this.selectSphereById(sphereId);
    } catch {
      throw new Error(
        `It's not possible to rotate sphere with id: ${sphereId}. Probably it's because it possible don't exist.`
      );
    }

    this.state.selectedSphere.rotate(angle, axis);
  }

  translateSelectedObject(dx: number, dy: number, dz: number) {
    throw new Error("Method don't implemented");
  }

  scaleSelectedObject(sx: number, sy: number, sz: number) {
    throw new Error("Method don't implemented");
  }
}
