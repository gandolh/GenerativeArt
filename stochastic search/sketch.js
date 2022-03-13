let circles=[];
let failed=0;
let currentRadius=32;
function setup() {
    createCanvas(windowWidth,windowHeight);
    background(51);
    noStroke();
    colorMode(HSB,360,100,100);
}
function draw(){
 let tempCircle= new Circle(random(width),random(height),currentRadius);
 if(tempCircle.valid()){
    tempCircle.show();
    circles.push(tempCircle);
 }
 else{
    failed++;
    if(failed> 16*1024/currentRadius){    
        currentRadius/=2;
        failed=0;
       if(currentRadius<4) {
        noLoop();
        console.log("DONE!")
       }
    }
 }
}

class Circle{
    constructor(x,y,r){
        this.x=x;
        this.y=y;
        this.r=r;
        this.hue=random(360);
        this.saturation=66.5;
        this.lightness=86.5;
    }
    show(){
        noStroke();
    fill(this.hue,this.saturation,this.lightness);
    let size=this.r;
      beginShape();
  vertex(this.x, this.y);
  bezierVertex(this.x - size / 2, this.y - size / 2, this.x - size, this.y + size / 3, this.x, this.y + size);
  bezierVertex(this.x + size, this.y + size / 3, this.x + size / 2, this.y - size / 2, this.x, this.y);
  endShape(CLOSE);

    }
    valid(){
    for(let c of circles){
        if(dist(this.x,this.y,c.x,c.y) < this.r + c.r || dist(this.x,this.y,width/2,height/2)>350)return 0;
    }
    return 1;
    }

}