
function setup(){
  createCanvas(windowWidth,windowHeight,WEBGL);
  background(51)
  noStroke();
}
let angle=0;
function draw(){
  background(51,51,51)
   // normalMaterial();
   directionalLight(255, 0, 120, -1, 1, -0.5);
   directionalLight(120, 0, 255, 1, -1, 0.25);

   ambientMaterial(255,255,255);
   rotate(angle);
   translate(100,10,10)
   push();
   rotate(3*angle)
   translate(150,0,0)
   sphere(20)
  translate(-300,0,0)
   sphere(20)
   pop();

    sphere(40)
   angle+=0.01;
}