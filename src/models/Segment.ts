import { Point } from "./Point";

export class Segment {
    constructor(public a: Point, public b: Point) {}

    get i() {
        return this.b.x - this.a.x;
    }

    get j() {
        return this.b.y - this.a.y;
    }
}