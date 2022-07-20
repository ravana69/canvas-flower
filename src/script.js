(function(){

  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame;

  var canvas = document.querySelector("canvas");
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight;
  var ctx = canvas.getContext("2d");
  ctx.globalCompositeOperation = "source-over";
  var particles = [];
  var pIndex = 0;
  var total = 1, x, y, frameId;

  function Dot(){
    this.x = canvas.width/2;
    this.y = canvas.height/2;;
    this.vx = 30;
    this.vy = 30;
    particles[pIndex] = this;
    this.id = pIndex;
    pIndex++;
    this.life = 0;
    this.radius = 1;
    this.maxlife = 10000;
  };

  Dot.prototype.draw = function(x, y){
    this.vx *= 1.01;
    this.vy *= 1.01;
    this.x += this.vx*Math.sin(this.life)*0.1;
    this.y += this.vy*Math.cos(this.life)*0.1;
    this.radius = this.vx*0.01;
    ctx.fillStyle = "#ffd900";
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.fillRect(this.x, this.y, this.radius,this.radius)
    ctx.fill();
    this.life++;
    if(this.life >= this.maxlife){
      delete particles[this.id];
    }
  }

  window.addEventListener("resize", function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    x = canvas.width / 2;
    y = canvas.height / 2;
  });

  function loop(){
    ctx.fillStyle = "rgba(0, 0, 0, .1)";
    ctx.fillRect(0,0, canvas.width, canvas.height);
    for(var i=0; i<total; i++){
      new Dot();
    }
    for(var i in particles){
      particles[i].draw();
    }
    frameId = requestAnimationFrame(loop);
  }

  loop();

  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

})();
