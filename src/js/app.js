(function(){
  'use strict';

  var canvas = document.getElementById('myCanvas');
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  var ctx = canvas.getContext('2d');

  var settings = {
    ball: {
      color: '#5B8930',
      radius: 10,
      initialXPos: canvas.width / 2,
      initialYPos: canvas.height -30
    },
    paddle: {
      color: '#ABB7B7',
      height: 10,
      width: 75,
      initialXPosition: (canvas.width - 75) / 2,
      initialYPosition: canvas.height - 10
    }
  }

  var moveX = 2;
  var moveY = -2;

  function drawBall() {
    ctx.beginPath();
    ctx.arc(settings.ball.initialXPos, settings.ball.initialYPos, settings.ball.radius, 0, Math.PI *2);
    ctx.fillStyle = settings.ball.color;
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(settings.paddle.initialXPosition, settings.paddle.initialYPosition, settings.paddle.width, settings.paddle.height);
    ctx.fillStyle = settings.paddle.color;
    ctx.fill();
    ctx.closePath();
  }

  function draw() {
    /**
     * void ctx.clearRect(x, y, width, height);
     */
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    if( settings.ball.initialYPos + moveY < settings.ball.radius || settings.ball.initialYPos + moveY > canvas.height - settings.ball.radius) {
      moveY = -moveY;
    }

    if( settings.ball.initialXPos + moveX < settings.ball.radius || settings.ball.initialXPos + moveX > canvas.width - settings.ball.radius) {
      moveX = -moveX;
    }

    settings.ball.initialXPos += moveX;
    settings.ball.initialYPos += moveY;
  }

  setInterval(draw, 10);

})();