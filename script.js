const board = document.querySelector(".board");
const blockHeight = 30;
const blockWidth = 30;

const columns = Math.floor(board.clientWidth / blockHeight);
const rows = Math.floor(board.clientHeight / blockWidth);

// for (let i = 0; i < rows * columns; i++) {
//   const block = document.createElement("div");
//   block.classList.add("block");
//   board.appendChild(block);
// }

for (let row = 0; row < rows; row++) {
  for (let column = 0; column < columns; column++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
  }
}
