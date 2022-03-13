
let radius=200;
let step,angle;
let xoff=0;
let speedUp=10;
let A,B,C,D;
function setup() {
    createCanvas(windowWidth, windowHeight);
    noFill();
    step= TWO_PI /60;
    angle= -PI;
    strokeWeight(6);
    colorMode(HSB, 360);
    A=random(0,360);
    B=A+60;
    C=random(0,360);
    D=C+60;
   // background(51)
chooseColor();
}

function draw() {
    translate(width/2,height/2);
    for(let i=0;i<=speedUp;i++)
    if(radius>0){
        strokeWeight(random(2,4))
    xoff+=0.03;
    if(random()<0.5)
        arc(0,0,radius+random(-15,15),radius+random(-15,15),angle,angle+step);
    angle+=step;
    if(angle>PI){
chooseColor();
            angle= -PI;
            // step/=2;
            radius-=2;
    }
    }
}

function chooseColor(){
                if(noise(xoff)<0.5)
        stroke(map(noise(xoff),0,1,A,B),255,360);
    else stroke(map(noise(xoff),0,1,C,D),255,360)
}