import {IPoint, Point, Polygon} from "../../src";

test("polygon should sort points clockwise around average of all points", () => {
    const points: IPoint[] = [ [-1, 5], [0,0], [1,5] ];
    const sorted = [ [0,0], [1,5], [-1, 5] ].map(([ x, y ]) => new Point(x, y));
    const polygon = new Polygon(points);

    expect(polygon.points.length).toBe(sorted.length);
    expect(polygon.points).toEqual(sorted);
});

test("has() should return true if point is inside triangle", () => {
    const polygon = new Polygon([[0, 0], [1, 5], [-1, 5]]);

    expect(polygon.has(new Point(0, 3))).toBeTruthy();
    expect(polygon.has(new Point(2, 0))).toBeFalsy();
    expect(polygon.has(new Point(0, 0))).toBeFalsy();
});

test("has() should return true if point is inside square", () => {
    const polygon = new Polygon([
        [-2, -2],
        [-2, 2],
        [2, 2],
        [2, -2]
    ]);

    expect(polygon.has(new Point(0, 0))).toBeTruthy();
});

test("has() should return true if point is inside polygon", () => {
    const polygon = new Polygon([
        [-2, -3],
        [-2, 4],
        [-1, 5],
        [2, 2],
        [1, -1],
    ]);

    expect(polygon.has(new Point(0, 0))).toBeTruthy();
    expect(polygon.has(new Point(-3, -3))).toBeFalsy();
});

test("has() should return true for polygon with points that are not sorted", () => {
    const polygon = new Polygon([
        [1, -1],
        [-2, -3],
        [2, 2],
        [-1, 5],
        [-2, 4],
    ]);

    expect(polygon.has(new Point(0, 0))).toBeTruthy();
    expect(polygon.has(new Point(-3, -3))).toBeFalsy();
});