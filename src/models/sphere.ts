import nj from "numjs";
import p5Types from "p5";
import { Geometric } from "../utils";

export type coordinates = number[][][];

export type SphereType = {
  meridians: number;
  parallels: number;
  radius: number;
  latitude: number;
  longitude: number;
  geometricCenter: number[];
  color: string;
  readonly id: string;
  name: string;

  updateData: (data: UpdateSphereType) => void;
  drawVertices: (p5: p5Types) => void;
  drawEdges: (p5: p5Types) => void;
  translate: (dx: number, dy: number, dz: number) => void;
  scale: (sx: number, sy: number, sz: number) => void;
  rotate: (angle: number, axis: string) => void;
};

type UpdateSphereType = {
  meridians?: number;
  parallels?: number;
  radius?: number;
  name?: string;
  color?: string;
};

const moveCenter = (
  _: SphereType,
  __: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: number[]) {
    const self = this as SphereType;
    const referenceCenter = self.geometricCenter; //move center to prevent displacement
    self.translate(
      -referenceCenter[0],
      -referenceCenter[1],
      -referenceCenter[2]
    );
    originalMethod.apply(this, args);
    self.translate(referenceCenter[0], referenceCenter[1], referenceCenter[2]);
  };
};

export class Sphere {
  public id: string;
  public name: string;
  public meridians: number;
  public parallels: number;
  public radius: number;
  public latitude: number;
  public longitude: number;
  public geometricCenter: number[];
  private points: coordinates;
  public color: string;
  private meridiansBegin: Array<number>;
  private meridiansEnd: Array<number>;

  constructor(
    geometricCenter: number[] = [0, 0, 0],
    radius: number = 4,
    meridians: number = 8,
    parallels: number = 7,
    color: string,
    id: string,
    name: string
  ) {
    this.meridians = meridians;
    this.parallels = parallels;
    this.radius = radius;
    this.geometricCenter = geometricCenter;
    this.color = color;
    this.id = id;
    this.name = name;

    this.meridiansBegin = nj
      .add(nj.array(this.geometricCenter), nj.array([0.0, -radius, 0.0]))
      .tolist();

    this.meridiansEnd = nj
      .add(nj.array(this.geometricCenter), nj.array([0.0, radius, 0.0]))
      .tolist();

    this.points = nj
      .zeros(this.meridians * this.parallels * 3)
      .reshape(this.parallels, this.meridians, 3)
      .tolist();

    console.log(this.points);

    this.geometricCenter = geometricCenter;

    this.defineVertices();
  }

  private defineVertices() {
    const angleMeridians = 360 / this.meridians;
    const angleParallels = 180 / (this.parallels + 1);

    for (let i = 0; i < this.parallels; i++) {
      this.points[i][0] = Geometric.rotate(
        -(angleParallels * (i + 1)),
        [[0, this.radius, 0]],
        "z"
      )[0];

      for (let j = 1; j < this.meridians; j++) {
        this.points[i][j] = nj
          .add(
            nj.array(
              Geometric.rotate(
                -(angleMeridians * j),
                [
                  [
                    this.points[i][0][0],
                    this.points[i][0][1],
                    this.points[i][0][2],
                  ],
                ],
                "y"
              )[0]
            ),
            nj.array(this.geometricCenter)
          )
          .tolist();
      }
      // add center after because the original point is used to define the parallels
      this.points[i][0] = nj
        .add(nj.array(this.points[i][0]), nj.array(this.geometricCenter))
        .tolist();
    }
  }

  public drawVertices(p5: p5Types) {
    const flattenVertices = this.points.flat();

    p5.push();
    p5.stroke("yellow");
    p5.strokeWeight(5);

    p5.point(this.meridiansEnd[0], this.meridiansEnd[1], this.meridiansEnd[2]);
    flattenVertices.forEach((vertex: number[]) => {
      p5.point(vertex[0], vertex[1], vertex[2]);
    });
    p5.point(
      this.meridiansBegin[0],
      this.meridiansBegin[1],
      this.meridiansBegin[2]
    );
    p5.pop();
  }

