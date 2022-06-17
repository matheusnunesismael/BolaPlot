import { SphereType } from "../models/sphere";

export interface CommonSceneState {
  sceneObjects: SphereType[];
  selectedSphere: SphereType | undefined;
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
  kind: "DoneScene",
  sceneObjects: [],
  selectedSphere: undefined,
};
