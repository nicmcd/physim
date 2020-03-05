function Simulation(canvas, ctx) {
  this.ctx = ctx;

  this.ball = new Object();
  this.ball.radius = 100;
  this.ball.xpos = 500;
  this.ball.ypos = 500;
  this.ball.xvel = 0; // pixels / second
  this.ball.yvel = 0; // pixels / second
  this.ball.acc  = 1000; // pixels / second^2
  this.ball.xacc = 0; // pixels / second^2
  this.ball.yacc = 0; // pixels / second^2

  this.xmouse = 0;
  this.ymouse = 0;

  var obj = this;
  canvas.addEventListener("mousemove", function(event){
    obj.setMousePos(event.clientX, event.clientY);
  });
}

Simulation.prototype.setMousePos = function(xMouse, yMouse) {
  this.xmouse = xMouse;
  this.ymouse = yMouse;
}

Simulation.prototype.compute = function(delta, width, height) {

  // determine acceleration
  var adjacent = this.xmouse - this.ball.xpos;
  var opposite = this.ymouse - this.ball.ypos;
  var angle    = Math.atan2(adjacent, opposite);
  this.ball.xacc = this.ball.acc * Math.sin(angle);
  this.ball.yacc = this.ball.acc * Math.cos(angle);

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
