//Gives ability to animate on the canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//Defines the ball and collision
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var ballRadius = 10;

//Defining the paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

//Defining the users ability to control the paddle
var rightPressed = false;
var leftPressed = false;

//Buttons used to move the paddle
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//The logic of being able to move the paddle from left to right
function keyDownHandler(e) {
  if(e.keyCode == 39){
    rightPressed = true;
  }
  else if(e.keyCode == 37){
    leftPressed = true;
  }
}
function keyUpHandler(e) {
  if(e.keyCode == 39) {
    rightPressed = false;
  }
  else if(e.keyCode == 37) {
    leftPressed = false;
  }
}

//What the ball should look like and where should it be placed
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();
}

//collision to the borders
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();

  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  //If the ball hits the bottom, the game will trigger a "GAME OVER" popup box
  if(y + dy < ballRadius) {
    dy = -dy;
  } else if(y +dy > canvas.height-ballRadius) {
      if(x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      }
      else{
        alert("GAME OVER");
        document.location.reload();
      }
  }

  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
  }
  else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  x += dx;
  y += dy;
}

//Creating the paddle on the screen
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

//how fast the ball is moving
setInterval(draw, 15);
