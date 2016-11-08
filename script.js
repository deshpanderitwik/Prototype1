var systems = [];

var moveX = [];
var moveY = [];

var rArray = [];
var gArray = [];
var bArray = [];

var c, cSharp, d;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for (i=0, j=(width/12)/2; i < 12; i++, j = j + width/12) {
    systems[i] = new ParticleSystem(createVector(j, height/2 + 200));
  }
}

function draw() {
  background(0);

  for (i=0, j=(width/12)/2; i < systems.length; i++, j = j + width/12) {
    moveX[i] = j;
    moveY[i] = height/2 + 200;

    rArray[i] = 255;
    gArray[i] = 255;
    bArray[i] = 255;

    if(c == true){
      moveY[0] = height/2;
    }

    if(cSharp == true) {
      moveY[1] = height/2;
    }

    if(d == true) {
      moveY[2] = height/2;
    }

    if(c == true && cSharp == true){
      moveX[0] = - 200;
      moveX[1] = width/12 * 4;
      rArray[0] = 231;
      rArray[1] = 231;
      gArray[0] = 76;
      gArray[1] = 76;
      bArray[0] = 60;
      bArray[1] = 60;
    }

    if(c == true && d == true){
      moveX[0] = width/12 * 2;
      moveX[2] = width/12 * 2;
      rArray[0] = 46;
      rArray[2] = 46;
      gArray[0] = 204;
      gArray[2] = 204;
      bArray[0] = 113;
      bArray[2] = 113;
    }

    systems[i].addParticle();
    systems[i].run(moveX[i], moveY[i], rArray[i], gArray[i], bArray[i]);
  }
}

// Particle
var Particle = function(location) {
  this.location = location.copy();
  this.velocity = createVector(random(-5, 5), random(-5, 0));
  this.acceleration = createVector(0,0);
  this.lifespan = 255.0;
  this.lifespanInvert = 0;
};

Particle.prototype.run = function(moveX, moveY, rVal, gVal, bVal) {
  this.update(moveX, moveY);
  this.display(rVal, gVal, bVal);
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

Particle.prototype.display = function(rVal, gVal, bVal) {
  noStroke();
  fill(rVal, gVal, bVal, this.lifespan);
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

ParticleSystem.prototype.run = function(moveX, moveY, rVal, gVal, bVal) {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run(moveX, moveY, rVal, gVal, bVal);
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

keyboardJS.bind('s', function(e) {
  d = true;
}, function(e) {
  d = false;
});