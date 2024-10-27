const boardElement = document.getElementById("board");
const messageElement = document.getElementById("message");

let board = Array(9).fill(null);
let currentPlayer = "X";
let gameActive = true;

function createBoard() {
    boardElement.innerHTML = "";
    board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.textContent = cell;
        cellElement.addEventListener("click", () => handleCellClick(index));
        boardElement.appendChild(cellElement);
    });
}

function handleCellClick(index) {
    if (board[index] || !gameActive) return;
    board[index] = currentPlayer;
    createBoard();
    checkWin();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            messageElement.textContent = `${board[a]} wins!`;
            gameActive = false;
            return;
        }
    }

    if (!board.includes(null)) {
        messageElement.textContent = "It's a draw!";
        gameActive = false;
    }
}

function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = "X";
    gameActive = true;
    messageElement.textContent = "";
    createBoard();
}

createBoard();