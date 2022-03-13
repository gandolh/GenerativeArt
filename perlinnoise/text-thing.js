let fox;
let pink;
let foxes;
function preload() {
    fox = loadImage('3.png');
    foxes=[fox,loadImage('4.png'),loadImage('5.png')]
    font =loadFont('Roboto-Medium.ttf');
}
let font_size=120;
function setup() {
    createCanvas(windowWidth, windowHeight)
    background(255);
    textFont(font);
    textAlign(CENTER)
    textSize(font_size)
    noStroke();
    // text('Power_Fox', width / 2, height / 2)
    bounds = font.textBounds('Power_Fox',  width / 2, height / 2, font_size);
    points = font.textToPoints('Power_Fox', width / 2- bounds.w/2, height / 2, font_size, {
        sampleFactor: 0.08 ,
        simplifyThreshold: 0
    });
    console.log(points)
    stroke(255,0,0)
    strokeWeight(4)
    for(let i=0;i<points.length;i++){
    	let pt= points[i];
    	// point(pt.x,pt.y)
    	image(random(foxes),pt.x,pt.y,16,16)
    }
}

function draw() {

}