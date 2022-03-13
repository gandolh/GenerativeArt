let s_ellipses=[];
let xoff=0;
function setup() {
    createCanvas(windowWidth, windowHeight);
    background(51)
    noFill();
    stroke(255)
    strokeWeight(7)
    // noStroke();
    colorMode(HSB);
    for(let i=15;i>=1;i--){

    s_ellipses.push(new SuperEllipse(
    	0+30*i,
    	0+30*i,
    	0.5,
    	0.03,
    	// color(random(360),255,255)
    	color(noise(xoff)*360,255,255)
    	));
    xoff+=0.3;
    }
}

function draw() {
    background(0,0,20)
    translate(width / 2, height / 2)
    for(let se of s_ellipses)
    	se.show();

}

function sgn(x) {
    if (x < 0) return -1;
    if (x == 0) return 0;
    return 1;
}

class SuperEllipse {
    constructor(a, b, n, step_n,colr) {
        this.a = a; //length on x axis
        this.b = b; //length on y axis
        this.n = n; // border radius
        this.step_n = step_n; //movement of n
        this.colr=colr;
    }
    show() {
    	// fill(this.colr)
    	stroke(this.colr)
        beginShape();
        for (let angle = 0; angle < TWO_PI; angle += 0.01) {
            // let x= r* cos(a);
            // let y=r*sin(a);
            let na = 2 / this.n;
            let x = pow(abs(cos(angle)), na) * this.a * sgn(cos(angle));
            let y = pow(abs(sin(angle)), na) * this.b * sgn(sin(angle));
            vertex(x, y);
        }
        endShape(CLOSE);
        this.n += this.step_n;
        if (this.n > 2.5 || this.n < 0.5) this.step_n *= (-1);
    }
}