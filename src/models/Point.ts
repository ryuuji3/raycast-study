export class Point implements Coordinates {
  constructor(public x: number, public y: number) {}

  toString() {
    return `(${this.x},${this.y})`;
  }

  toSvg() {
    return `${this.x},${this.y}`;
  }
}

export interface Coordinates {
  x: number;
  y: number;
}
