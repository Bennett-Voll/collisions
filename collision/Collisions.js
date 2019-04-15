import Vector from '../vector.js';

export default class Collisions {
    constructor(inCollision) {
        this.inCollision = inCollision;
    }

    /**
     * @public
     * @param {Object} thisInstance
     */
    setThisInstance(thisInstance) {
        this.thisInstance = thisInstance;
    }

    /**
     * @public
     * @param {Object} thatInstance
     */
    setThatInstance(thatInstance) {
        this.thatInstance = thatInstance;
    }

    /**
     * @public
     * @param {Vector} vector
     */
    setPushVector(vector) {
        this.pushVector = vector;
    }

    /**
     * @public
     * @param {Vector} vector
     */
    setPointOfCollision(vector) {
        this.pointOfCollision = vector;
    }

    /**
     * @public
     * @param {Boolean} inCollision
     */
    setHasCollided(inCollision) {
        this.inCollision = inCollision;
    }

    /**
     * @public
     * @return {Vector}
     */
    getPushVector() {
        return this.pushVector || new Vector(0, 0);
    }
}
