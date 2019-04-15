import Vector from './vector.js';

export default class Polygon {
    /**
     *
     * @param {Array} vectors
     */
    constructor(vectors) {
        this.numberOfVertices = vectors.length;
        this.vertices = vectors.map((vector) => vector.clone());
        this.transformedVertices = vectors.map((vector) => vector.clone());

        this.centerVertex = this.calcCenterVertex(this.vertices);
        this.furthestOutVertex = this.calcVertexFurthestOutFrom(this.centerVertex, this.vertices);

        this.offsetX = 0;
        this.offsetY = 0;
        this.scale = 1;
        this.rotation = 0;
    }

    getCenter() {
        return this.centerVertex.clone();
    }

    getFurthestOut() {
        return this.centerVertex.clone();
    }

    getNumberOfVertices() {
        return this.numberOfVertices;
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

    getTransVertices() {
        return this.transformedVertices.map((vertex) => vertex.clone());
    }

    /**
     * Apply the transformations we've set previously
     *
     * @public
     */
    applyTransformations() {
        this.transformedVertices = new Array(this.numberOfVertices);

        const offsetX = this.offsetX;
        const offsetY = this.offsetY;
        const scale = this.scale;
        const rotation = this.rotation;

        this.vertices.forEach((vertex, index) => {
            this.transformedVertices[index] = (
                vertex
                    .clone()
                    .scale(scale)
                    .addDirection(rotation)
                    .addX(offsetX)
                    .addY(offsetY)
            );
        });
    }

    /**
     * Get edges from vertices
     *
     * @public
     * @return {Array}
     */
    getVerticesEdges() {
        return this.getEdges(this.transformedVertices);
    }

    /**
     * Get edges from transformed vertices
     *
     * @public
     * @return {Array}
     */
    getTransVerticesEdges() {
        return this.getEdges(this.transformedVertices);
    }

        /**
         * Retrieve an array of edges from an array of vertices
         *
         * @private
         * @param {Array} vertices
         * @return {Array} The edges
         */
        getEdges(vertices) {
            const numberOfVertices = vertices.length;
            const edges = new Array(numberOfVertices);

            for (let i = 0; i < numberOfVertices; i += 1) {
                const current = i;
                const next = (i + 1) % numberOfVertices;
                const vertexStart = vertices[current];
                const vertexEnd = vertices[next];

                const edge = vertexEnd.clone().sub(vertexStart);

                edges[i] = edge;
            }

            return edges;
        }

        /**
         * @private
         * @param {Array} vertices
         * @return {Vector}
         */
        calcCenterVertex(vertices) {
            const center = new Vector();

            vertices.forEach((vertex) => {
                center.add(vertex);
            });

            center.divide(this.numberOfVertices);

            return center;
        }

        /**
         * @private
         * @param {Vector} center
         * @param {Array} vertices
         * @return {Vector}
         */
        calcVertexFurthestOutFrom(center, vertices) {
            let furthestOut = new Vector();
            let furthestDistance = Math.NEGATIVE_INFINITY;

            vertices.forEach((vertex) => {
                let vertexDistance = vertex.distancesq(center);

                if (vertexDistance > furthestDistance) {
                    furthestDistance = vertexDistance;
                    furthestOut = vertex;
                }
            });

            return furthestOut;
        }
}
