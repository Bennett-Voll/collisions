/**
 * Retrieve the size of the projection of an polygon on a particular axis
 *
 * @private
 * @param {Vector} axis
 * @return {Object}
 */
export function getProjectionOnAxis(vertices, axis) {
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;

    vertices.forEach((vertex) => {
        let dotProduct = vertex.dot(axis);

        if (dotProduct < min) {
            min = dotProduct;
        }

        if (dotProduct > max) {
            max = dotProduct;
        }
    });

    return {
        min,
        max
    };
}

/**
* Return the overlap between 2 ranges
*
* @private
* @param {Number} min1
* @param {Number} max1
* @param {Number} min2
* @param {Number} max2
* @return {Number}
*/
export function rangeOverlap(min1, max1, min2, max2) {
    return Math.max(0, Math.min(max1, max2) - Math.max(min1, min2));
}

/**
 * Calculate closest direction to push range 1 out of range 2.
 * So to eliminate the overlap with the lowest quantity possible.
 *
 * @param {Number} max1
 * @param {Number} min1
 * @param {Number} max2
 * @param {Number} min2
 * @return {Number}
 */
export function closestPushDistance(min1, max1, min2, max2) {
    // range 1 in somewhat pushed in on the left side
    if (min1 < min2 && max1 < max2) {
      return min2 - max1;
    }

    // range 1 in somewhat pushed in on the right side
    if (min1 > min2 && max1 > max2) {
      return max2 - min1;
    }

    // this point implies range 1 is enveloped by range 2
    // min2 < min1 < max1 < max2
    const ownProjectionLength = max1 - min1;
    const distanceBefore = Math.abs(min1 - min2);
    const distanceAfter = Math.abs(max1 - max2);

    if (distanceBefore > distanceAfter) {
      return ownProjectionLength + distanceAfter;
    }

    return -ownProjectionLength - distanceBefore;
}
