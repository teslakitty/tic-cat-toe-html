// script.js
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

function handleCellClick(e) {
  const cellIndex = e.target.getAttribute('data-index');
  if (!gameState[cellIndex]) {
    gameState[cellIndex] = currentPlayer;
    e.target.innerText = currentPlayer;
    if (checkWin()) {
      alert(`Player ${currentPlayer} wins!`);
      restartGame();
    } else if (gameState.every(cell => cell)) {
      alert('Draw!');
      restartGame();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];
  return winPatterns.some(pattern => 
    pattern.every(index => gameState[index] === currentPlayer)
  );
}

function restartGame() {
  gameState.fill(null);
  cells.forEach(cell => (cell.innerText = ''));
  currentPlayer = 'X';
}
