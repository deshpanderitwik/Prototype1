var particle;
var system;

function setup() {
  createCanvas(windowWidth, windowHeight);
  particle = new Particle();
}

function draw() {
  particle.update();
  particle.display();
}

var Particle = function() {
  this.location = createVector(width/2, height/2);
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);
};

Particle.prototype.update = function() {
  this.pointer = createVector(width/2, height/2 + 20);
  
  this.direction = p5.Vector.sub(this.pointer, this.location);
  this.direction.normalize();
  this.direction.mult(0.05);

  this.acceleration = this.direction;

  this.velocity.add(this.acceleration);
  this.location.add(this.velocity);
};

Particle.prototype.display = function() {
  ellipse(this.location.x, this.location.y,20,20);
};