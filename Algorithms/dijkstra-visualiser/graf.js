class Dot {
  constructor(x, y, nrOrdine) {
    this.x = x;
    this.y = y;
    this.r = 30;
    this.nrOrdine = nrOrdine;
    this.re = 255;
    this.ge = 255;
    this.be = 255;
  }
  show() {
    fill(this.re, this.ge, this.be);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.r);
    fill(255);
  }
  changeColorToRed() {
    this.re = 255;
    this.ge = 0;
    this.be = 0;
  }
  isRed() {
    if (this.re == 255 && this.ge == 0 && this.be == 0) return 1;
  }
  changeColorToWhite() {
    this.re = 255;
    this.be = 255;
    this.ge = 255;
  }
  changeStatusToActive() {
    //galben
    this.re = 255;
    this.ge = 249;
    this.be = 140;
  }
  changeStatusToPassed() {
    //rosiatic
    this.re = 203
    this.ge = 59
    this.be = 59
  }
  changeStatusToStart() {
    //galben
    this.re = 224
    this.ge = 196
    this.be = 92
  }
  changeStatusToEnd() {
    //visiniu
    this.re = 133
    this.ge = 32
    this.be = 59
  }
}

class Muchie {
  constructor(dot1, dot2) {
    this.dot1 = dot1;
    this.dot2 = dot2;
    this.colorIntrare='#071e3d';
    this.colorIesire='#21e6c1';
  }
  show() {
    let mx = (this.dot1.x + this.dot2.x) / 2;
    let my = (this.dot1.y + this.dot2.y) / 2;
    stroke(this.colorIntrare);
    line(this.dot1.x, this.dot1.y, mx, my);
    stroke(this.colorIesire);
    line(mx, my, this.dot2.x, this.dot2.y);

  }
  changeStatusToPath(){
  this.colorIesire=this.colorIntrare='#f85959';
  }
  changeStatusToNormal(){
      this.colorIntrare='#071e3d';
    this.colorIesire='#21e6c1';
  }
}

class Cost {
  constructor(dot1, dot2) {
    this.dot1 = dot1;
    this.dot2 = dot2;
    this.string = int(random(100)).toString();
    //this.string='INF';
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
  }
  show() {
    fill(125);
    let mx = (this.dot1.x + this.dot2.x) / 2;
    let my = (this.dot1.y + this.dot2.y) / 2;
    let bbox = font.textBounds(this.string, mx, my);
    let masur = 12;
    let masur2 = 5;
    //let maiSus=15;
    let maiSus = 0;
    rect(bbox.x - masur, bbox.y - masur2 - maiSus, bbox.w + masur * 2, bbox.h + 2 * masur2);
    this.x = bbox.x - masur;
    this.y = bbox.y - masur2 - maiSus;
    this.w = bbox.w + masur * 2;
    this.h = bbox.h + masur2;
    textFont(font);
    fill(255);
    textAlign(CENTER);
    if (abs(int(this.dot1.x - this.dot2.x) <= int(bbox.w)))
      text(this.string, mx, my - maiSus);
    else if (this.dot1.x < this.dot2.x) text(this.string, this.dot1.x, my - maiSus, this.dot2.x - this.dot1.x);
    else text(this.string, this.dot2.x, my - maiSus, this.dot1.x - this.dot2.x);
  }
}

class Distance {
  constructor(x, y, w, h, str) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    if(str!=Number.MAX_SAFE_INTEGER)this.str = 'distanta minima este: ' + str.toString();
    else this.str='distanta minima este: INF';
    
  }
  show() {
    fill('#0e153a');
    strokeWeight(2);
    stroke(51);
    rect(this.x, this.y, this.w, this.h + 5);
    noStroke();
    fill('#e8ffe8');
    textAlign(CENTER, CENTER);
    text(this.str, this.x + 5, this.y, this.w - 5, this.h);
  }

}