import Sketch from "react-p5";
import p5Types from "p5";

import { Sphere, SphereType } from "../models/sphere";
import { useSceneBloc } from "../context/Scene";

export const SketchComponent = () => {
  const scene = useSceneBloc();

  const windowResized = (p5: p5Types) => {
    const element = document.getElementById("mainCanvas");
    p5.resizeCanvas(
      element?.clientWidth || window.innerWidth,
      element?.clientHeight || window.innerHeight
    );
  };

  const setup = (p5: p5Types) => {
    const element = document.getElementById("mainCanvas");

    // p5.createCanvas(
    //   element?.clientWidth ? element?.clientWidth : window.innerWidth,
    //   element?.clientHeight ? element?.clientHeight : window.innerHeight,
    //   p5.WEBGL
    // ).parent("mainCanvas");
    p5.createCanvas(600, 600, p5.WEBGL).parent("mainCanvas");
    // p5.noLoop()

    p5.frameRate(60);
    p5.debugMode();
    p5.camera(+150, -150, p5.height / 2 / p5.tan(p5.PI / 6), 0, 0, 0, 0, 1, 0);
  };

  const draw = (p5: p5Types) => {
    console.log("chamei o draw");
    p5.background("black");
    p5.orbitControl();

    const sceneObjects = scene.state.sceneObjects;

    const selectedSphereId = scene.state.selectedSphere?.id;

    const sphere = new Sphere(
      [0, 0, 0],
      100,
      8,
      7,
      "#FF0",
      (Math.random() + 1).toString(36).substring(7),
      "teste"
    );

    scene.mapToDoneScene([sphere], sphere);

    console.log("here");
    console.log(sphere);

    p5.strokeWeight(0.5);
    sceneObjects?.forEach((sphere: SphereType) => {
      sphere.drawEdges(p5);
    });

    // mySphere.drawEdges(p5);
    // mySphere.rotate(0.9, "z");

    if (selectedSphereId) {
      const selectedSphere = sceneObjects?.find(
        (sphere: SphereType) => sphere.id === selectedSphereId
      );
      selectedSphere?.drawVertices(p5);
    }

    //define debug color
    p5.stroke(255, 0, 150);
    p5.strokeWeight(0.5);
  };

  return <Sketch setup={setup} windowResized={windowResized} draw={draw} />;
};
