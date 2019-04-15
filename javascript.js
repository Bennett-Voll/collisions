import Vector from './vector.js';
import Circle from './Circle.js';
import Polygon from './Polygon.js';

import areInCollision from './collision/collisions_test.js';

(function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.clearCanvas = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const poly1 = new Polygon([
        new Vector(0, 0),
        new Vector(0, 5),
        new Vector(2, 0),
    ]);

    const poly2 = new Polygon([
        new Vector(3, 3),
        new Vector(0, 5),
        new Vector(5, 5),
        new Vector(5, 3),
    ]);

    const circle = new Circle(1);

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', function(event) {
        mouseX = event.pageX;
        mouseY = event.pageY;
    });

    function drawCircle(ctx, circle) {
        ctx.beginPath();
        ctx.arc(circle.offsetX, circle.offsetY, circle.radius * circle.scale, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();
    }

    function drawPolygon(ctx, polygon) {
        const vertices = polygon.getTransVertices();
        const first = vertices[0];

        ctx.moveTo(first.x, first.y);

        ctx.beginPath();
        for (let i = 0; i < vertices.length; i += 1) {
            const vertex = vertices[i];

            ctx.lineTo(vertex.x, vertex.y);
        }
        ctx.closePath();
        ctx.stroke();
    }

    function draw() {
        ctx.clearCanvas();

        poly1.setOffsetX(mouseX);
        poly1.setOffsetY(mouseY);
        poly1.setScale(50);
        poly1.applyTransformations();

        poly2.setOffsetX(200);
        poly2.setOffsetY(200);
        poly2.setScale(50);
        poly2.applyTransformations();

        // circle.setOffsetX(mouseX);
        // circle.setOffsetY(mouseY);
        // circle.setScale(40);

        const collision = areInCollision(poly1, poly2);

        if (collision.inCollision) {
            ctx.strokeStyle = 'red';
        } else {
            ctx.strokeStyle = 'black';
        }

        const pushVector = collision.getPushVector();

        poly1.setOffsetX(poly1.offsetX + pushVector.x);
        poly1.setOffsetY(poly1.offsetY + pushVector.y);
        poly1.applyTransformations();

        drawPolygon(ctx, poly1);
        drawPolygon(ctx, poly2);

        // drawCircle(ctx, circle);

        requestAnimationFrame(draw);
      }

      draw();
}());
