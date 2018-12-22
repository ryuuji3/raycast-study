import { Point } from "./Point";
import { Segment } from "./Segment";

export class Polygon {
    public sides: Segment[];

    constructor(public points: Point[]) {
        this.sides = this.createSegments(points);
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
        let segments: Segment[] = [];

        sorted.forEach((point, index, array) => {
            const a = point;
            const b = (index < array.length - 1) ? array[index + 1] : array[0];
            
            segments.push(new Segment(a, b));
        });

        return segments;
    }

    /**
     * Return if the ray (starting at point) intersects segment between two points (A and B).
     * 
     * Idea comes from: https://github.com/soniakeys/raycast/blob/master/raycast.go
     * 
     * TODO: Figure out this algorithm
     * 
     * @param point
     * @param segment 
     */
    protected pointHasIntersection(point: Point, segment: Segment): boolean {
        const { x, y } = point;
        const { a, b, i, j} = segment;

        return ((y > a.y) && (x < b.y)) // y is between a and b
            && x < a.x + (i)*(y-a.y)/j // x falls within triangle created from a and b... I think?
    }

    /**
     * If point exists inside polygon.
     * 
     * @param point 
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
}