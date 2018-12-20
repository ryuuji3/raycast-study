import { Point, Polygon, Segment } from "../../src";

test.skip("sort() should sort points clockwise", () => {
    const points = [ new Point(-1, 5), new Point(0,0), new Point(1,5) ];
    const sorted = [ new Point(0,0), new Point(1,5), new Point(-1, 5) ];
    const polygon = new Polygon(points);

    expect(polygon.points.length).toBe(sorted.length);
    expect(polygon.points).toBe(sorted);
});

test("should create sides (segments) from sorted points", () => {
    const points = [ new Point(0,0), new Point(1,5), new Point(-1, 5) ]; 
    const sides = [
        new Segment(points[0], points[1]),
        new Segment(points[1], points[2]),
        new Segment(points[2], points[0])
    ]
    const polygon = new Polygon(points);

    expect(polygon.sides.length).toBe(points.length);
    expect(polygon.sides).toStrictEqual(sides);
});

test("find() should return true if point is inside polygon", () => {
    const points = [ new Point(0,0), new Point(1,5), new Point(-1, 5) ]; 
    const polygon = new Polygon(points);

    expect(polygon.has(new Point(0, 3))).toBeTruthy();
    expect(polygon.has(new Point(2, 0))).toBeFalsy();
    expect(polygon.has(new Point(0, 0))).toBeFalsy(); // TODO: Also include points ON segments between points
});