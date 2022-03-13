let box_size = 40;

let angle = 0;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    background(51);
    // ortho()
    cam = createEasyCam();
    cam_pos = cam.getPosition(cam);
    rotateY(0.7);
    // normalMaterial();
    directionalLight(76, 195, 217, 0,1,0)
    directionalLight(255, 198, 93, 1,0,0)
    directionalLight(241, 102, 69, 0,0,-1)
    for (let i = -width / 2 + box_size; i <= width / 2; i += box_size) {

        for (let j = -height / 2 + box_size / 2; j <= height / 2; j += box_size) {

            push();
            translate(i, j, j + i)
            box(box_size);
            pop();
        }

    }

}

function draw() {
    // background(51)
    // scale(1/10)
    angle += 0.03;
}