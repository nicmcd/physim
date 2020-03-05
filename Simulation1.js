function Simulation(canvas, ctx) {
  this.ctx = ctx;

  this.ball = new Object();
  this.ball.radius = 100;
  this.ball.xpos = 100;
  this.ball.ypos = 100;
  this.ball.xvel = 1000; // pixels / second
  this.ball.yvel = 700; // pixels / second
}

Simulation.prototype.compute = function(delta, width, height) {

  this.ball.xpos = Math.round(this.ball.xpos + this.ball.xvel * delta);
  this.ball.ypos = Math.round(this.ball.ypos + this.ball.yvel * delta);

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
