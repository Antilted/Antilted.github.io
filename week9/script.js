// find our elements
const transformOuter = document.querySelector(".outer");
const ball = document.querySelector(".ball");
const moveButton = document.querySelector("#move-button");
const scaleButton = document.querySelector("#scale-button");
const rotateButton = document.querySelector("#rotate-button");
const resetButton = document.querySelector("#reset-button");

// define our transform variables
let ballTranslateX = 0;
let ballRotate = 0;
let ballScale = 1;

// apply transform to ball
function updateTransform() {
  ball.style.transform = `translateX(${ballTranslateX}px) rotate(${ballRotate}deg) scale(${ballScale})`;
}

// move ball
function moveBall() {
  const parentSize = transformOuter.getBoundingClientRect();
  const goal = parentSize.width / 2 - 25;
  ballTranslateX += 10;
  if (ballTranslateX > goal) {
    alert("you scored a goal");
  }
  updateTransform();
}
moveButton.addEventListener("click", moveBall);

// rotate ball
function rotateBall() {
  ballRotate += 15;
  updateTransform();
}
rotateButton.addEventListener("click", rotateBall);

// scale ball
function scaleBall() {
  if (ballScale > 0.2) {
    ballScale -= 0.1;
    updateTransform();
  }
}
scaleButton.addEventListener("click", scaleBall);

// reset
function resetBall() {
  ballTranslateX = 0;
  ballRotate = 0;
  ballScale = 1;
  updateTransform();
}
resetButton.addEventListener("click", resetBall);
