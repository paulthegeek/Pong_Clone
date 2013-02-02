// Set up canvas and drawing context
var canvas = document.querySelector("canvas");
var context = canvas.getContext("2d");

// Set up paddle image
var paddleImage = new Image();
paddleImage.addEventListener("load", render, false);
paddleImage.src = "../images/paddle.png"

function render()
{
  context.drawImage(paddleImage, 0, 0);
}