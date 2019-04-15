import polygonToPoint from './collision_polygon_point.js';

/**
 * Test whether a polygon is in collision with an circle
 * @param {*} circle
 */
export default function polygonToCircle(polygon, circle) {
    const theseVertices = polygon.getTransVertices();
    const theseEdges = polygon.getTransVerticesEdges();
    const circleCenter = circle.getCenter();
    const circleRariusSq = Math.pow(circle.radius * circle.scale, 2);

    for (let i = 0; i < theseVertices.length; i += 1) {
        const vertex = theseVertices[i];
        const edge = theseEdges[i];

        const edgeLengthSq = edge.magsq();

        const edgeNormal = edge.clone().norm();
        const vertexToCenter = circleCenter.clone().sub(vertex);

        const dotProduct = vertexToCenter.clone().dot(edgeNormal);
        const pointOnLine = edgeNormal.clone().scale(dotProduct);

        let closestPoint;

        if (dotProduct < 0) {
            closestPoint = vertex.clone();
        } else if (dotProduct * dotProduct > edgeLengthSq) {
            closestPoint = vertex.clone().add(edge);
        } else {
            closestPoint = vertex.clone().add(pointOnLine);
        }

        const closestLineToCircle = circleCenter.clone().sub(closestPoint);

        if (closestLineToCircle.magsq() <= circleRariusSq) {
            return true;
        }
    }

    return polygonToPoint(polygon, circleCenter);
}
