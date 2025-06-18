console.log("Tic Tac Toe Game");

const cell0 = document.querySelector("#cell-0");
const cell1 = document.querySelector("#cell-1");
const cell2 = document.querySelector("#cell-2");
const cell3 = document.querySelector("#cell-3");
const cell4 = document.querySelector("#cell-4");
const cell5 = document.querySelector("#cell-5");
const cell6 = document.querySelector("#cell-6");
const cell7 = document.querySelector("#cell-7");
const cell8 = document.querySelector("#cell-8");
const resetButton = document.querySelector("#reset-button");
const currentPlayerText = document.querySelector("#current-player");
// variable to keep track of the current player
let currentPlayer = 1;
let currentSymbol = "X"; // Default symbol for player 1
function switchPlayer() {
  if (currentPlayer === 1) {
    currentPlayer = 2;
    currentSymbol = "O"; // Change symbol for player 2
    currentPlayerText.innerText = "2";
  } else {
    currentPlayer = 1;
    currentSymbol = "X"; // Change back to symbol for player 1
    currentPlayerText.innerText = "1";
  }
}

cell0.addEventListener("click", function () {
  console.log("Cell 0 clicked");
  cell0.innerText = currentSymbol;
  switchPlayer();
});
cell1.addEventListener("click", function () {
  console.log("Cell 1 clicked");
  cell1.innerText = currentSymbol;
  switchPlayer();
});
cell2.addEventListener("click", function () {
  console.log("Cell 2 clicked");
  cell2.innerText = currentSymbol;
  switchPlayer();
});
cell3.addEventListener("click", function () {
  console.log("Cell 3 clicked");
  cell3.innerText = currentSymbol;
  switchPlayer();
});
cell4.addEventListener("click", function () {
  console.log("Cell 4 clicked");
  cell4.innerText = currentSymbol;
  switchPlayer();
});
cell5.addEventListener("click", function () {
  console.log("Cell 5 clicked");
  cell5.innerText = currentSymbol;
  switchPlayer();
});
cell6.addEventListener("click", function () {
  console.log("Cell 6 clicked");
  cell6.innerText = currentSymbol;
  switchPlayer();
});
cell7.addEventListener("click", function () {
  console.log("Cell 7 clicked");
  cell7.innerText = currentSymbol;
  switchPlayer();
});
cell8.addEventListener("click", function () {
  console.log("Cell 8 clicked");
  cell8.innerText = currentSymbol;
  switchPlayer();
});
resetButton.addEventListener("click", function () {
  console.log("Reset button clicked");
  // Reset the game by clearing all cells and resetting the current player
  currentPlayer = 1;
  currentSymbol = "X"; // Reset to player 1's symbol
  cell0.innerText = "";
  cell1.innerText = "";
  cell2.innerText = "";
  cell3.innerText = "";
  cell4.innerText = "";
  cell5.innerText = "";
  cell6.innerText = "";
  cell7.innerText = "";
  cell8.innerText = "";
});

// assignment
// 1. Add a check to prevent a cell from being clicked if it already has a symbol.
// 2. Implement a function to check for a winner after each move.

// bonus
// 1. refactor the code to use a loop for adding event listeners to the cells and make the code much simpler.
