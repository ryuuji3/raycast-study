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
     * @param segment 
     * @return true if ray intersects from left
     */
    protected pointHasIntersection(point: Point, segment: Segment): boolean {
        const { x, y } = point;
        const { a, b, theta } = segment;
        
        if (y < a.y || y > b.y || (x >= a.x && x >= b.x)) { // Outside range
            return false;
        } else if (x < a.x && x < b.x) { // Left of both A and B
            return true;
        } else { // create vector from AP and compare angles; if theta of AP is > than theta of AB then ray intersects segment
            return Math.atan((y - a.y) / (x - a.x)) > theta;
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