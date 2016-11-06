var system;
var systems = [];
var value;

function setup() {
	createCanvas(windowWidth, windowHeight);
	
  for (i=0, j=(width/9)/2; i < 9; i++, j = j + width/9) {
    systems[i] = new ParticleSystem(createVector(j, height/2));
    console.log(j);
  }
}

function draw() {
  background(0);
  // system.addParticle();
  // system.run();

  for (i=0; i < systems.length; i++) {
    systems[i].addParticle();
    systems[i].run();
  }

  if (keyIsPressed && key == 'a')
    value = 200;
  else
    value = height/2;
}

var Particle = function(location) {
	this.location = location.copy();
	this.velocity = createVector(random(-1, 1), random(-1, 0));
	this.acceleration = createVector(0,0);
  this.lifespan = 255.0;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

Particle.prototype.update = function() {

	this.pointer = createVector(this.location.x, value);

	this.direction = p5.Vector.sub(this.pointer, this.location);
	this.direction.normalize();
	this.direction.mult(0.5);

	this.acceleration = this.direction;

	this.velocity.add(this.acceleration);
	this.location.add(this.velocity);

  this.lifespan -= 2;
};

Particle.prototype.display = function() {
  noStroke();
  fill(100, 200, this.lifespan, this.lifespan);
	ellipse(this.location.x, this.location.y,10,10);
};

Particle.prototype.isDead = function(){
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 20);
    }
  }
};