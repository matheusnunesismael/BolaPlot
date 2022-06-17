import { ReactNode } from "react";
import { createContext } from "utils/BloC/context";
import { SceneBloc } from "./sceneBloc";

const createSceneContext = () => {
  return new SceneBloc();
};

export const [sceneBloc, useSceneBloc] = createContext<SceneBloc>();

export const SceneProvider = ({ children }: { children: ReactNode }) => {
  return (
    <sceneBloc.Provider value={createSceneContext()}>
      {children}
    </sceneBloc.Provider>
  );
};

/**
  Para usar o SceneProvider é preciso na tela utilizar o seguinte comando

  // dica é utilizar componentes dentro de cada return passando como props o bloc(sceneBloc)

  // Sempre que quiser um novo estado ou informação dentro de um estado é só ir no sceneState e adicionar

  // Caso queira um método é só ir dentro do sceneBloc e adicionar lá

  <BlocBuilder
    bloc={sceneBloc}
    builder={(state: SceneState) => {
      switch(state.kind) {
        case 'DoneScene': {
          return (
            <h1>Aqui dentro vai a tela</h1>
          )
        },
        case 'LoadingScene': {
          return (
            <h1>Aqui dentro vai a tela de carregamento</h1>
          )
        }
      }
    }}
  />
 */
