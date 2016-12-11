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
      xPos: canvas.width / 2,
      yPos: canvas.height -30
    },
    paddle: {
      color: '#ABB7B7',
      height: 10,
      width: 75,
      xPos: (canvas.width - 75) / 2,
      yPosition: canvas.height - 10
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
    ctx.arc(settings.ball.xPos, settings.ball.yPos, settings.ball.radius, 0, Math.PI *2);
    ctx.fillStyle = settings.ball.color;
    ctx.fill();
    ctx.closePath();
  }

  function drawPaddle() {
    ctx.beginPath();
    // x position, y position, width, height
    ctx.rect(settings.paddle.xPos, settings.paddle.yPosition, settings.paddle.width, settings.paddle.height);
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

    if( settings.ball.yPos + moveY < settings.ball.radius) {
      moveY = -moveY;
    } else if ( settings.ball.yPos + moveY > canvas.height - settings.ball.radius ) {
      if( settings.ball.xPos > settings.paddle.xPos && settings.ball.xPos < settings.paddle.xPos + settings.paddle.width ) {
        moveY = -moveY;
      } else {
        alert("Game over!!");
        document.location.reload();
      }
    }

    if( settings.ball.xPos + moveX < settings.ball.radius || settings.ball.xPos + moveX > canvas.width - settings.ball.radius) {
      moveX = -moveX;
    }

    if(rightPressed && settings.paddle.xPos < canvas.width - settings.paddle.width) {
      settings.paddle.xPos += 7;
    }
    if(leftPressed && settings.paddle.xPos > 0) {
      settings.paddle.xPos -= 7;
    }

    settings.ball.xPos += moveX;
    settings.ball.yPos += moveY;
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