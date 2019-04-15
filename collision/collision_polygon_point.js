/**
 * Test collision between a polygon and a point
 *
 * @param {Polygon} polygon
 * @param {Vector} point
 * @return {Boolean}
 */
export default function polygonToPoint(polygon, point) {
    const theseVertices = polygon.getTransVertices();
    const theseEdges = polygon.getTransVerticesEdges();

    let previousSide = 0;

    for (let i = 0; i < theseEdges.length; i += 1) {
        const vertex = theseVertices[i];
        const edge = theseEdges[i];

        const vertexToPoint = point.clone().sub(vertex);
        const side = getSide(edge, vertexToPoint);

        if (side === 0) {
            return false;
        }

        if (previousSide === 0) {
            previousSide = side;
        }

        if (previousSide !== side) {
            return false;
        }
    }

    return true;
}

function getSide(vector1, vector2) {
    const dot = vector1.dot(vector2);

    if (dot < 0) {
        return -1;
    } else if (dot > 0) {
        return 1;
    }

    return 0;
}
