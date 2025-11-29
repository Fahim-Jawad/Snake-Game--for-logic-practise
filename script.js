const board = document.querySelector(".board");
const startButton = document.querySelector(".btn-start");
const restartButton = document.querySelector(".btn-restart");
const modal = document.querySelector(".modal");
const startGameModal = document.querySelector(".start-game");
const gameOverModal = document.querySelector(".game-over");

const highScoreElement = document.querySelector("#high-score");
const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");

// declares the sizes of each block
const blockHeight = 50;
const blockWidth = 50;

let highScore = localStorage.getItem("highScore") || 0;
let score = 0;
let time = `00-00`;

highScoreElement.innerText = highScore;

//dividing the board as the size of the block by the rows and columns
const columns = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

// to stop the snake moving when it comes to end of the board
let intervalId = null;
let timerIntervalId = null;

// making the blocks array to get each of the coordinates of blocks
const blocks = [];

// making the snake in the three of the blocks as object
let snake = [
  { x: 1, y: 3 },
  { x: 1, y: 4 },
  { x: 1, y: 5 },
];

// spawning the food randomly in any blocks
let food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * columns),
};

// initializing the direction
let direction = "down";

// for (let i = 0; i < rows * columns; i++) {
//   const block = document.createElement("div");
//   block.classList.add("block");
//   board.appendChild(block);
// }

// drawing the blocks and also the coordinates
for (let row = 0; row < rows; row++) {
  for (let column = 0; column < columns; column++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    // show the coordinates
    block.innerText = `${row}-${column}`;
    // making the coordinates as 2d array
    blocks[`${row}-${column}`] = block;
  }
}

// rendering the snake function
function renderSnake() {
  let head = null;

  // adding the food class in any block
  blocks[`${food.x}-${food.y}`].classList.add("food");

  // making the direction of the snake as the direction of the key
  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  }

  // if the snake finds any walls around the board
  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= columns) {
    // making the movement clear that it can restart
    clearInterval(intervalId);
    modal.style.display = "flex";
    startGameModal.style.display = "none";
    gameOverModal.style.display = "flex";

    return;
  }
// if the snake over laps its body 
  for (let i = 0; i < snake.length; i++) {
  if (snake[i].x === head.x && snake[i].y === head.y) {
    clearInterval(intervalId);
    clearInterval(timerIntervalId);
    modal.style.display = "flex";
    startGameModal.style.display = "none";
    gameOverModal.style.display = "flex";
    return;
  }
}

  // if the snake consumes the food, means if the coordinates of the head of the snake and the food matches in the same block
  if (head.x == food.x && head.y == food.y) {
    // removes that food from that blocks
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    // respawn the food
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * columns),
    };
    // adds the food in a random new block
    blocks[`${food.x}-${food.y}`].classList.add("food");
    snake.unshift(head);
    score += 1;
    scoreElement.innerText = score;

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore.toString());
    }
  }

  // while moving forward in any direction while remove the tail
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });

  // putting the head blocks to move forward at any direction
  snake.unshift(head);
  // removing the tail blocks while it moves forward
  snake.pop();

  // drawing the snake as blocks
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.add("fill");
  });
}

// start the game
startButton.addEventListener("click", () => {
  // remove the modal after pressing start button and the game starts
  modal.style.display = "none";
  // speed of the moving of the snake
  intervalId = setInterval(() => {
    // calling the snaking moving function here to move the snake
    renderSnake();
  }, 100);
  timerIntervalId = setInterval(() => {
    let [minutes, seconds] = time.split("-").map(Number);
    if (seconds == 59) {
      minutes += 1;
      seconds = 0;
    } else {
      seconds += 1;
    }
    time = `${minutes}-${seconds}`;
    timeElement.innerText = time;
  }, 1000);
});

restartButton.addEventListener("click", restartGame);

function restartGame() {
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
  });
  blocks[`${food.x}-${food.y}`].classList.remove("food");
  score = 0;
  time = `00-00`;
  scoreElement.innerText = score;
  timeElement.innerText = time;
  highScoreElement.innerText = highScore;
  modal.style.display = "none";
  snake = [{ x: 6, y: 10 },
    { x: 6, y: 11 },
    { x: 6, y: 12 }
    
  ];
  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * columns),
  };
  intervalId = setInterval(() => {
    // calling the snaking moving function here to move the snake
    renderSnake();
  }, 100);
}

// event listeners for key pressings
addEventListener("keydown", (event) => {
  console.log(event.key);
  if (event.key == "ArrowUp" && direction!== "down") {
    direction = "up";
  } else if (event.key == "ArrowDown" && direction!== "up") {
    direction = "down";
  } else if (event.key == "ArrowLeft" && direction!== "right") {
    direction = "left";
  } else if (event.key == "ArrowRight" && direction!== "left") {
    direction = "right";
  }
});
