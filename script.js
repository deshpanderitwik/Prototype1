var systems = [];
var moveX = [];
var moveY = [];
var c, cSharp;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for (i=0, j=(width/12)/2; i < 12; i++, j = j + width/12) {
    systems[i] = new ParticleSystem(createVector(j, height/2 + 200));
  }
}

function draw() {
  background(0);

  for (i=0, j=(width/12)/2; i < 12; i++, j = j + width/12) {
    moveX[i] = j;
    moveY[i] = height/2 + 200;
  }

  for (i=0, j=(width/12)/2; i < systems.length; i++, j = j + width/12) {
    systems[i].addParticle();
    systems[i].run(moveX[i], moveY[i]);

    if(mouseIsPressed){
      moveX[1] = width/2;
      moveY[1] = height/2;
    }
  }
}

// Particle
var Particle = function(location) {
  this.location = location.copy();
  this.velocity = createVector(random(-2, 2), random(-2, 0));
  this.acceleration = createVector(0,0);
  this.lifespan = 255.0;
  this.lifespanInvert = 0;
};

Particle.prototype.run = function(moveX, moveY) {
  this.update(moveX, moveY);
  this.display();
};

Particle.prototype.update = function(moveX, moveY) {
  this.pointer = createVector(moveX, moveY)
  
  this.direction = p5.Vector.sub(this.pointer, this.location);
  this.direction.normalize();
  this.direction.mult(0.5);

  this.acceleration = this.direction;

  this.velocity.add(this.acceleration);
  this.location.add(this.velocity);

  this.lifespan -= 2;
  this.lifespanInvert += 2;
};

Particle.prototype.display = function() {
  noStroke();
  fill(this.location.x/4, 200, this.lifespan, this.lifespan);
  ellipse(this.location.x, this.location.y,this.lifespanInvert/6,this.lifespanInvert/6);
};

Particle.prototype.isDead = function(){
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

// Particle System
var ParticleSystem = function(location) {
  this.origin = location.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin, this.pointer));
};

ParticleSystem.prototype.run = function(moveX, moveY) {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run(moveX, moveY);
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};

// Keyboard Bindings
keyboardJS.bind('a', function(e) {
  c = true;
}, function(e) {
  c = false;
});

keyboardJS.bind('w', function(e) {
  cSharp = true;
}, function(e) {
  cSharp = false;
});