  public drawEdges(p5: p5Types) {
    const extremes = [this.meridiansEnd, this.meridiansBegin];
    for (let i = 0; i < 2; i++) {
      const currentParallel = this.points[i * (this.parallels - 1)];

      p5.push();
      p5.stroke(this.color);
      currentParallel.forEach((currrentPoint: number[]) => {
        p5.line(
          currrentPoint[0],
          currrentPoint[1],
          currrentPoint[2],
          extremes[i][0],
          extremes[i][1],
          extremes[i][2]
        );
      });
    }
    this.points.forEach((line: any, i: number) => {
      line.forEach((point: [number, number, number], j: number) => {
        const nextParallelPoint: any = this.points[i][(j + 1) % this.meridians];
        const nextMeridianPoint: any =
          i === this.meridians - 1 ? this.points[i][j] : this.points[i + 1][j];

        p5.line(
          ...point,
          nextParallelPoint[0],
          nextParallelPoint[1],
          nextParallelPoint[2]
        );
        p5.line(
          nextMeridianPoint[0],
          nextMeridianPoint[1],
          nextMeridianPoint[2],
          ...point
        );
      });
    });
    p5.pop();
  }

  public translate(dx: number, dy: number, dz: number) {
    const [newCenter, newMeridiansBegin, newMeridiansEnd] = Geometric.translate(
      [this.geometricCenter, this.meridiansBegin, this.meridiansEnd],
      dx,
      dy,
      dz
    );
    this.geometricCenter = newCenter;
    this.meridiansBegin = newMeridiansBegin;
    this.meridiansEnd = newMeridiansEnd;

    const flatVertices = Geometric.translate(this.points.flat(), dx, dy, dz);
    this.points = nj
      .array(flatVertices)
      .reshape(this.parallels, this.meridians, 3)
      .tolist();
  }

  @moveCenter
  public scale(sx: number, sy: number, sz: number) {
    const [newCenter, newMeridiansBegin, newMeridiansEnd] = Geometric.scale(
      [this.geometricCenter, this.meridiansBegin, this.meridiansEnd],
      sx,
      sy,
      sz
    );

    this.geometricCenter = newCenter;
    this.meridiansBegin = newMeridiansBegin;
    this.meridiansEnd = newMeridiansEnd;

    const flatVertices = Geometric.scale(this.points.flat(), sx, sy, sz);
    this.points = nj
      .array(flatVertices)
      .reshape(this.parallels, this.meridians, 3)
      .tolist();
  }

  @moveCenter
  public rotate(angle: number, axis: string) {
    const [newCenter, newMeridiansBegin, newMeridiansEnd] = Geometric.rotate(
      angle,
      [this.geometricCenter, this.meridiansBegin, this.meridiansEnd],
      axis
    );

    this.geometricCenter = newCenter;
    this.meridiansBegin = newMeridiansBegin;
    this.meridiansEnd = newMeridiansEnd;

    const flatVertices = Geometric.rotate(angle, this.points.flat(), axis);
    this.points = nj
      .array(flatVertices)
      .reshape(this.parallels, this.meridians, 3)
      .tolist();
  }

  public updateData({
    radius,
    parallels,
    meridians,
    name,
    color,
  }: UpdateSphereType) {
    this.radius = radius || this.radius;
    this.parallels = parallels || this.parallels;
    this.meridians = meridians || this.meridians;
    this.name = name || this.name;
    this.color = color || this.color;

    this.meridiansBegin = [
      this.geometricCenter[0],
      this.geometricCenter[1] - this.radius,
      this.geometricCenter[2],
    ];

    this.meridiansEnd = [
      this.geometricCenter[0],
      this.geometricCenter[1] + this.radius,
      this.geometricCenter[2],
    ];

    this.points = nj
      .zeros(this.meridians * this.parallels * 3)
      .reshape(this.parallels, this.meridians, 3)
      .tolist();

    this.defineVertices();
  }
}
