/**
 * A Vector
 *
 * @export
 * @class Vector
 */
export default class Vector {
    /**
     * Create a new vector
     *
     * @param {Number} x
     * @param {Number} y
     * @memberof Vector
     */
    constructor(x = 1, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * Return magnitude of vector
     *
     * @returns {Number}
     * @memberof Vector
     */
    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Return the magnitude squared. Faster than mag()
     *
     * @returns {Number}
     * @memberof Vector
     */
    magsq() {
        return this.x * this.x + this.y * this.y;
    }

    /**
     * Scale the vector
     *
     * @param {Number} scalar
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    scale(scalar) {
        return (this.x *= scalar, this.y *= scalar, this);
    }

    /**
     * Scale the x component by a scalar
     *
     * @param {Number} scalar
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    scaleX(scalar) {
        return (this.x *= scalar, this);
    }

    /**
     * Scale the y component by a scalar
     *
     * @param {Number} scalar
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    scaleY(scalar) {
        return (this.y *= scalar, this);
    }

    /**
     * Divide the vector by a scalar
     *
     * @param {Number} scalar
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    divide(scalar) {
        return this.scale(1 / scalar);
    }

    /**
     * Divide the x component by a scalar
     *
     * @param {Number} scalar
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    divideX(scalar) {
        return (this.x /= scalar, this);
    }

    /**
     * Divide the y component by a scalar
     *
     * @param {Number} scalar
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    divideY(scalar) {
        return (this.y /= scalar, this);
    }

    /**
     * Get the direction of the vector
     *
     * @returns {Number}
     * @memberof Vector
     */
    direction() {
        return Math.atan2(this.y, this.x);
    }

    /**
     * Get the direction of the vector in degree
     *
     * @returns {Number}
     * @memberof Vector
     */
    directionDeg() {
        return Vector.toDeg(Math.atan2(this.y, this.x));
    }

    /**
     * Change the direction of the vector
     *
     * @param {Number} radians
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    setDirection(radians) {
        let mag = this.mag();
        return (this.x = mag * Math.cos(radians), this.y = mag * Math.sin(radians), this);
    }

    /**
     * Change the direction of the vector
     *
     * @param {Number} degree
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    setDirectionDeg(degree) {
        return this.setDirection(Vector.toRad(degree));
    }

    /**
     * Add to the direction of the vector
     *
     * @param {Number} radians
     * @returns {Vector} The current vector
     */
    addDirection(radians) {
        return this.setDirection(this.direction() + radians);
    }

    /**
     * Add to the direction of the vector
     *
     * @param {Number} degree
     * @returns {Vector} The current vector
     */
    addDirectionDeg(degree) {
        return this.addDirection(Vector.toRad(degree));
    }

    /**
     * Subtract 90 degrees from the vector's direction
     *
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    lookLeft() {
        let x = this.x;
        return (this.x = -this.y, this.y = x, this);
    }

    /**
     * Add 90 degrees from the vector's direction
     *
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    lookRight() {
        let x = this.x;
        return (this.x = this.y, this.y = -x, this);
    }

    /**
     * Change the magnitude of the vector to one, but perserve the direction
     *
     * @param {Number} scale Scale the vecter immediately and conviently
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    normalize(scalar = 1) {
        let mag = this.mag();
        return (this.x *= scalar / mag, this.y *= scalar / mag, this);
    }

    /**
     * Shorthand for normalize
     *
     * @param {Number} scale
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    norm(scalar = 1) {
        return this.normalize(scalar);
    }

    /**
     * Make a copy of this vector
     *
     * @returns {Vector} A new vector
     * @memberof Vector
     */
    clone() {
        return new Vector(this.x, this.y);
    }

    /**
     * Add a vector
     *
     * @param {Vector} vect
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    add(vect) {
        return (this.x += vect.x, this.y += vect.y, this);
    }

    /**
     * Add a value to the x component
     *
     * @param {Number} n
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    addX(n) {
        return this.x += n, this;
    }

    /**
     * Add a value to the y component
     *
     * @param {Number} n
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    addY(n) {
        return this.y += n, this;
    }

    /**
     * Subtract a vector
     *
     * @param {Vector} vect
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    sub(vect) {
        return (this.x -= vect.x, this.y -= vect.y, this);
    }

    /**
     * Subtract a value to the x component
     *
     * @param {Number} n
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    subX(n) {
        return this.x -= n, this;
    }

    /**
     * Subtract a value to the y component
     *
     * @param {Number} n
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    subY(n) {
        return this.y -= n, this;
    }

    /**
     * Flip the vector 180 degrees
     *
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    inverse() {
        return this.scale(-1);
    }

    /**
     * Mirror the vector relative to the x component
     *
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    inverseX() {
        return this.scaleX(-1);
    }

    /**
     * Mirror the vector relative to the y component
     *
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    inverseY() {
        return this.scaleY(-1);
    }

    /**
     * Check if one vector is parralel to another.
     * NOTE: This may not always be trustworthy due to inaccuracies in floating point math
     *
     * @param {Vector} vect
     * @returns {Boolean}
     * @memberof Vector
     */
    isParralelTo(vect) {
        return Vector.dotProduct(this.clone().lookLeft(), vect) === 0;
    }

    /**
     * Calculate the distance from this vector
     *
     * @param {Vector} vect
     * @returns {Number}
     * @memberof Vector
     */
    distance(vect) {
        return this.clone().sub(vect).mag();
    }

    /**
     * Calculate the squared distance from this vector
     *
     * @param {Vector} vect
     * @returns {Number}
     * @memberof Vector
     */
    distancesq(vect) {
        return this.clone().sub(vect).magsq();
    }

    /**
     * Calculate the dotproduct
     *
     * @param {Vector} vect
     * @returns {Number}
     * @memberof Vector
     */
    dotProduct(vect) {
        return this.x * vect.x + this.y * vect.y;
    }

    /**
     * Shorthand for dotProduct()
     *
     * @param {Vector} vect
     * @returns {Number}
     * @memberof Vector
     */
    dot(vect) {
        return this.dotProduct(vect);
    }

    /**
     * Round the components of the vector
     *
     * @returns {Vector} The current vector
     * @memberof Vector
     */
    unFloat() {
        return (this.x = Math.round(this.x), this.y = Math.round(this.y), this);
    }

    /**
     * String representation
     *
     * @returns {String}
     * @memberof Vector
     */
    toString() {
        return `[${this.x}, ${this.y}]`;
    }
}

/**
 * Relative difference in angle. Can be negative
 * TODO: add more explenation
 *
 * @param {Vector} vect1
 * @param {Vector} vect2
 * @returns {Number}
 */
Vector.angleDifference = (vect1, vect2) => {
    let difference = vect1.direction() - vect2.direction();

    if (difference > Math.PI / 2) {
        difference -= 2 * Math.PI;
    }

    if (difference < -Math.PI / 2) {
        difference += 2 * Math.PI;
    }

    return difference;
};

/**
 * Convert to radians
 *
 * @param {Number} degree
 * @return {Number}
 */
Vector.toRad = (degree) => degree / 180 * Math.PI;

/**
 * Convert to degrees
 *
 * @param {Number} radians
 * @return {Number}
 */
Vector.toDeg = (radians) => radians * 180 / Math.PI;

/**
 * Create a vector from a magnitude and a direction
 *
 * @param {Number} magnitude
 * @param {Number} radians
 * @returns {Vector}
 */
Vector.fromMag = (mag, rad) => new Vector(mag * Math.cos(rad), mag * Math.sin(rad));

/**
 * Create a vector from a magnitude and a direction in degrees
 *
 * @param {Number} magnitude
 * @param {Number} degree
 * @returns {Vector}
 */
Vector.fromMagDeg = (mag, deg) => Vector.fromMag(mag, Vector.toRad(deg));
