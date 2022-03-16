let s_ellipses = [];
let xoff = 0,yoff=0;
let rows,cols;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(51)
    noFill();
    stroke(255)
    strokeWeight(7)
        // noStroke();
    colorMode(HSB);
    rows=int(height/100);
    cols=int(width/100);
    for (let i = 0; i <=rows; i++) {
        for(let j=0;j<=cols;j++){
        s_ellipses.push(new SuperEllipse(
            1, //n1
            3, //n2
            3, //n3
            1, // m
            3, // a
            3, // b
            color(noise(xoff,yoff)*360, 255, 255)
        ));
        xoff += 0.3;
        }
        yoff+=0.3;
    }
}

function draw() {
    frameRate(3)
    background(0, 0, 20)
    translate(50,50)
    for (let i = rows; i >= 0; i--) {
        push();
        for(let j=cols;j>=0;j--){

        s_ellipses[i*rows+j].show();
        translate(100,0);
    }
    pop();
    translate(0,100)
}   

}



class SuperEllipse {
    constructor(n1, n2, n3, m, a, b, colr) {
        this.n1 = n1;
        this.n2 = n2;
        this.n3 = n3;
        this.m = m;
        this.a = a;
        this.b = b;
        this.colr = colr;
        this.m_step=1;
    }
    supershape(theta) {

        let part1 = (1 / this.a) * cos(theta * this.m / 4);
        part1 = abs(part1);
        part1 = pow(part1, this.n2);
        let part2 = (1 / this.b) * sin(theta * this.m / 4);
        part2 = abs(part2);
        part2 = pow(part2, this.n3);
        let part3 = pow(part1 + part2, 1 / this.n1);
        if (part3 == 0) {
            return 0;
        }
        return (1 / part3);
    }

    show() {
        fill(this.colr)
        stroke(this.colr)
        beginShape();
        for (let angle = 0; angle < TWO_PI; angle += 0.01) {
            let r = this.supershape(angle);
            let x =  r * cos(angle);
            let y =  r * sin(angle);
            vertex(x, y);
        }
        endShape(CLOSE);
        this.m+=this.m_step;
        if(this.m>6 || this.m<1)
            this.m_step*=(-1);
    }
}