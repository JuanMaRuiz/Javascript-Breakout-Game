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
  var rightPressed = false;
  var leftPressed = false;

  document.addEventListener("keydown", keyDownHandler);
  document.addEventListener("keyup", keyUpHandler);

  function drawBall() {
    ctx.beginPath();
    ctx.arc(settings.ball.initialXPos, settings.ball.initialYPos, settings.ball.radius, 0, Math.PI *2);
    ctx.fillStyle = settings.ball.color;
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle() {
    ctx.beginPath();
    // x position, y position, width, height
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

    if(rightPressed && settings.paddle.initialXPosition < canvas.width - settings.paddle.width) {
      settings.paddle.initialXPosition += 7;
    }
    if(leftPressed && settings.paddle.initialXPosition > 0) {
      settings.paddle.initialXPosition -= 7;
    }

    settings.ball.initialXPos += moveX;
    settings.ball.initialYPos += moveY;
  }

  function keyDownHandler(event) {
    if(event.keyCode === 39) {
      console.log("keyDownHandler: ", event);
      rightPressed = true;
      console.log("Move to right");
    } else if(event.keyCode === 37){
      leftPressed = true;
      console.log("Move to left");
    }
  }

  function keyUpHandler(event) {
    if(event.keyCode === 39) {
      console.log("KeyUpHandler: ", event);
      rightPressed = false;
    } else if(event.keyCode === 37){
      leftPressed = false;
    }
  }

  setInterval(draw, 10);

})();