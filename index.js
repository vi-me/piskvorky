'use strict';

let whoseTurn = 'circle';
let whoseTurnIndicatorIcon = document.querySelector('.game-page__player-icon');

const cells = document.querySelectorAll('.cell');

// FUNCTION TO MAKE A TURN (draw symbols, change turns, check wins etc.)
const makeATurn = (event) => {
  if (whoseTurn === 'circle') {
    event.target.classList.add('cell--circle', 'cell--taken');
    event.target.innerHTML = `<img class="img-in-cell"  src="images/circle.svg"  alt="Cell taken by Player O"/> `;
    event.target.setAttribute('disabled', true);
    whoseTurn = 'cross';
    whoseTurnIndicatorIcon.src = 'images/cross.svg';

    if (isWinningMove(event.target)) {
      setTimeout(function () {
        // the timeout is here because it'd end the game too early otherwise (the last symbol would not show)
        let r = confirm('Vyhrál hráč s kolečky. Spustit novou hru?');
        if (r) {
          location.reload();
        }
      }, 360);
    }
    console.log('Hráč "O" ukončil svůj tah. Na tahu je hráč "X"');
  } else {
    event.target.classList.add('cell--cross', 'cell--taken');
    event.target.innerHTML = `<img class="img-in-cell" src="images/cross.svg"  alt="Cell taken by Player X"/>`;
    event.target.setAttribute('disabled', true);

    whoseTurn = 'circle';
    whoseTurnIndicatorIcon.src = 'images/circle.svg';

    if (isWinningMove(event.target)) {
      setTimeout(function () {
        // the timeout is here because it'd end the game too early otherwise (the last symbol would not show)
        let r = confirm('Vyhrál hráč s křížky. Spustit novou hru?');
        if (r) {
          location.reload();
        }
      }, 360);
    }
    console.log('Hráč "X" ukončil svůj tah. Na tahu je hráč "O"');
  }
};

for (let i = 0; i < cells.length; i += 1) {
  cells[i].addEventListener('click', makeATurn);
}

// FUNCTION TO READ THE SYMBOL FROM A TAKEN CELL
const getSymbol = (cell) => {
  if (cell.classList.contains('cell--circle')) {
    return 'circle';
  } else if (cell.classList.contains('cell--cross')) {
    return 'cross';
  }
};

const playingBoardSize = 10;

// FUNCTION TO GET THE CELL FROM COORDINATES
const getCell = (row, column) => cells[row * playingBoardSize + column];

// FUNCTION TO GET THE COORDINATES OF A CELL
const getPosition = (cell) => {
  let cellIndex = 0;
  while (cellIndex < cells.length && cell !== cells[cellIndex]) {
    cellIndex++;
  }

  return {
    row: Math.floor(cellIndex / playingBoardSize),
    column: cellIndex % playingBoardSize,
  };
};

const symbolsToWin = 5; // how many symbols are needet to win

// FUNCTION TO CHECK IF IT IS A WINNING MOVE
const isWinningMove = (cell) => {
  const origin = getPosition(cell);
  const symbol = getSymbol(cell);

  let i;
  let j;

  ////// Checking HORIZONTALLY
  let inRow = 1; // 1 for cell selected
  let inColumn = 1; // 1 for cell selected

  ///////// to the left
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getCell(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  ///////// to the right
  i = origin.column;
  while (
    i < playingBoardSize - 1 &&
    symbol === getSymbol(getCell(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  ///////// Validate if it is a winning move (horizontally)
  if (inRow >= symbolsToWin) {
    return true;
  }

  ////// Checking VERTICALLY

  ///////// up
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getCell(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  ///////// down
  i = origin.row;
  while (
    i < playingBoardSize - 1 &&
    symbol === getSymbol(getCell(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  ///////// Validate if it is a winning move (vertically)
  if (inColumn >= symbolsToWin) {
    return true;
  }

  ////// Checking DIAGONALLY - down to the LEFT + up to the RIGHT

  let inDiagonalDownLeftUpRight = 1; // 1 for cell selected

  ///////// down to the LEFT
  i = origin.row;
  j = origin.column;
  while (
    i < playingBoardSize - 1 &&
    j > 0 &&
    symbol === getSymbol(getCell(i + 1, j - 1))
  ) {
    inDiagonalDownLeftUpRight++;
    i++;
    j--;
  }

  ///////// up to the RIGHT
  i = origin.row;
  j = origin.column;
  while (
    i > 0 &&
    j < playingBoardSize - 1 &&
    symbol === getSymbol(getCell(i - 1, j + 1))
  ) {
    inDiagonalDownLeftUpRight++;
    i--;
    j++;
  }

  ///////// Validate if it is a winning move (down to the LEFT + up to the RIGHT)
  if (inDiagonalDownLeftUpRight >= symbolsToWin) {
    return true;
  }

  ////// Checking DIAGONALLY - down to the RIGHT + up to the LEFT
  let inDiagonalDownRightUpLeft = 1; // 1 for cell selected

  ///////// down to the RIGHT
  i = origin.row;
  j = origin.column;
  while (
    i < playingBoardSize - 1 &&
    j < playingBoardSize - 1 &&
    symbol === getSymbol(getCell(i + 1, j + 1))
  ) {
    inDiagonalDownRightUpLeft++;
    i++;
    j++;
  }

  ///////// up to the LEFT
  i = origin.row;
  j = origin.column;
  while (i > 0 && j > 0 && symbol === getSymbol(getCell(i - 1, j - 1))) {
    inDiagonalDownRightUpLeft++;
    i--;
    j--;
  }

  ///////// Validate if it is a winning move (down to the RIGHT + up to the LEFT)
  if (inDiagonalDownRightUpLeft >= symbolsToWin) {
    return true;
  }

  return false;
};
