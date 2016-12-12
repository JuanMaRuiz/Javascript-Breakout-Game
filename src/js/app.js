(function(){
  'use strict';

  var canvas = document.getElementById('myCanvas');
  canvas.width = document.body.clientWidth * 0.7;
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
    },
    bricks: {
      color: '#D24D57',
      rowCount: 3,
      columnCount: 5,
      width: 75,
      height: 20,
      padding: 10,
      offsetTop: 30,
      offsetLeft: 30
    }
  }

  var moveX = 2;
  var moveY = -2;
  var rightPressed = false;
  var leftPressed = false;
  var beginGame = false;
  var bricks = [];

  for (let c = 0; c < settings.bricks.columnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < settings.bricks.rowCount; r++) {
      bricks[c][r] = {x: 0, y:0, status: 1};
    }
  }

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

  function drawBricks() {
    for(let i = 0; i < settings.bricks.columnCount; i++) {
      for(let j = 0; j < settings.bricks.rowCount; j++) {
        if( bricks[i][j].status === 1 ) {
          var brickX = (i * (settings.bricks.width + settings.bricks.padding)) + settings.bricks.offsetLeft;
          var brickY = (j * (settings.bricks.height + settings.bricks.padding)) + settings.bricks.offsetTop;
          bricks[i][j].x = brickX;
          bricks[i][j].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, settings.bricks.width, settings.bricks.height);
          ctx.fillStyle = settings.bricks.color;
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  function collisionDetection() {
    for(let i = 0; i < settings.bricks.columnCount; i++) {
      for(let j = 0; j < settings.bricks.rowCount; j++) {
        var brick = bricks[i][j];
        if( brick.status === 1 ) {
          console.log('brick.x: ', brick.x)
          if( settings.ball.xPos > brick.x && settings.ball.xPos < brick.x + settings.bricks.width && settings.ball.yPos > bricks.y && settings.ball.yPos < brick.y + settings.bricks.height ) {
            moveY = -moveY;
          }
        }
      }
    }
  }

  function draw() {
    /**
     * void ctx.clearRect(x, y, width, height);
     */
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();

    if( beginGame ) {
      if( settings.ball.yPos + moveY < settings.ball.radius) {
        moveY = -moveY;
      } else if ( settings.ball.yPos + moveY > canvas.height - settings.ball.radius ) {
        if( settings.ball.xPos > settings.paddle.xPos && settings.ball.xPos + settings.ball.radius < settings.paddle.xPos + settings.paddle.width ) {
          moveY = -moveY;
        } else {
          console.log('settings.ball.xPos: ', settings.ball.xPos);
          console.log('settings.paddle.xPos: ', settings.paddle.xPos);
          console.log('settings.ball.xPos: ', settings.ball.xPos);
          console.log('settings.ball.radius: ', settings.ball.radius);
          console.log('settings.paddle.xPos: ', settings.paddle.xPos);
          console.log('settings.paddle.width: ', settings.paddle.width);
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


  var userResponse = window.prompt('Do you want to begin the game?');

  if( userResponse.toLowerCase() === 'yes' ) {
    beginGame = true;
  } else if ( userResponse.toLowerCase() === 'no' ) {
    alert("Ok, refresh the page to begin the game")
  } else {
    alert('Please, answer "yes or"')
  }
  
  if( beginGame ) {
    setInterval(draw, 10);
  }
})();