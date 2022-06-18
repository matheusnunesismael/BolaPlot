import { useSceneBloc } from "./context/Scene";
import { SceneState } from "./context/sceneState";
import { SketchComponent } from "./sketches/sketch";
import { BlocBuilder } from "./utils/BloC";
import { Layout } from "antd";
const { Content } = Layout;

export function App() {
  const states = {
    DoneScene: (
      <Content id="mainCanvas">
        <SketchComponent />
      </Content>
    ),
    LoadingScene: (
      <>
        <h1>Carregando</h1>
      </>
    ),
  };

  // const {  } = useSceneBloc();

  return (
    <BlocBuilder
      bloc={useSceneBloc()}
      builder={(state: SceneState) => states[state.kind]}
    />
  );
}
