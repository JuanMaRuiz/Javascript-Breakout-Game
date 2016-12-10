(function(){
  'use strict';

  var canvas = document.getElementById('myCanvas');
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  var ctx = canvas.getContext('2d');

  var colors = {
    green: '#5B8930',
    red: '#9D2933'
  }

  setInterval(draw, 10);

  function draw() {
    ctx.beginPath();
    ctx.arc(50, 50, 10, 0, Math.PI *2);
    ctx.fillStyle = colors.green;
    ctx.fill();
    ctx.closePath();
  }

  console.log("canvas.width: ", canvas.width);
  console.log("canvas.height: ", canvas.height);
})();