export type coordinates = [number, number, number];

export class Sphere{
  private meridians: number;
  private parallels: number;
  private radius: number;
  private latitude: number;
  private longitude: number;
  private centerGeometric: coordinates;
  private points: Array<coordinates>;

  constructor(centerGeometric: coordinates = [0, 0, 0],  radius: number = 4, meridians: number = 8, parallels: number = 7) {
    this.setMeridians = meridians;
    this.setParallels = parallels;
    this.setRadius = radius;

    this.latitude = (360/this.getMeridians);
    this.longitude = (180/this.getParallels);

    this.setCenterGeometric = centerGeometric;
    
    let total = 100;

    for(let i = 0; i < total; i++){
      let lon = map(i, 0, total, -PI, PI);
      for(let j = 0; j < total; j++){
        let lat = map(j, 0, total, -HALF_PI, HALF_PI);
        this.points.push([
          (this.radius * sin(lon) * cos(lat)),
          (this.radius * sin(lon) * sin(lat)),
          (this.radius * cos(lon))
        ])
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
}