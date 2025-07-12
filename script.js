//your JS code here. If required.
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const submitBtn = document.getElementById("submit");
const gameSection = document.getElementById("game");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let currentPlayer = "";
let player1 = "";
let player2 = "";
let board = Array(9).fill("");
let gameOver = false;

submitBtn.addEventListener("click", () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();
  if (player1 && player2) {
    document.getElementById("player-form").style.display = "none";
    gameSection.style.display = "block";
    currentPlayer = player1;
    message.textContent = `${currentPlayer}, you're up`;
  }
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (gameOver || cell.textContent !== "") return;

    const symbol = currentPlayer === player1 ? "X" : "O";
    board[index] = symbol;
    cell.textContent = symbol;

    if (checkWinner(symbol)) {
      message.textContent = `${currentPlayer}, congratulations you won!`;
      highlightWinningCells(symbol);
      gameOver = true;
    } else if (board.every(val => val !== "")) {
      message.textContent = `It's a draw!`;
      gameOver = true;
    } else {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      message.textContent = `${currentPlayer}, you're up`;
    }
  });
});

function checkWinner(symbol) {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8],  // rows
    [0,3,6], [1,4,7], [2,5,8],  // cols
    [0,4,8], [2,4,6]            // diagonals
  ];
  return winCombos.some(combo =>
    combo.every(i => board[i] === symbol)
  );
}

function highlightWinningCells(symbol) {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  for (let combo of winCombos) {
    if (combo.every(i => board[i] === symbol)) {
      combo.forEach(i => cells[i].classList.add("winner"));
      break;
    }
  }
}
