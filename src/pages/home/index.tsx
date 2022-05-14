import React from "react";
import P5Interface from "scketches/P5Interface";

import { HomeContainer, Scene } from "./styles";

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <Scene id="canvasP5Main">
        <P5Interface />
      </Scene>
    </HomeContainer>
  );
};

export default Home;
