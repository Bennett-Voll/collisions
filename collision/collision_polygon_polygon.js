import Collisions from './Collisions.js';
import PushVectorDeterminer from './PolygonPushVectorDeterminer.js';
import { rangeOverlap, getProjectionOnAxis } from './collision_helpers.js';

/**
 * Test collision with two polygons
 *
 * @param {Polygon}
 * @param {Polygon}
 * @return {Collisions}
 */
export default function polygonToPolygon(thisPolygon, thatPolygon) {
    const theseVertices = thisPolygon.getTransVertices();
    const thoseVertices = thatPolygon.getTransVertices();
    const theseEdges = thisPolygon.getTransVerticesEdges();
    const thoseEdges = thatPolygon.getTransVerticesEdges();

    const pushVectorDeterminer = new PushVectorDeterminer();

    for (let i = 0; i < theseEdges.length; i += 1) {
        const axis = theseEdges[i].clone().lookRight();
        const thisProjection = getProjectionOnAxis(theseVertices, axis);
        const thatProjection = getProjectionOnAxis(thoseVertices, axis);

        const overlap = rangeOverlap(
            thisProjection.min,
            thisProjection.max,
            thatProjection.min,
            thatProjection.max
        );

        pushVectorDeterminer.addCandidate(thisProjection, thatProjection, axis);

        if (overlap === 0) {
            return new Collisions(false);
        }
    }

    for (let i = 0; i < thoseEdges.length; i += 1) {
        const axis = thoseEdges[i].clone().lookRight();
        const thisProjection = getProjectionOnAxis(theseVertices, axis);
        const thatProjection = getProjectionOnAxis(thoseVertices, axis);

        const overlap = rangeOverlap(
            thisProjection.min,
            thisProjection.max,
            thatProjection.min,
            thatProjection.max
        );

        pushVectorDeterminer.addCandidate(thisProjection, thatProjection, axis);

        if (overlap === 0) {
            return new Collisions(false);
        }
    }

    const collision = new Collisions(true);
    const pushVector = pushVectorDeterminer.getPushVector();

    collision.setPushVector(pushVector);

    return collision;
}
