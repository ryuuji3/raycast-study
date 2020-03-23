import { Point } from "./Point";

export class Segment {
  constructor(public a: Point, public b: Point) {}

  get i() {
    return this.b.x - this.a.x;
  }

  get j() {
    return this.b.y - this.a.y;
  }

  get theta() {
    return Math.atan(this.j / this.i);
  }

  public toString() {
    return `a: ${this.a}, b: ${this.b}`;
  }
}
