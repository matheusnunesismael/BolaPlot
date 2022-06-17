import nj from "numjs";

import { degreesToRadians } from "./math";

export class BasicTransformations {
  public static rotate(
    angle: number,
    points: number[][],
    axis: string
  ): number[][] | undefined {
    if (axis !== "x" && axis !== "y" && axis === "z") {
      throw new Error(
        "Unknown axis. The axis can only take the value x, y or z."
      );
    }

    const angleInRadians = degreesToRadians(angle);

    if (axis === "z") {
      const zRotation = nj.array([
        [Math.cos(angleInRadians), -Math.sin(angleInRadians), 0],
        [Math.sin(angleInRadians), Math.cos(angleInRadians), 0],
        [0, 0, 1],
      ]);

      return nj.dot(zRotation, nj.array<any>(points)).tolist();
    } else if (axis === "y") {
      const yRotation = nj.array([
        [Math.cos(angleInRadians), 0, Math.sin(angleInRadians)],
        [0, 1, 0],
        [-Math.sin(angleInRadians), 0, Math.cos(angleInRadians)],
      ]);

      return nj.dot(yRotation, nj.array<any>(points)).tolist();
    } else if (axis === "x") {
      const xRotation = nj.array([
        [1, 0, 0],
        [0, Math.cos(angleInRadians), -Math.sin(angleInRadians)],
        [0, Math.sin(angleInRadians), Math.cos(angleInRadians)],
      ]);

      return nj.dot(xRotation, nj.array<any>(points)).tolist();
    }
  }
}
