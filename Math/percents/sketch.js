let s = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background('#107a8b');
    translate(width/2,height/2);
    fill(255);
    textSize(15);
    textAlign(CENTER,CENTER)
    for(let r=0;r<=500;r+=100){
    fill(   167, 255, 131,map(r,0,500,255,100))
        for (let angle = 0; angle < TWO_PI-0.2; angle += TWO_PI / (r/5)) {
            push();
            translate(r * cos(angle), r * sin(angle));
            rotate(angle)
            text(`${int(random(100))}% din ${int(random(20,100))}`, 0, 0);
            pop();

        }
    }


}

function draw() {

}