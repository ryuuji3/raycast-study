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
        const { theta: pax } = new Segment(point, a);

        if (point.y < a.y || point.y > b.y || (point.x >= Math.max(a.x, b.x))) {
            return false; // Outside bounds and can't possibly intersect
        } else if (point.x < Math.min(a.x, b.x)) {
            return true; // Gaurunteed to intersect
        } else {
            return pax > abx; // compare angles to x-axis
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
}