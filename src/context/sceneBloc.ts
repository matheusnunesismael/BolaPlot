import { Sphere, SphereType } from "../models/sphere";
import { Bloc } from "../utils/BloC";
import { SceneState, initialSceneState } from "./sceneState";

export class SceneBloc extends Bloc<SceneState> {
  constructor() {
    super(initialSceneState);
  }

  mapToDoneScene(sceneObjects: SphereType[], selectedSphere: SphereType) {
    this.changeState({
      kind: "DoneScene",
      sceneObjects: sceneObjects,
      selectedSphere: selectedSphere,
    });
  }

  mapToLoadingScene() {
    this.changeState({
      kind: "LoadingScene",
      sceneObjects: this.state.sceneObjects,
      selectedSphere: this.state.selectedSphere,
    });
  }

  setSceneObjects(scene: SphereType[]) {
    this.mapToDoneScene(scene, this.state.selectedSphere);
  }

  clearInterface() {
    this.mapToDoneScene([], undefined);
  }

  selectSphereById(id: string | null) {
    const selectedSphere = this.state.sceneObjects?.find(
      (sphere: SphereType) => sphere.id === id
    );

    if (selectedSphere) {
      throw new Error(`Not possible to select an sphere with id: ${id}.`);
    }

    this.mapToDoneScene(this.state.sceneObjects, selectedSphere);
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

  translateSelectedObject(
    dx: number,
    dy: number,
    dz: number,
    sphereId: string
  ) {
    try {
      this.selectSphereById(sphereId);
    } catch {
      throw new Error(
        `It's not possible to rotate sphere with id: ${sphereId}. Probably it's because it possible don't exist.`
      );
    }

    this.state.selectedSphere.translate(dx, dy, dz);
  }

  scaleSelectedObject(sx: number, sy: number, sz: number, sphereId: string) {
    try {
      this.selectSphereById(sphereId);
    } catch {
      throw new Error(
        `It's not possible to rotate sphere with id: ${sphereId}. Probably it's because it possible don't exist.`
      );
    }

    this.state.selectedSphere.scale(sx, sy, sz);
  }
}
