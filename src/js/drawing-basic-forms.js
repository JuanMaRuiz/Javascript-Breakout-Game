(function() {
  'use strict';
  var canvas = document.getElementById('myCanvas');
  // getContext() Allow to draw in the canvas
  var ctx = canvas.getContext('2d');

  // Creating a red square
  ctx.beginPath();
  /**
   * @param: x position, y position, width, height
   **/
  ctx.rect(20, 40, 50, 50);
  /**
   * Define the color used to fill
   **/
  ctx.fillStyle = "#9D2933";
  // Fill the rectangle
  ctx.fill();
  ctx.closePath();

  // Creating a circle
  ctx.beginPath();
  /**
   * void ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);
   **/
  ctx.arc(240, 100, 20, 0, Math.PI *2, false);
  ctx.fillStyle = '#5B8930';
  ctx.fill();
  ctx.closePath();

  // Creating a rectangle
  ctx.beginPath();
  ctx.rect(160, 10, 100, 40);
  ctx.strokeStyle = 'rgba(0, 0, 255, .5)';
  ctx.stroke();
  ctx.closePath();

})();