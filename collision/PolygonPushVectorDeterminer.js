import { closestPushDistance } from './collision_helpers.js';

/**
 * Determine the smallest pushvector after each successive candidate
 */
export default class PolygonPushVectorDeterminer {
    constructor() {
        this.smallestPushDistanceSq = Number.POSITIVE_INFINITY;
        this.smallestRangePushDistance = Number.POSITIVE_INFINITY;
        this.smallestPushDistAxis = null;
    }

    addCandidate(oneProjection, otherProjection, axis) {
        const rangePushDistance = closestPushDistance(
            oneProjection.min,
            oneProjection.max,
            otherProjection.min,
            otherProjection.max
        );

        const rangePushDistanceSq = rangePushDistance * rangePushDistance;
        const realRangePushDistanceSq = rangePushDistanceSq / axis.dot(axis);

        if (realRangePushDistanceSq <= this.smallestPushDistanceSq) {
            this.smallestRangePushDistance = rangePushDistance;
            this.smallestPushDistanceSq = realRangePushDistanceSq;
            this.smallestPushDistAxis = axis;
        }
    }

    getPushVector() {
        const pushDistance = this.smallestRangePushDistance / this.smallestPushDistAxis.mag();
        const pushVector = this.smallestPushDistAxis.clone().norm(pushDistance);

        return pushVector;
    }
}
