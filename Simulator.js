function Simulator(canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.ctx = this.canvas.getContext("2d");

  // simulation stimulus
  this.sim = new Simulation(this.canvas, this.ctx);

  // saved previous time value
  this.prevTime = undefined;

  // compute FPS
  this.rateSamples = new Array(120);
  this.rateSamplesPos = 0;
  for (var i=0; i<this.rateSamples.length; i++) {
    this.rateSamples[i] = 0;
  }
  this.averageRate = 0;

  // show FPS
  this.showFps = false;
  var obj = this;
  window.addEventListener("keydown", function(event){
    if (event.keyCode == 70) { // f
      obj.toggleFps();
    }
  });
}

Simulator.prototype.toggleFps = function() {
  this.showFps = !this.showFps;
}

Simulator.prototype.setSize = function(width, height) {
  this.canvas.width = width;
  this.canvas.height = height;
}

Simulator.prototype.start = function() {
  window.requestAnimationFrame(this.animate.bind(this));
}

Simulator.prototype.animate = function() {

  ///////////////////////////////////////////////////////
  // Compute next location
  ///////////////////////////////////////////////////////

  var w = this.canvas.offsetWidth;
  var h = this.canvas.offsetHeight;

  var curTime = Date.now() / 1000.0; // seconds

  if (this.prevTime != undefined) {
    var delta = curTime - this.prevTime; // seconds

    // run the simulation computation
    this.sim.compute(delta, w, h);

    // add the new sample
    this.rateSamples[this.rateSamplesPos++] = delta;
    if (this.rateSamplesPos == this.rateSamples.length) {
      // reset pos
      this.rateSamplesPos = 0;
    }

    // determine when to update the average rate display value
    if (this.rateSamplesPos % 10 == 0) {
      // compute average
      this.averageRate = 0;
      for (var i=0; i<this.rateSamples.length; i++) {
        this.averageRate += this.rateSamples[i];
      }
      this.averageRate /= this.rateSamples.length;
      this.averageRate = Math.round(1 / this.averageRate);
    }
  }
  this.prevTime = curTime;


  ///////////////////////////////////////////////////////
  // Render
  ///////////////////////////////////////////////////////

  // background
  this.ctx.fillStyle = "black";
  this.ctx.fillRect(0,0,w,h);

  // render the simulation
  this.sim.render(this.ctx);

  // optionally show statistics
  if (this.showFps) {
    this.ctx.font = "30px Arial";
    this.ctx.fillStyle = "yellow";
    this.ctx.fillText(this.averageRate + " fps", 30, 50);
    var stats = this.sim.statistics();
    for (var i=0; i<stats.length; i++) {
      this.ctx.fillText(stats[i], 30, 50+((i+1)*30));
    }
  }

  ///////////////////////////////////////////////////////
  // Request the next animation event
  ///////////////////////////////////////////////////////

  window.requestAnimationFrame(this.animate.bind(this));
}
