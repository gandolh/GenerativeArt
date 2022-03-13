let box_size = 40;
let side = 30;
let angle=0;
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    background(51);
    ortho()
    cam = createEasyCam();



}

function draw() {
    cam_pos=cam.getPosition(cam);
    background(51)
    // rotateY(angle);
    rotateY(2.2);
    rotateX(0.02)
    pointLight(     76, 195, 217,0,0,cam_pos[2])
    pointLight(255,198,93,0,-height/2,0)
    pointLight(     241, 102, 69,width/2,0,cam_pos[2])
    angle+=0.03;
    push();
    normalMaterial();
    sphere(30);
    pop();
    push();
    translate(-box_size * (side+1) / 1.7, box_size*side/8, box_size*side/4)
    for(let k=0;k<side;k+=4){
        translate(2*box_size,-box_size,-box_size)
        push();
    for (let j = k; j < side; j+=2) {
        translate(box_size,0,-box_size)
        push();
        for (let i = j; i <side; i++) {
            translate(box_size, 0, 0)
            box(box_size)
        }
        pop();
    }
    pop();
    }
    pop();
}