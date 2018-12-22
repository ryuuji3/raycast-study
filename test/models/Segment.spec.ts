import { Point, Segment } from "../../src";

test("A should be assigned to the point with the smallest y", () => {
    const smallY = new Point(0, 0);
    const bigY = new Point(0, 100);
    const sameAsYSmallY = new Point(100, 0);
    const segment = new Segment(bigY, smallY);
    const segment2 = new Segment(smallY, bigY);
    const segment3 = new Segment(smallY, sameAsYSmallY);

    expect(segment.a).toStrictEqual(smallY);
    expect(segment.b).toStrictEqual(bigY);
    expect(segment2.a).toStrictEqual(smallY);
    expect(segment2.b).toStrictEqual(bigY);
    expect(segment3.a).toStrictEqual(smallY);
    expect(segment3.b).toStrictEqual(sameAsYSmallY);
});