var systems = [];
var hammerX;
var hammerY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for (i=0, j=(width/9)/2; i < 9; i++, j = j + width/9) {
    systems[i] = new ParticleSystem(createVector(j, height/2 + 200));
  }
}

function draw() {
  background(0);

  console.log(mouseX, mouseY);

  if (keyIsPressed && key == 'a') {
    hammerX = 67;
    hammerY = 509;
    fill(255);
    ellipse(hammerX, hammerY, 40, 40);
  } else {
    hammerX = 0;
    hammerY = 0;
  }

  for (i=0; i < systems.length; i++) {
    systems[i].addParticle();
    systems[i].run();
  }
}

// Particle
var Particle = function(location) {
  this.location = location.copy();
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.acceleration = createVector(0,0);
  this.lifespan = 255.0;
  this.moveX;
  this.moveY;
  this.hit = false;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
  this.checkCollision();
  this.jump();
};

Particle.prototype.update = function() {
  this.pointer = createVector(this.moveX, this.moveY);
  
  this.direction = p5.Vector.sub(this.pointer, this.location);
  this.direction.normalize();
  this.direction.mult(0.5);

  this.acceleration = this.direction;

  this.velocity.add(this.acceleration);
  this.location.add(this.velocity);

  this.lifespan -= 2;
};

Particle.prototype.checkCollision = function() {
  this.hit = collideCircleCircle(hammerX, hammerY, 40, this.location.x, this.location.y, 10, 10);
};

Particle.prototype.jump = function() {
  if(this.hit == true) {
    this.moveX = width/2;
    this.moveY = height/2;
  } else {
    this.moveX = this.location.x;
    this.moveY = this.location.y;
  }
}

Particle.prototype.display = function() {
  noStroke();
  fill(this.location.x/4, 200, this.lifespan, this.lifespan);
  ellipse(this.location.x, this.location.y,20,20);
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

// Collision Detection
p5.prototype.collideCircleCircle = function (x, y,d, x2, y2, d2) {
  if( dist(x,y,x2,y2) <= (d/2)+(d2/2) ){
    return true;
  }
  return false;
};