class Particle {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.rays = [];
        this.fov = 45;
        this.startPos = 0;
        this.drawRays();
    }
    look(walls, color = 'rgba(255,255,255,0.01)') {
        for (let ray of this.rays) {
            let closest = null;
            let record = Infinity;
            for (let wall of walls) {
                const pt = ray.cast(wall);
                if (pt) {
                    const dist = p5.Vector.dist(this.pos, pt);
                    if (dist < record) {
                        record = dist;
                        closest = pt;
                    }
                }
            }
            if (closest) {
                stroke(color);
                line(this.pos.x, this.pos.y, closest.x, closest.y);
            }
        }
    }
    changeFOV() {
        this.rays = [];
        this.drawRays();
    }
    lookAround() {
        this.rays = [];
        this.drawRays();
    }
    drawRays() {
        for (let a = ((this.fov / 2) * -1) - this.startPos; a < (this.fov / 2) - this.startPos; a += 0.1) {
            this.rays.push(new Ray(this.pos, radians(a)));

        }
    }
    updatePosition(x, y) {
        if (x < 0) {
            x = 0;
        }
        else if (x > width) {
            x = width;
        }
        if (y < 0) {
            y = 0;
        }
        else if (y > height) {
            y = height;
        }
        this.pos.x = x;
        this.pos.y = y;
    }
}