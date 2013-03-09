// Set up canvas and drawing context
var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

//Game States
var MENU     = 0;
var PLAYING  = 1;
var PAUSED   = 2;
var SCORED   = 3;
var GAMEOVER = 4;
var gameState = PLAYING;

var scoreDelayTimer = 0;

var PLAYER1SCORED = false;
var PLAYER2SCORED = false;
var GAMEOVER = false;

// Set up paddle image
var paddleImage = new Image();
paddleImage.addEventListener("load", loadHandler, false);
paddleImage.src = "../images/paddles.png"

// Arrow key controls
var UP   = 38;
var DOWN = 40;

// Directons
var moveUp   = false;
var moveDown = false;

// Score Keeping
var player1Score = 0;
var player2Score = 0;

// Define the properties that a paddle has
var pongPaddle =
{
  x: 0,
  y: 0,
  width: 30,
  height: 100,
  vy: 0
};

var ball = {
  g: 0,
  x: 400, 
  y: 400,
  vx: 5,
  vy: 5,
  radius: 5,
};

// Create player1's paddle
var player1 = Object.create(pongPaddle);
player1.x = 20;
player1.y = 250;
player1.vy = 0;

var player2 = Object.create(pongPaddle);
player2.x = 974;
player2.y = 250;
player2.vy = 0; 

var pong_ball = Object.create(ball);
pong_ball.x = 501;
pong_ball.y = 285;
pong_ball.radius = 11;
pong_ball.vx = 5;
pong_ball.vy = -5;

// Add event listners
window.addEventListener("keydown",
  function keydownHandler(e)
  {
    var key = e.keyCode || e.charCode || e.which;
    switch(key)
    {
      case UP:
        moveUp = true;
        break;
      case DOWN:
        moveDown = true;
        break;
    }
  }, false);

window.addEventListener("keyup",
  function keyupHandler(e)
  {
    var key = e.keyCode || e.charCode || e.which;
    switch(key)
    {
      case UP:
        moveUp = false;
        break;
      case DOWN:
        moveDown = false;
        break;
    }
  }, false);

function drawBall() {
    with (context){
        fillStyle = "#0000ff"
        beginPath();
        arc(pong_ball.x, pong_ball.y, pong_ball.radius, 0, 2*Math.PI, true);
        closePath();
        fill();
    };
};

function drawScore(){
  with (context){
    font = "40px astera"
    fillStyle = "#fff"
    fillText(player1Score + " | " + player2Score, 427, 100);
  }
}

function drawGameOver(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  with(context){
    font = "40px astera"
    fillStyle = "#fff"
    fillText("GAME OVER", 312, 300);
  }
  window.removeEventListener('keydown', keydownHandler, false);
  window.removeEventListener('keydown', keyupHandler, false);
}

function loadHandler(){
  update();
}

function update(){
  window.setTimeout(update, 1000/60);

  switch(gameState){
    case MENU:
      console.log("Menu Screen");
      menu();
      break;

    case PLAYING:
      playGame();
      break;

    case PAUSED:
      paused();
      break;

    case SCORED:
      scored();
      break;

    case GAMEOVER:
      gameOver();
      break;
  }

  render();
}

function playGame(){
  if(moveUp && !moveDown){
    player1.vy = -7;
  }

  if(moveDown && !moveUp){
    player1.vy = 7;
  }

  if(!moveUp && !moveDown){
    player1.vy = 0;
  }

  player1.y = Math.max(20, Math.min(player1.y + player1.vy, canvas.height - (player1.height + 20)));
}

function menu(){

}

function paused(){

}

function gameOver(){

}


  // checkGameOver();

  // if(moveUp && !moveDown)
  // {
  //   player1.vy = -7;
  // }

  // if(moveDown && !moveUp)
  // {
  //   player1.vy = 7;
  // }

  // // Paddle velocity is zero if no key is pressed
  // if(!moveUp && !moveDown)
  // {
  //   player1.vy = 0;
  // }

  // if(player1.y < 30)
  // {
  //   player1.y = 30;
  // }

  // if(player1.y + player1.height > canvas.height -30)
  // {
  //   player1.y = canvas.height - player1.height - 30;
  // }

  // if(pong_ball.y + pong_ball.radius > canvas.height){
  //   pong_ball.vy = -pong_ball.vy
  // }

  // if(pong_ball.y < pong_ball.radius){
  //   pong_ball.vy = -pong_ball.vy;
  // }

  // //Check if pong ball hits paddle
  // if((pong_ball.y <= player1.y + player1.height) && (pong_ball.y >= player1.y) && 
  //   (pong_ball.x - pong_ball.radius <= player1.x + player1.width))
  // {
  //     pong_ball.x = pong_ball.x + 1;
  //     pong_ball.vx = (pong_ball.vx) * -1 ;
  // }

  // //Check if pong ball hits cpu paddle
  // if((pong_ball.y <= player2.y + player2.height) && (pong_ball.y >= player2.y) && 
  //   (pong_ball.x + pong_ball.radius >= player2.x))
  // {
  //     pong_ball.x = pong_ball.x + 1;
  //     pong_ball.vx = (pong_ball.vx) * - 1;
  // }

  // // Move paddle if key is pressed
  // player1.y += player1.vy;
  // pong_ball.x += pong_ball.vx;
  // pong_ball.y += pong_ball.vy;

  //   //Check if score

  // if(pong_ball.x + pong_ball.radius > canvas.width){
  //   PLAYER1SCORED = true;
  //   scored();
  // }

  // if(pong_ball.x + pong_ball.radius < 0){
  //   PLAYER2SCORED = true;
  //   scored();
  // }

function scored(){
  if (PLAYER1SCORED === true){
    PLAYER1SCORED = false;
    player1Score++;  
  }

  if(PLAYER2SCORED === true){
    PLAYER2SCORED = false;
    player2Score++;
  }

  pong_ball.x = 400;
  pong_ball.y = 400;
}

function checkGameOver(){
  if(player1Score === 7 || player2Score === 7){
    console.log("WON GAME");
    GAMEOVER = true;
    drawGameOver();
  }
}

function render(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(paddleImage,0, 0, 30, 100, player1.x, player1.y, 30, 100);
  context.drawImage(paddleImage, 31, 0, 30, 100, player2.x, player2.y, 30, 100);
  drawBall();
  drawScore();
}