let wavelength;
let wave1;
let wave2;
let spacing;
let spacingSlider;
let wavelengthSlider;
let protractor;

function setup() {
  createCanvas(500, 700);
  wavelength = 20;
  spacingSlider = createSlider(0, 10, 1, 0.5);
  spacing = spacingSlider.value();
  wave1 = new Wave(width / 2 - spacing / 2, height / 2);
  wave2 = new Wave(width / 2 + spacing / 2, height / 2);
  protractor = new Protractor(1, 1);
}

function draw() {
  stroke(0);
  strokeWeight(3);
  spacing = spacingSlider.value();
  background(220);
  noFill();
  wave1.x = (width - spacing * wavelength) / 2;
  wave2.x = (width + spacing * wavelength) / 2;
  wave1.display();
  wave2.display();
  protractor.display(mouseX, mouseY);
  text("Separation: "+spacingSlider.value()*2 +" wavelengths", 10, height-20);
}

class Wave {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {
    for (let i = 0; i < 27; i++) {
      circle(this.x, this.y, wavelength * i);
    }
  }
}

class Protractor {
  constructor(px, py) {
    this.radius = 10;
    this.measure = createVector(this.radius * px, this.radius * py);
    this.otherMeasure = createVector(this.radius * px, this.radius * py)
    this.dragging = false;
  }
  display(px, py) {
     strokeWeight(1);
    stroke(200, 0, 0);
    push();
    translate(width / 2, height / 2);
    scale(1, -1);
    line(0, 0, 0, height / 2);
    if (this.dragging) {
      line(0, 0, px - width / 2, height / 2 - py);
      circle(px - width / 2, height / 2 - py, 10);
      this.otherMeasure.x = px - width / 2;
      this.otherMeasure.y = height / 2 - py;
      this.measure.x = px ;
      this.measure.y = py;
    } else {
      line(0, 0, this.measure.x - width / 2, height / 2 - this.measure.y);
      circle(this.measure.x - width / 2, height / 2 - this.measure.y, 10);
    }
    pop();
    noStroke();
    fill(0);
    textSize(20);
    text("Degrees: "+
      abs(
        90-round(
          degrees(this.otherMeasure.heading()),0)),
      
      width - 130, 20);
    text("Radians: "+
      round(abs(PI/2-this.otherMeasure.heading()),2),
      
      width - 130, 40);
  }

  pressed(px, py) {
    if (
      px > this.measure.x - 15 &&
      px < this.measure.x + 15 &&
      py > this.measure.y - 15 &&
      py < this.measure.y + 15
    ) {
      this.dragging = true;
      this.measure.x = -px;
      this.measure.y = -height / 2 + py;
    }
  }

  notPressed(px, py) {
    this.dragging = false;

  }
}

function mousePressed() {
  protractor.pressed(mouseX, mouseY);
}

function mouseReleased() {
  protractor.notPressed();
}
