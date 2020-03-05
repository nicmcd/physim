function Simulation(canvas, ctx) {
  this.ctx = ctx;

  this.ball = new Object();
  this.ball.radius = 100;
  this.ball.xpos = 500;
  this.ball.ypos = 100;
  this.ball.xvel = 100; // pixels / second
  this.ball.yvel = 0; // pixels / second
  this.ball.xacc = 0;//1000; // pixels / second^2
  this.ball.yacc = 1000; // pixels / second^2
}

Simulation.prototype.compute = function(delta, width, height) {

  // next velocity
  this.ball.xvel = this.ball.xvel + this.ball.xacc * delta;
  this.ball.yvel = this.ball.yvel + this.ball.yacc * delta;

  // next position
  this.ball.xpos = this.ball.xpos + this.ball.xvel * delta;
  this.ball.ypos = this.ball.ypos + this.ball.yvel * delta;

  if (this.ball.xpos > (width - this.ball.radius)) {
    this.ball.xpos = width - this.ball.radius;
    this.ball.xvel *= -1;
  }
  else if (this.ball.xpos < this.ball.radius) {
    this.ball.xpos = this.ball.radius;
    this.ball.xvel *= -1;
  }

  if (this.ball.ypos > (height - this.ball.radius)) {
    this.ball.ypos = height - this.ball.radius;
    this.ball.yvel *= -1;
  }
  else if (this.ball.ypos < this.ball.radius) {
    this.ball.ypos = this.ball.radius;
    this.ball.yvel *= -1;
  }

}

Simulation.prototype.render = function() {
  this.ctx.beginPath();
  this.ctx.arc(this.ball.xpos,
               this.ball.ypos,
               this.ball.radius,
               2*Math.PI,
               false);
  this.ctx.fillStyle = "red";
  this.ctx.fill();
}

Simulation.prototype.statistics = function() {
  return ["X="+Math.round(this.ball.xpos),
          "Y="+Math.round(this.ball.ypos)];
}
