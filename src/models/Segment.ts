import { Point } from "./Point";

export class Segment {
    public a: Point;
    public b: Point;

    constructor(p1: Point, p2: Point) {
        if (p1.y <= p2.y) {
            this.a = p1;
            this.b = p2;
        } else {
            this.b = p1;
            this.a = p2;
        }
    }

    get i() {
        return this.b.x - this.a.x;
    }

    get j() {
        return this.b.y - this.a.y;
    }
}