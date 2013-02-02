// Set up canvas and drawing context
var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

// Set up paddle image
var paddleImage = new Image();
paddleImage.addEventListener("load", loadHandler, false);
paddleImage.src = "../images/paddle.png"

// Arrow key controls
var UP   = 38;
var DOWN = 40;

// Directons
var moveUp   = false;
var moveDown = false; 

// Define the properties that a paddle has
var pongPaddle =
{
  x: 0,
  y: 0,
  vy: 0
};

// Create player1's paddle
var player1 = Object.create(pongPaddle);
player1.x = 20;
player1.y = 20;
player1.vy = 0;

// Add event listners
window.addEventListener("keydown",
  function(e)
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
  function(e)
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

function loadHandler()
{
  update();
}

function update()
{
  requestAnimationFrame(update, canvas);

  if(moveUp && !moveDown)
  {
    player1.vy = -5;
  }

  if(moveDown && !moveUp)
  {
    player1.vy = 5;
  }

  // Paddle velocity is zero if no key is pressed
  if(!moveUp && !moveDown)
  {
    player1.vy = 0;
  }

  // Move paddle if key is pressed
  player1.y += player1.vy;

  render();
}

function render()
{
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(paddleImage, player1.x, player1.y);
}