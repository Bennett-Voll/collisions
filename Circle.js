import Vector from "./vector.js";

export default class Circle {
    constructor(radius) {
        this.radius = radius;

        this.rotation = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.scale = 1;
    }

    setRotation(rotation) {
        this.rotation = rotation;
    }

    setOffsetX(x) {
        this.offsetX = x;
    }

    setOffsetY(y) {
        this.offsetY = y;
    }

    setScale(scale) {
        this.scale = scale;
    }

    getCenter() {
        return new Vector(this.offsetX, this.offsetY);
    }

    getRadius() {
        return this.radius * this.scale;
    }
}
