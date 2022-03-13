let cam;
let cam_pos,
    ellipses = [];
let rotation_galaxy_angle=0;
let failed_attempt=0;
function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    cam = createEasyCam();
    // suppress right-click context menu
    //document.oncontextmenu = function() { return false; }
    background(51)
    noStroke();
    for (let i = 0; i <= 250; i++) {
        let ok = 0;
        failed_attempt=0;
        while (!ok) {
        	ok=1;
            let angle = random(TWO_PI);
            let distance = random(70, 300);
            //console.log(angle)
            let x = distance * cos(angle);
            let y=0;
            let z = distance * sin(angle);
            let size=random(5,10);
            for (let e of ellipses)
                if (dist(e.x,e.y,e.z,x,y,z)<(e.size+size)*1.5) {
                    ok = 0;
                    break;
                }
                //collides;
            if (ok) ellipses.push({
                x: x,
                y: y,
                z: z,
                size: size
            })
           failed_attempt++;
           if(failed_attempt>100)break;
        }
    }
}

function draw() {

    background(64);
    // lights();

    scale(1 / 1.25);
    rotateX(-PI / 16)
    rotateY(rotation_galaxy_angle);
    rotation_galaxy_angle+= TWO_PI/360;



shininess(20);
  ambientLight(100);

  specularColor(255, 0, 0);
  //pointLight(255, 255, 0, -250, -250, 0);
  directionalLight(250, 250, 250, 1, 1, -1);


    push();
    ambientMaterial(0,250,250);
    sphere(35);
    pop();
    // fill(255)
    push();
    colorMode(HSB,360);
    for (let e of ellipses) {
        push();
        ambientMaterial(noise(e.x/100,e.y/100,e.z)*360 - 120,255,360);
        translate(e.x, e.y, e.z);
        // ellipse(0,0,10)
        sphere(e.size)
        pop();
    }
    pop();

}