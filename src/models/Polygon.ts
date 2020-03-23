import { Point } from "./Point";
import { Segment } from "./Segment";

export class Polygon {
  public points: Point[];
  public sides: Segment[];

  constructor(points: IPoint[]) {
    const sorted = this.sort(points.map(([x, y]) => new Point(x, y)));

    this.points = sorted;
    this.sides = this.createSegments(sorted);
  }

  /**
   * @param origin
   * @param a
   * @param b
   *
   * @returns sort number
   */
  private static compareClockwise(origin: Point, a: Point, b: Point) {
    const thetaA = Math.atan2(a.y - origin.y, a.x - origin.x);
    const thetaB = Math.atan2(b.y - origin.y, b.x - origin.x);

    if (thetaA < thetaB) return -1;
    else if (thetaB < thetaA) return 1;
    else return 0;
  }

  /**
   * @param points
   */
  private findAveragePoint(points: Point[]): Point {
    const add = (accumulator: number, current: number) => accumulator + current;
    const average = (points: Point[], mapFn: (point: Point) => number) =>
      points.map(mapFn).reduce(add) / points.length;
    const x = average(points, point => point.x);
    const y = average(points, point => point.y);

    return new Point(x, y);
  }

  /**
   * @param unsorted
   *
   * @returns sorted list of points
   */
  protected sort(unsorted: Point[]) {
    const origin = this.findAveragePoint(unsorted);

    return unsorted.sort((a, b) => Polygon.compareClockwise(origin, a, b));
  }

  /**
   * From a sorted array of points, create segments.
   *
   * For example, from points A, B, and C:
   * Create 3 segments AB, BC, and CA
   *
   * @param sorted
   */
  protected createSegments(sorted: Point[]): Segment[] {
    const segments: Segment[] = [];

    sorted.forEach((a, index, array) => {
      const b = index < array.length - 1 ? array[index + 1] : array[0];

      if (a.y <= b.y) {
        segments.push(new Segment(a, b));
      } else {
        segments.push(new Segment(b, a));
      }
    });

    return segments;
  }

  /**
   * Return if the ray (starting at point) intersects segment between two points (A and B) from the left.
   *
   * Idea comes from: http://rosettacode.org/wiki/Ray-casting_algorithm#JavaScript
   *
   * @param point
   * @param ab
   * @return true if ray intersects from left
   */
  protected pointHasIntersection(point: Point, ab: Segment): boolean {
    const { a, theta: abx, b } = ab;
    const pa = new Segment(point, a);
    const { theta: pax } = pa;

    if (point.y < a.y || point.y > b.y || point.x >= Math.max(a.x, b.x)) {
      return false; // Outside bounds and can't possibly intersect
    } else if (point.x < Math.min(a.x, b.x)) {
      return true; // Gaurunteed to intersect
    } else {
      return Math.abs(pax) > Math.abs(abx); // compare angles to x-axis
    }
  }

  /**
   * If point exists inside polygon.
   *
   * @param point
   * @return true if number of intersections is odd number
   */
  has(point: Point) {
    let intersections = 0;

    this.sides.forEach(side => {
      if (this.pointHasIntersection(point, side)) {
        intersections++;
      }
    });

    return intersections % 2 !== 0;
  }

  get leftMostX() {
    return this.points.reduce((leftMost, point) => {
      if (point.x <= leftMost) {
        return point.x;
      } else {
        return leftMost;
      }
    }, this.points[0].x);
  }

  get rightMostX() {
    return this.points.reduce((rightMost, point) => {
      if (point.x >= rightMost) {
        return point.x;
      } else {
        return rightMost;
      }
    }, this.points[0].x);
  }

  get topMostY() {
    return this.points.reduce((topMost, point) => {
      if (point.y >= topMost) {
        return point.y;
      } else {
        return topMost;
      }
    }, this.points[0].y);
  }

  get bottomMostY() {
    return this.points.reduce((bottomMost, point) => {
      if (point.y <= bottomMost) {
        return point.y;
      } else {
        return bottomMost;
      }
    }, this.points[0].y);
  }

  get width() {
    return this.rightMostX - this.leftMostX;
  }

  get height() {
    return this.topMostY - this.bottomMostY;
  }

  public toSvg() {
    return this.points.reduce(
      (output, p) => output.concat(`${p.toSvg()} `),
      ""
    );
  }
}

export type IPoint = [number, number];
