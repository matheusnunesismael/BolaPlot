import { SphereType } from "../models/sphere";

export interface CommonSceneState {
  sceneObjects: SphereType[];
  selectedSphere: SphereType;
}

export interface LoadingSceneState {
  kind: "LoadingScene";
}

export interface DoneSceneState {
  kind: "DoneScene";
}

export type SceneState = (LoadingSceneState | DoneSceneState) &
  CommonSceneState;

export const initialSceneState: SceneState = {
  kind: "LoadingScene",
  sceneObjects: [],
  selectedSphere: undefined,
};
