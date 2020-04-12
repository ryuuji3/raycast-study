import { IPoint, Polygon } from "@/models/Polygon";

export default class Rectangle extends Polygon {
  constructor(_points: IPoint[]) {
    super(_points, true); // Don't need to sort
  }

  // TODO: More efficient implementations of has(), etc.
}
