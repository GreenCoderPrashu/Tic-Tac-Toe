const cells = document.querySelectorAll('.Cell');
const status = document.getElementById('Status');
const restartBtn = document.getElementById('Restart');
const scoreX = document.getElementById('ScoreX');
const scoreO = document.getElementById('ScoreO');
const scoreDraw = document.getElementById('ScoreDraw');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
let scores = { X: 0, O: 0, Draw: 0 };

const winConditions = [
[0,1,2], [3,4,5], [6,7,8], // rows
[0,3,6], [1,4,7], [2,5,8], // cols
[0,4,8], [2,4,6] // diags
];

function handleCellClick(e) {
const cell = e.target;
const index = cell.getAttribute('Data-index');

if (gameState[index]!== '' ||!gameActive) return;

gameState[index] = currentPlayer;
cell.textContent = currentPlayer;
cell.classList.add(currentPlayer.toLowerCase());

checkResult();
}

function checkResult() {
let roundWon = false;
let winningCombo = [];

for (let condition of winConditions) {
const [a, b, c] = condition;
if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
roundWon = true;
winningCombo = condition;
break;
}
}

if (roundWon) {
status.textContent = `Player ${currentPlayer} wins!`;
scores[currentPlayer]++;
updateScoreboard();
winningCombo.forEach(i => cells[i].classList.add('win'));
gameActive = false;
return;
}

if (!gameState.includes('')) {
status.textContent = `It's a draw!`;
scores.Draw++;
updateScoreboard();
gameActive = false;
return;
}

currentPlayer = currentPlayer === 'X'? 'O' : 'X';
status.textContent = `Player ${currentPlayer}'s turn`;
}

function updateScoreboard() {
scoreX.textContent = scores.X;
scoreO.textContent = scores.O;
scoreDraw.textContent = scores.Draw;
}

function restartGame() {
currentPlayer = 'X';
gameActive = true;
gameState = ['', '', '', '', '', '', '', '', ''];
status.textContent = `Player X's turn`;
cells.forEach(cell => {
cell.textContent = '';
cell.classList.remove('x', 'o', 'win');
});
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);