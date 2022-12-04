const unitLength = 20; /*The width and height of a box.*/
const boxColor = 100; /*The color of the box*/
const strokeColor = 200; /*The color of the stroke of the box*/
let columns; /* To be determined by window width */
let rows; /* To be determined by window height */
let currentBoard; /*The states of the board of the current generation*/
let nextBoard; /*The states of the board of the next generation. It is determined by the current generation*/
let controlButton;
let rate = 0;
let lonely = 2;
let overPopulation = 3;

// window.addEventListener("DOMContentLoaded", function () {
//   const audioElement = document.querySelector("audio");

//   audioElement.addEventListener("loadeddata", (e) => {
//     audioElement.loop = true;
//     audioElement.autoplay = true;
//   });
// });

function setup() {
  /* Set the canvas to be under the element #canvas*/
  const canvas = createCanvas(windowWidth - 30, windowHeight - 300);
  canvas.parent(document.querySelector("#canvas"));

  /*Calculate the number of columns and rows */
  columns = floor(width / unitLength);
  rows = floor(height / unitLength);
  /* floor function can ensure the rows and the columns are Integer */

  /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
  currentBoard = [];
  nextBoard = [];
  for (let i = 0; i < columns; i++) {
    currentBoard[i] = [];
    nextBoard[i] = [];
  }
  // Now both currentBoard and nextBoard are array of array of undefined values.
  init(currentBoard); // Set the initial values of the currentBoard and nextBoard
}

function init(previousBoard) {
  columns = floor(width / unitLength);
  rows = floor(height / unitLength);
  /* floor function can ensure the rows and the columns are Integer */

  /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
  currentBoard = [];
  nextBoard = [];
  for (let i = 0; i < columns; i++) {
    currentBoard[i] = [];
    nextBoard[i] = [];
  }
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      currentBoard[i][j] = previousBoard[i][j] || 0;
      nextBoard[i][j] = 0;
    }
  }
}

function draw() {
  background(0, 0, 0, 0);
  // If you go off screen.
  /* set the background color as White color*/
  generate();
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      /*checking if the box has life, fill the box with boxColor if true, with white if false */
      if (currentBoard[i][j] == 1) {
        fill(random(255), random(255), random(255));
      } else {
        fill(255);
      }
      stroke(strokeColor);
      rect(
        i * unitLength,
        j *
          unitLength /* set the position of the top left corner of the rectangle */,
        unitLength,
        unitLength,
        8 /* size of the rectangle*/
      );
    }
  }
  rate = parseInt(document.querySelector("#myRange").value);
  document.querySelector("#fps").innerHTML = `Frame Rate: ${rate}`;
  frameRate(rate); // make frameRate  FPS
}

function generate() {
  //Loop over every single box on the board
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      // Count all living members in the Moore neighborhood(8 boxes surrounding)
      let neighbors = 0;
      for (let i of [-1, 0, 1]) {
        for (let j of [-1, 0, 1]) {
          if (i == 0 && j == 0) {
            // the cell itself is not its own neighbor
            continue;
          }
          // The modulo operator is crucial for wrapping on the edge
          neighbors +=
            currentBoard[(x + i + columns) % columns][(y + j + rows) % rows];
        }
      }
      lonely = parseInt(document.querySelector("#lonelyNum").value);
      document.querySelector(
        "#lonely"
      ).innerHTML = `Rules of Lonely: ${lonely}`;

      overPopulation = parseInt(document.querySelector("#overPop").value);
      document.querySelector(
        "#over-population"
      ).innerHTML = `Rules of Over Population: ${overPopulation}`;

      // Rules of Life
      if (currentBoard[x][y] == 1 && neighbors < lonely) {
        // Die of Loneliness
        nextBoard[x][y] = 0;
      } else if (currentBoard[x][y] == 1 && neighbors > overPopulation) {
        // Die of Overpopulation
        nextBoard[x][y] = 0;
      } else if (currentBoard[x][y] == 0 && neighbors == 3) {
        // New life due to Reproduction
        nextBoard[x][y] = 1;
      } else {
        // Stasis
        nextBoard[x][y] = currentBoard[x][y];
      }
    }
  }
  // Swap the nextBoard to be the current Board
  [currentBoard, nextBoard] = [nextBoard, currentBoard];
}

function mouseDragged() {
  /**
   * If the mouse coordinate is outside the board
   */
  if (mouseX > unitLength * columns || mouseY > unitLength * rows) {
    return;
  }
  const x = Math.floor(mouseX / unitLength);
  const y = Math.floor(mouseY / unitLength);
  currentBoard[x][y] = 1;
  fill(255, 255, 0);
  stroke(strokeColor);
  rect(x * unitLength, y * unitLength, unitLength, unitLength, 8);
}

function mousePressed() {
  noLoop();
  mouseDragged();
}
function mouseReleased() {
  loop();
}
document.querySelector("#run-game").addEventListener("click", function () {
  mouseReleased();
});
document.querySelector("#stop-game").addEventListener("click", function () {
  noLoop();
});
document.querySelector("#reset-game").addEventListener("click", function () {
  init();
});
function setupRandom() {
  /* Set the canvas to be under the element #canvas*/
  const canvas = createCanvas(windowWidth - 30, windowHeight - 300);
  canvas.parent(document.querySelector("#canvas"));

  /*Calculate the number of columns and rows */
  columns = floor(width / unitLength);
  rows = floor(height / unitLength);
  /* floor function can ensure the rows and the columns are Integer */

  /*Making both currentBoard and nextBoard 2-dimensional matrix that has (columns * rows) boxes. */
  currentBoard = [];
  nextBoard = [];
  for (let i = 0; i < columns; i++) {
    currentBoard[i] = [];
    nextBoard[i] = [];
  }
  // Now both currentBoard and nextBoard are array of array of undefined values.
  initRandom(); // Set the initial values of the currentBoard and nextBoard
}
function initRandom() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      currentBoard[i][j] = Math.round(Math.random());
      nextBoard[i][j] = 0;
    }
  }
}
document.querySelector("#random-game").addEventListener("click", function () {
  setupRandom();
});

document.querySelector("#homepage").addEventListener("click", function () {
  alert("This webpage will be redirected to the Homepage");
  window.location = "../html/home.html";
});

function windowResized() {
  resizeCanvas(windowWidth - 30, windowHeight - 300);
  init(currentBoard);
}
