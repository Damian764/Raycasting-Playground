class Particle {
    constructor() {
        this.pos = createVector(width / 2, height / 2);
        this.rays = [];
        for (let a = 0; a < 360; a += 0.1) {
            this.rays.push(new Ray(this.pos, radians(a)));

        }
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
            if(closest) {
                stroke(color);
                line(this.pos.x, this.pos.y, closest.x, closest.y);
            }
        }
    }
    updatePosition(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }
}