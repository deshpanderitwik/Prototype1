var systems = [];
var hammer1X;
var hammer1Y;
var hammer2X;
var hammer2Y;
var c, cSharp;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for (i=0, j=(width/12)/2; i < 12; i++, j = j + width/12) {
    systems[i] = new ParticleSystem(createVector(j, height/2 + 200));
  }

  console.log(systems[1].particles);
}

function draw() {
  background(0);

  if (c == true) {
    hammer1X = (width/12)/2;
    hammer1Y = height/2 + 200;
    fill(255);
  } else {
    hammer1X = 0;
    hammer1Y = 0;
  }

  if (cSharp == true) {
    hammer2X = (width/12)/2 + width/12;
    hammer2Y = height/2 + 200;
    fill(255);
  } else {
    hammer2X = 0;
    hammer2Y = 0;
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
  this.hit1 = false;
  this.hit2 = false;
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
  this.hit1 = collideCircleCircle(hammer1X, hammer1Y, 40, this.location.x, this.location.y, 10, 10);
  this.hit2 = collideCircleCircle(hammer2X, hammer2Y, 40, this.location.x, this.location.y, 10, 10);
};

Particle.prototype.jump = function() {
  if(this.hit1 == true || this.hit2 == true) {
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