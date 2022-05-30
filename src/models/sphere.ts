import nj from "numjs";
import p5Types from "p5";

export type coordinates = [number, number, number];

export type SphereType = {
  meridians: number;
  parallels: number;
  radius: number;
  latitude: number;
  longitude: number;
  centerGeometric: coordinates;
  color: string;
  id: string;

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

export class Sphere {
  public id: string;
  public meridians: number;
  public parallels: number;
  public radius: number;
  public latitude: number;
  public longitude: number;
  public centerGeometric: coordinates;
  private points: Array<coordinates>;
  public color: string;
  private meridiansBegin: Array<number>;
  private meridiansEnd: Array<number>;

  constructor(
    centerGeometric: coordinates = [0, 0, 0],
    radius: number = 4,
    meridians: number = 8,
    parallels: number = 7,
    color: string,
    id: string
  ) {
    this.meridians = meridians;
    this.parallels = parallels;
    this.radius = radius;
    this.centerGeometric = centerGeometric;
    this.color = color;
    this.id = id;

    this.meridiansBegin = nj
      .add(nj.array(this.centerGeometric), nj.array([0.0, -radius, 0.0]))
      .tolist();

    this.meridiansEnd = nj
      .add(nj.array(this.centerGeometric), nj.array([0.0, radius, 0.0]))
      .tolist();

    this.points = nj
      .zeros(this.meridians * this.parallels * 3)
      .reshape(this.parallels, this.meridians, 3)
      .tolist();

    console.log(
      nj
        .zeros(this.meridians * this.parallels * 3)
        .reshape(this.parallels, this.meridians, 3)
        .tolist()
    );
  }
}
