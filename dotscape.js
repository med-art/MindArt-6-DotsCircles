let dots = [];
let tempwinMouseX = 0;
let tempwinMouseY = 0;
let tempwinMouseX2 = 0;
let tempwinMouseY2 = 0;
let lineLayer, permaLine;
let dotSize = 4;
let dotQty = 20;
let ringQty = 0;
let hueDrift, brightDrift, satDrift;
let throughDotCount = 0;
let longEdge, shortEdge, circleRad, lmax, wmax, hmax;
let primaryArray = [360, 60, 240];
let colHue = 360,
  colSat = 100,
  colBri = 100;
let stage = 0;
let dotsCount = 0;
let hueCapture = 0;
let verifyX = 0;
let verifyY = 0;
let tintedBG;

let rMultiplier = 1;

let introState = 1;

let stage1array = [
  [1, 1, 4, 1, 1, 3, 4, 3, 1, 5, 4, 5, 1, 7, 4, 7],
  [1, 1, 2, 1, 3, 1, 4, 1, 1, 3, 4, 3, 1, 5, 4, 5, 1, 7, 2, 7, 3, 7, 4, 7],
  [1, 1, 3, 1, 2, 2, 4, 2, 1, 3, 3, 3, 2, 4, 4, 4, 1, 5, 3, 5, 2, 6, 4, 6, 1, 7, 3, 7, 2, 8, 4, 8]
];

