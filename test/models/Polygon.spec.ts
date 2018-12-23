import { Point, Polygon, Segment } from "../../src";

test("polygon should sort points clockwise around average of all points", () => {
    const points = [ new Point(-1, 5), new Point(0,0), new Point(1,5) ];
    const sorted = [ new Point(0,0), new Point(1,5), new Point(-1, 5) ];
    const polygon = new Polygon(points);

    expect(polygon.points.length).toBe(sorted.length);
    expect(polygon.points).toStrictEqual(sorted);
});

test("should create sides (segments) from ordered points and set point A of segment to point with lowest y", () => {
    const points = [ new Point(0,0), new Point(1,5), new Point(-1, 5) ]; 
    const sides = [
        new Segment(points[0], points[1]),
        new Segment(points[1], points[2]),
        new Segment(points[0], points[2])
    ]
    const polygon = new Polygon(points);

    expect(polygon.sides.length).toBe(points.length);
    expect(polygon.sides).toStrictEqual(sides);
});

test("has() should return true if point is inside triangle", () => {
    const points = [ new Point(0,0), new Point(1,5), new Point(-1, 5) ]; 
    const polygon = new Polygon(points);

    expect(polygon.has(new Point(0, 3))).toBeTruthy();
    expect(polygon.has(new Point(2, 0))).toBeFalsy();
    expect(polygon.has(new Point(0, 0))).toBeFalsy();
});

test("has() should return true if point is inside square", () => {
    const square = [
        new Point(-2,-2),
        new Point(-2, 2),
        new Point( 2, 2),
        new Point( 2,-2)
    ]
    const polygon = new Polygon(square);

    expect(polygon.has(new Point(0,0))).toBeTruthy();
});

test("has() should return true if point is inside polygon", () => {
    const shape = [
        new Point(-2,-3),
        new Point(-2, 4),
        new Point(-1, 5),
        new Point( 2, 2),
        new Point( 1,-1)
    ]
    const polygon = new Polygon(shape);

    expect(polygon.has(new Point(0,0))).toBeTruthy();
    expect(polygon.has(new Point(-3, -3))).toBeFalsy();
});

test("has() should return true for polygon with points that are not sorted", () => {
    const shape = [
        new Point( 1,-1),
        new Point(-2,-3),
        new Point( 2, 2),
        new Point(-1, 5),
        new Point(-2, 4)
    ]
    const polygon = new Polygon(shape);

    expect(polygon.has(new Point(0,0))).toBeTruthy();
    expect(polygon.has(new Point(-3, -3))).toBeFalsy();
});