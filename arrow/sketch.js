const CIRCLE_DIAMETER = 150;
let width = 3;
let height = 3;
const COLOR_SCHEME = [0, 40, 80, 120];

let NUMBER_MODE = false;

let grid;
let checkbox;
let numMovesLabel;
let gameCompletedLabel;

let numMoves = 0;

function setup() {
  // Get the side length from the URL query string
  const sideLengthStr = new URLSearchParams(window.location.search).get("size");
  if (sideLengthStr) {
    const sideLength = parseInt(sideLengthStr);
    if (sideLength >= 3) {
      width = sideLength;
      height = sideLength;
    }
  }

  // Setup html elements
  let canvas = createCanvas(width * CIRCLE_DIAMETER, height * CIRCLE_DIAMETER);
  canvas.parent("sketch-holder");

  checkbox = createCheckbox("Show numbers?", NUMBER_MODE);
  checkbox.parent("main");
  checkbox.changed(myCheckedEvent);

  numMovesLabel = createP("Number of moves: 0");
  numMovesLabel.parent("main");

  gameCompletedLabel = createP("");
  gameCompletedLabel.parent("main");

  // Setup and scramble the grid
  grid = new Grid(width, height);
  grid.scramble();
}

function draw() {
  grid.draw();

  if (grid.checkIsCompleted() && !grid.checkIsAnimating()) {
    gameCompletedLabel.html(`You did it in ${numMoves} moves! Please refresh the page to try again`);
  }
}

function mouseClicked() {
  if (grid.onMouseClicked(mouseX, mouseY)) {
    numMoves++;
    numMovesLabel.html("Number of moves: " + numMoves);
  }
}

function myCheckedEvent() {
  NUMBER_MODE = checkbox.checked();
}
