import React from "react";
import { SketchComponent } from "./sketches/sketch";
import { useSceneBloc } from "./context/Scene";
import { SceneState } from "./context/sceneState";
import { BlocBuilder } from "./utils/BloC";
function App() {
  const sceneBloc = useSceneBloc();

  const states = {
    DoneScene: (
      <div id="mainCanvas">
        <SketchComponent />
      </div>
    ),
    LoadingScene: <h1>Aqui dentro vai a tela de carregamento</h1>,
  };

  return (
    <BlocBuilder
      bloc={sceneBloc}
      builder={(state: SceneState) => states[state.kind]}
    />
  );
}

export default App;
