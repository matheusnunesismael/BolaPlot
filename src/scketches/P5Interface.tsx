import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import { Sphere } from "./models/sphere";

const P5Interface: React.FC = () => {
  const windowResized = (p5: p5Types) => {
    const element = document.getElementById("canvasP5Main");
    p5.resizeCanvas(
      element?.clientWidth || window.innerWidth,
      element?.clientHeight || window.innerHeight
    );
  };

  const setup = (p5: p5Types) => {
    const element = document.getElementById("canvasP5Main");
    p5.createCanvas(
      element?.clientWidth || window.innerWidth,
      element?.clientHeight || window.innerHeight,
      p5.WEBGL
    ).parent("canvasP5Main");
    p5.frameRate(60);
    p5.debugMode();
  };

  const draw = (p5: p5Types) => {
    p5.background(0);

    const sphere = new Sphere([0, 0, 0], 200, 8, 7, p5);
    console.log(sphere.getPoints);
    p5.push();
    p5.stroke(p5.color(255, 255, 255));
    sphere.getPoints.forEach((point) => {
      p5.point(point[0], point[1], point[2]);
    });

    //p5.ellipse(50, 50, 70, 70);
  };
  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default P5Interface;
