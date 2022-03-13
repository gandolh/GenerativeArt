class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height))
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.maxSpeed =2;
        this.prevPos = this.pos.copy();
        this.colorvalue =225;
        this.step=1;
    }
    update() {
        this.updatePrevPos();
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
       this.colorvalue+=this.step*random(1,4);
            if (this.colorvalue >= 120 ||  this.colorvalue <180)this.step*=-1;
    }
    follow(vectors) {
        let x = floor(this.pos.x / scl);
        let y = floor(this.pos.y / scl);
        let index = x + y * cols;
        let force = vectors[index];
        this.applyForce(force);
    }
    applyForce(force) {
        this.acc.add(force);
    }
    show() {
        stroke(this.colorvalue, 250, 360, 200)
        strokeWeight(5);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
        //point(this.pos.x,this.pos.y);
    }
    updatePrevPos() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }
    edges() {
        if (this.pos.x > width) {
            this.pos.x = 0;
            this.updatePrevPos();
        } else if (this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrevPos();
        } else if (this.pos.y > height) {
            this.pos.y = 0;
            this.updatePrevPos();
        } else if (this.pos.y < 0) {
            this.pos.y = height;
            this.updatePrevPos();
        }
    }
}