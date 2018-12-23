Raycast Algorithm Study

Just a quick project to study the ray casting algorithm.

# Get Started

Just run the test command.

```
npm run test
```

# API

## `Point`

Most basic structure; simply holds x and y coordinates.

| property | description |
| ---  | --- |
| `x` | x coordinate |
| `y` | y coordinate |

```ts
const point = new Point(0,0);

console.log(point.x); // 0
```

## `Segment`

Holds two points and treats them as vectors.

| property | description |
| ---  | --- |
| `a` | point |
| `b` | point |
| `i` | width of vector |
| `j` | height of vector |
| `theta` | tangent of A and B |

```ts
const a = new Point(0,0);
const b = new Point(3,3);
const segment = new Segment(a, b);

console.log(segment.a); // 0,0
console.log(segment.b); // 3,3
console.log(segment.i); // 3
console.log(segment.j); // 3
console.log(segment.theta * 180 / Math.PI); // 45
```

## `Polygon`

Shape that groups points; sorts points and then organizes them into segments; with the last segment connecting the last point to the first.

| property | description |
| ---  | --- |
| `points` | sorted points |
| `sides` | organized segments |

| method | description |
| --- | --- |
| `has(point: Point): boolean` | returns true if intersections to the right are an odd number (ie. doesn't pass through twice which means it is outside) |


## Example
```ts
const points = [
    new Point(0,0),
    new Point(3,2),
    new Point(5, -1),
    new Point(3, -6),
    new Point(1, -1),
    new Point(-1, -6),
    new Point(-8, -1),
    new Point(-5, -1)
]

const polygon = new Polygon(points);

console.log(polygon.has(1, 0)); // true
console.log(polygon.has(-20, 0)); // false
```