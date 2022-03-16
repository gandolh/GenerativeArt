function setup() {
    createCanvas(windowWidth, windowHeight);
    background(51);

    translate(width / 4, height / 2);

    draw_hand();
    translate(width/2,0)
    scale(-1,1)

	draw_hand();
}

function draw() {

}

class Rect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    show() {
        rect(this.x, this.y, this.w, this.h)
    }
}

function draw_hand() {
    let rects = [];
    let finger_length = -25,
        finger_width = 25,
        finger_offset = -5;
    //fingers numbered from left to right 
    //first finger
    rects.push(new Rect(0, 0, finger_width, finger_length))
    rects.push(new Rect(0, finger_length - 2, finger_width, 3 * finger_length))
        //second finger
    rects.push(new Rect(finger_width, finger_offset, finger_width, 2 * finger_length))
    rects.push(new Rect(finger_width, finger_offset + 2 * finger_length - 2, finger_width, 3 * finger_length))
        //third finger
    rects.push(new Rect(2 * finger_width, 2 * finger_offset, finger_width, 3 * finger_length))
    rects.push(new Rect(2 * finger_width, 2 * finger_offset + 3 * finger_length - 2, finger_width, 3 * finger_length))
        //fourth finger
    rects.push(new Rect(3 * finger_width, 3 * finger_offset, finger_width, 2.5 * finger_length))
    rects.push(new Rect(3 * finger_width, 3 * finger_offset + 2.5 * finger_length - 2, finger_width, 3 * finger_length))

    for (let i = 0; i < rects.length; i++) {
        let r = rects[i];
        // if(i!=1 && i!=3 && i!=7)
        r.show();
    }

    push();
    rotate(Math.atan((3 * finger_offset) / (4 * finger_width)));
    let base_deriv_width = 15,
        base_deriv_height = 50;
    rect(0, 4, 4 * finger_width, 100)
    quad(0, 4,
            4 * finger_width, 4,
            4 * finger_width + base_deriv_width, base_deriv_height, -base_deriv_width, base_deriv_height
        )
        // fill('#00ff00')
    quad(-base_deriv_width, base_deriv_height,
        4 * finger_width + base_deriv_width, base_deriv_height,
        4 * finger_width - 5, 2.2 * base_deriv_height + 17,
        0, 2.2 * base_deriv_height + 4
    )
    push();
    translate(4 * finger_width + base_deriv_width, base_deriv_height);
    rotate(radians(30));
    rect(0, 0, -finger_width, 2.2 * finger_length)
    rect(-finger_width, 2.2 * finger_length, finger_width, 1.8 * finger_length)
    pop();
    pop();
    rect(15, 2 * base_deriv_height + 15, 97, 100)
}