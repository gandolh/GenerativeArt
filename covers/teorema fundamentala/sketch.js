let xoff = 0,
    yoff = 0,
    pass = 0.3;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(360);
    colorMode(HSB, 360, 100, 100)
    textSize(32);
    textAlign(CENTER, CENTER);
    for (let i = -1020; i <= width; i += 150) {
        xoff = 0;
        for (let j = -1050; j <= height; j += 100) {
            let col = color(200, 0, map(random(),0,1,0,50))
            fill(col)
            stroke(col)
            let no1 = int(random(1, 10));
            let no2 = int(random(1, 10));
            let factor = int(random(1, 9));
            fraction(i, j, no1, no2, no1 * factor, no2 * factor);
            xoff += pass;
        }
        yoff += pass;
    }
}

function draw() {

}


function fraction(x, y, no1, no2, no3, no4) {
    let rand = int(random(4));
    switch (rand) {
        case 0:
            no1 = 'x';
            break;
        case 1:
            no2 = 'x';
            break;
        case 2:
            no3 = 'x';
            break;
        case 3:
            no4 = 'x';
            break;
    }
    push();
    translate(x, y)
    rotate(noise(xoff, yoff))
    text(
        `${no1}
${no2}`, 0, 0);

    line(-15, 0, 15, 0)
    text('=', 35, 5);


    text(
        `${no3}
${no4}`, 70, 0);


    line(50, 0, 90, 0)
    pop();
}