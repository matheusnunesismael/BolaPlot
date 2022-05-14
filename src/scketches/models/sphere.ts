import p5Types from "p5";
export type coordinates = [number, number, number];

export class Sphere {
  private meridians: number;
  private parallels: number;
  private radius: number;
  private latitude: number;
  private longitude: number;
  private centerGeometric: coordinates;
  private points: Array<coordinates>;
  private p5: p5Types;

  constructor(
    centerGeometric: coordinates = [0, 0, 0],
    radius: number = 4,
    meridians: number = 8,
    parallels: number = 7,
    p5: p5Types
  ) {
    this.meridians = meridians;
    this.parallels = parallels;
    this.radius = radius;
    this.p5 = p5;
    this.points = [];
    this.centerGeometric = centerGeometric;

    this.latitude = 360 / this.getMeridians;
    this.longitude = 180 / this.getParallels;

    this.setCenterGeometric = centerGeometric;

    let total = 100;

    for (let i = 0; i < total; i++) {
      let lon = this.p5.map(i, 0, total, -this.p5.PI, this.p5.PI);
      for (let j = 0; j < total; j++) {
        let lat = this.p5.map(j, 0, total, -this.p5.HALF_PI, this.p5.HALF_PI);
        this.points.push([
          this.radius * this.p5.sin(lon) * this.p5.cos(lat),
          this.radius * this.p5.sin(lon) * this.p5.sin(lat),
          this.radius * this.p5.cos(lon),
        ]);
      }
    }
  }

  public get getMeridians(): number {
    return this.meridians;
  }

  public get getParallels(): number {
    return this.parallels;
  }

  public get getRadius(): number {
    return this.radius;
  }

  public get getLatitude(): number {
    return this.latitude;
  }

  public get getLongitude(): number {
    return this.longitude;
  }

  public get getCenterGeometric(): coordinates {
    return this.centerGeometric;
  }

  public set setMeridians(meridians: number) {
    this.meridians = meridians;
  }

  public set setParallels(parallels: number) {
    this.parallels = parallels;
  }

  public set setRadius(radius: number) {
    this.radius = radius;
  }

  public set setLatitude(latitude: number) {
    this.latitude = latitude;
  }

  public set setLongitude(longitude: number) {
    this.longitude = longitude;
  }

  public set setCenterGeometric(centerGeometric: coordinates) {
    this.centerGeometric = centerGeometric;
  }

  public get getPoints(): Array<coordinates> {
    return this.points;
  }
}