function preload() {
  bg = loadImage('assets/paper.jpg');
  audio = loadSound('assets/audio.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1); // Ignores retina displays
  lineLayer = createGraphics(width, height);
  permaLine = createGraphics(width, height);
  tintedBG = createGraphics(width, height);
  colorMode(HSB, 360, 100, 100, 100);
  lineLayer.colorMode(HSB, 360, 100, 100, 100);
  permaLine.colorMode(HSB, 360, 100, 100, 100);
  dimensionCalc();
  showIntro();
}

function dimensionCalc() {
  wmax = width / 100;
  hmax = height / 100;
  if (width > height) {
    longEdge = width;
    shortEdge = height;
    circleRad = shortEdge * 0.45;
    lmax = width / 100;
  } else {
    longEdge = height;
    shortEdge = width;
    lmax = height / 100;
    circleRad = shortEdge * 0.45;
  }
}

function stage0grid() {


  dotsCount = 0;
  dots = [];

  let w = width / 5;
  let h = height / 9;
  let r = longEdge / 50;

  dotQtyX = 1;
  dotQtyY = stage1array[stage].length / 2;



  for (let i = 0; i < stage1array[stage].length; i += 2) {
    dots[dotsCount++] = new Dot(stage1array[stage][i] * w, stage1array[stage][i + 1] * h, r);
  }
}

function stage1grid(){

dotsCount = 0;
dots = [];

    if (stage === 3) {

      dotQtyX = 7;
      dotQtyY = 9;
      r = longEdge/30;
      let spaceX = width/dotQtyX+1;
      let spaceY = height/dotQtyY+1;

      for (let i = 0; i < dotQtyX; i++) {
          for (let j = 0; j < dotQtyY; j++) {
          dots[dotsCount++] = new Dot((i+1)*(spaceX), (j+1)*(spaceY), 12);
        }
      }
    }

  else if (stage === 4) {
      dotQtyX = 2;
      dotQtyY = 5*4;
      r = longEdge/30;
      let spaceX = width/dotQtyX+1;
      let spaceY = height/dotQtyY+1;

      for (let i = 0; i < dotQtyX; i++) {
          for (let j = 0; j < dotQtyY; j+=4) {
          dots[dotsCount++] = new Dot(((i+0.5)*(spaceX))-(spaceX/6), (j+0.5)*(spaceY), 11);
          dots[dotsCount++] = new Dot(((i+0.5)*(spaceX))+(spaceX/6), (j+0.5)*(spaceY), 11);
          dots[dotsCount++] = new Dot(((i+0.5)*(spaceX))-(spaceX/3), (j+0.5)*(spaceY)+(spaceY*2), 11);
          dots[dotsCount++] = new Dot(((i+0.5)*(spaceX))+((spaceX/6)*2), (j+0.5)*(spaceY)+(spaceY*2), 11);
        }
      }
    }

    else if (stage === 5) {
      dotQtyX = 4;
      dotQtyY = 13*4;
      r = longEdge/30;
      let spaceX = width/dotQtyX+1;
      let spaceY = height/dotQtyY+1;

      for (let i = 0; i < dotQtyX; i++) {
          for (let j = 0; j < dotQtyY; j+=4) {
          dots[dotsCount++] = new Dot(((i+0.5)*(spaceX))-(spaceX/6), (j+0.5)*(spaceY), 8);
          dots[dotsCount++] = new Dot(((i+0.5)*(spaceX))+(spaceX/6), (j+0.5)*(spaceY), 8);
          dots[dotsCount++] = new Dot(((i+0.5)*(spaceX))-(spaceX/3), (j+0.5)*(spaceY)+(spaceY*2), 8);
          dots[dotsCount++] = new Dot(((i+0.5)*(spaceX))+((spaceX/6)*2), (j+0.5)*(spaceY)+(spaceY*2), 8);
        }
      }
    }
}

function stage2grid() {
  let r = longEdge / 100;
  ringQty = 1;
  dotsCount = 0;


  if (stage === 6) {
    dotQty = 7;
  }
  if (stage === 7) {
    dotQty = 10;
  }

  for (let i = 0; i < ringQty; i++) {
    for (let j = 0; j < dotQty; j++) {
      let rotateVal = j * (360 / dotQty);
      let tran = (circleRad / ringQty) * (i + 1);
      let tempX = (tran * cos(radians(rotateVal))) + width / 2;
      let tempY = (tran * sin(radians(rotateVal))) + height / 2;
      dots[dotsCount++] = new Dot(tempX, tempY, r);
    }

  }
}

function stage3grid() {
  let r = longEdge / 100;
  dotsCount = 0;

  if (stage === 8) {
    dotQty = 7;
    ringQty = 3;
    r = longEdge / 150;
  }

  for (let i = 0; i < ringQty; i++) {
    for (let j = 0; j < dotQty + (i * 3); j++) {

      let rotateVal = j * (360 / (dotQty + (i * 3)));
      let tran = (circleRad / ringQty) * (i + 1);

      let tempX = (tran * cos(radians(rotateVal))) + width / 2;
      let tempY = (tran * sin(radians(rotateVal))) + height / 2;

      r = r - (r / 100);

      //console.log(rotateVal);

      //  lineLayer.circle(tempX, tempY, r-(i*lmax));

      dots[dotsCount++] = new Dot(tempX, tempY, r);

    }
  }


}


function stage4grid() {
  // at these are basic arrangements of grids
  let r = longEdge / 100;
  let gap;
  let remainder;

  dotsCount = 0;

  if (stage === 9) {
    dotQty = 50;
    r = longEdge / 180;
    gap = circleRad * 0.9;
    remainder = circleRad - gap;

  }

  if (stage === 10) {
    dotQty = 100;
    r = longEdge / 200;
    gap = circleRad * 0.7;
    remainder = circleRad - gap;

  }

  for (let i = 0; i < dotQty; i++) {
    let rotateVal = i * 137.5;
    let tran = (((gap) / dotQty) * (i + 1)) + remainder;

    let tempX = (tran * cos(radians(rotateVal))) + width / 2;
    let tempY = (tran * sin(radians(rotateVal))) + height / 2;

    r = r + ((i / 40000) * lmax);



    //  lineLayer.circle(tempX, tempY, r-(i*lmax));

    dots[dotsCount++] = new Dot(tempX, tempY, r);


  }


}

function stage5grid() {

  // at these are basic arrangements of grids
  let r = longEdge / 100;

  dotsCount = 0;

  if (stage === 11) {
    dotQty = 1000;
    r = longEdge / 750;
    circleRad = circleRad * 2;


  }

  for (let i = 0; i < dotQty; i++) {
    let rotateVal = i * 137.5;
    let tran = (((circleRad * 0.8) / dotQty) * (i + 1)) + circleRad * 0.2;

    let tempX = (tran * cos(radians(rotateVal))) + width / 2;
    let tempY = (tran * sin(radians(rotateVal))) + height / 2;

    r = r + r / 1000;
    let tempRad = random(r * 0.5, r * 2.5)



    //  lineLayer.circle(tempX, tempY, r-(i*lmax));

    dots[dotsCount++] = new Dot(tempX, tempY, tempRad);


  }



}

function stage6grid(){

dotsCount = 0;

  if (stage === 12){
    x = 7;
    y = 7;
    noiseAmp = 8;
    dotSize = 5;
  //  colToggleUI();
  }

  else if (stage === 14){
    writeRestartUI();
  }


    dotQtyX = x;
    dotQtyY = y;
    spaceX = width / (dotQtyX + 2);
    spaceY = height / (dotQtyY + 2);

    for (let i = 0; i < dotQtyX; i++) {
        for (let j = 0; j < dotQtyY; j++) {
        let noiseX = int((random(-width, width) * noiseAmp) / 150);
        let noiseY = int((random(-height, height) * noiseAmp) / 150);
        let r = random((lmax*(dotSize/10)), (lmax*(dotSize/10)) * 2);
        dots[dotsCount++] = new Dot(noiseX + (spaceX * 1.5) + (spaceX * i), noiseY + (spaceY * 1.5) + (spaceY * j), r);
      }

    }
    noiseAmp+=10;
    x+=5;
    y+=5;
    dotSize--;


}


function nextGrid() {
  permaLine.clear();

  if (stage < 3) {
    stage0grid();
  } else if  (stage >= 3 && stage < 6){
    stage1grid();
  } else if (stage >= 6 && stage < 8) {
    stage2grid();
  } else if (stage >= 8 && stage < 9) {
    stage3grid();
  } else if (stage >= 9 && stage < 11) {
    stage4grid();
  } else if (stage >= 11 && stage < 12) {
    stage5grid();
  } else if (stage >= 12 && stage < 15){
    stage6grid();
  }

  tintedBG.tint(255-(20*stage));
  tintedBG.image(bg, 0, 0, width, height);

  stage++;
}

function draw() {

  if (introState === 0) {
    image(tintedBG, 0, 0, width, height);
    image(lineLayer, 0, 0);
    image(permaLine, 0, 0);
    for (let i = 0; i < dotsCount; i++) {
      dots[i].show();
    }
  }

}

function touchStarted() {

  if (introState === 1 && textStroke === 10) {
    exitIntro();
    audio.loop();
  } else {
    for (let i = 0; i < dotsCount; i++) {
      dots[i].getCol(winMouseX, winMouseY);
    }


  }
}


function touchMoved() {

  for (let i = 0; i < dotsCount; i++) {
    dots[i].clicked(winMouseX, winMouseY);
  }
  hueDrift = int(random(-2, 2));
  satDrift = int(random(-2, 2));
  brightDrift = int(random(-2, 2));
  lineLayer.stroke(colHue + hueDrift, colSat + satDrift, colBri + brightDrift, 80);
  lineLayer.strokeWeight(5);
  lineLayer.clear();
  if (throughDotCount > 0) {
    lineLayer.line(tempwinMouseX, tempwinMouseY, winMouseX, winMouseY);
  }
  return false;
}

function copyLine() {
  permaLine.stroke(colHue + hueDrift, colSat + hueDrift, colBri + brightDrift, 80);
  permaLine.strokeWeight(6);
  if (throughDotCount > 1) {
    permaLine.line(tempwinMouseX, tempwinMouseY, tempwinMouseX2, tempwinMouseY2);
  }
}

function touchEnded() {
  lineLayer.clear();
  throughDotCount = 0;

}

class Dot {
  constructor(x, y, r) {

    this.x = x;
    this.y = y;
    this.r = r;

    this.brightness = 150;
    this.h = primaryArray[int(random(0, 3))];
    this.s = 0;
    this.b = random(45, 195);
  }

  show() {

    noStroke();
    fill(this.h, this.s, this.b * 0.9, 100);
    ellipse(this.x, this.y, this.r * 3);
    fill(this.h, this.s, this.b * 0.8, 100);
    ellipse(this.x, this.y, this.r * 2.5);
    fill(this.h, this.s, this.b * 0.7, 100);
    ellipse(this.x, this.y, this.r * 2);
  }

  getCol(x, y) {
    let d = dist(x, y, this.x, this.y);
    if (d < this.r * 4 && (this.x != verifyX || this.y != verifyY)) {

      colHue = this.h;
      this.s = 255;
    }
  }

  clicked(x, y) {

    let d = dist(x, y, this.x, this.y);

    if (throughDotCount === 0){
      rMultiplier = 4; // increase radius for first grab
    }
    else {
      rMultiplier = 1;
    }

    if (d < this.r * 2.05 * rMultiplier && (this.x != verifyX || this.y != verifyY)) {
      verifyX = this.x;
      verifyY = this.y;
      tempwinMouseX2 = tempwinMouseX;
      tempwinMouseY2 = tempwinMouseY;
      tempwinMouseX = this.x;
      tempwinMouseY = this.y;
      throughDotCount++;
      this.brightness = 250;
      if (colHue != this.h) {
        if (abs(colHue - this.h) > 280) {
          this.h = (((this.h + colHue) / 2) - 180) % 360;;
        } else {
          this.h = ((this.h + colHue) / 2) % 360;;
        }
      }
      colHue = this.h;
      this.s = colSat;
      this.b = colBri;
      copyLine();
    }
  }
}
