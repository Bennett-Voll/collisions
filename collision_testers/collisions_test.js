import Circle from '../Circle.js';
import Polygon from '../Polygon.js';

import polygonToPolygon from './collision_polygon_polygon.js.js';
import polygonToCircle from './collision_polygon_circle.js';
import circleToCircle from './collision_circle_circle.js';

/**
 * Instance with which to compare collisions
 *
 * @param {Object} thisInstance
 * @param {Object} thatInstance
 * @return {Boolean}
 */
export default function areInCollision(thisInstance, thatInstance) {
    if (
        thisInstance instanceof Circle &&
        thatInstance instanceof Circle
    ) {
        return circleToCircle(thisInstance, thatInstance);
    }

    if (
        thisInstance instanceof Circle &&
        thatInstance instanceof Polygon
    ) {
        return polygonToCircle(thatInstance, thisInstance);
    }

    if (
        thisInstance instanceof Polygon &&
        thatInstance instanceof Circle
    ) {
        return polygonToCircle(thisInstance, thatInstance);
    }

    if (
        thisInstance instanceof Polygon &&
        thatInstance instanceof Polygon
    ) {
        return polygonToPolygon(thisInstance, thatInstance);
    }

    return false;
}
