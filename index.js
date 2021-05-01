'use strict';

let whoseTurn = 'circle';
let whoseTurnIndicatorIcon = document.querySelector('.game-page__player-icon');

const cells = document.querySelectorAll('.cell');

const makeATurn = (event) => {
  if (whoseTurn === 'circle') {
    event.target.classList.add('cell--circle', 'cell--taken');
    event.target.innerHTML = `<img class="img-in-cell"  src="images/circle.svg"  alt="Cell taken by Player O"/> `;
    event.target.setAttribute('disabled', true);
    whoseTurn = 'cross';
    whoseTurnIndicatorIcon.src = 'images/cross.svg';

    if (isWinningMove(event.target)) {
      setTimeout(function () {
        let r = confirm('Vyhrál hráč s kolečky. Spustit novou hru?');
        if (r) {
          location.reload();
        }
      }, 380);
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
        let r = confirm('Vyhrál hráč s křížky. Spustit novou hru?');
        if (r) {
          location.reload();
        }
      }, 380);
    }
    console.log('Hráč "X" ukončil svůj tah. Na tahu je hráč "O"');
  }
};

for (let i = 0; i < cells.length; i += 1) {
  cells[i].addEventListener('click', makeATurn);
}

const getSymbol = (cell) => {
  if (cell.classList.contains('cell--circle')) {
    return 'circle';
  } else if (cell.classList.contains('cell--cross')) {
    return 'cross';
  }
};

const playingBoardSize = 10;

const getCell = (row, column) => cells[row * playingBoardSize + column];

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

const symbolsToWin = 5;

const isWinningMove = (cell) => {
  const origin = getPosition(cell);
  const symbol = getSymbol(cell);

  let i;
  let j;

  //////////VERTIKALY A HORIZONTALY

  let inRow = 1; // Jednička pro právě vybrané políčko
  let inColumn = 1; // Jednička pro právě vybrané políčko

  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getCell(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < playingBoardSize - 1 &&
    symbol === getSymbol(getCell(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getCell(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < playingBoardSize - 1 &&
    symbol === getSymbol(getCell(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  //////////DIAGONALY

  let inDiagonalLeft = 1; // Jednička pro právě vybrané políčko
  let inDiagonalRight = 1; // Jednička pro právě vybrané políčko

  // Koukni nahoru doleva
  i = origin.row;
  j = origin.column;
  while (i > 0 && j > 0 && symbol === getSymbol(getCell(i - 1, j - 1))) {
    inDiagonalLeft++;
    i--;
    j--;
  }

  // Koukni dolů doleva
  i = origin.row;
  j = origin.column;
  while (
    i < playingBoardSize - 1 &&
    j > 0 &&
    symbol === getSymbol(getCell(i + 1, j - 1))
  ) {
    inDiagonalLeft++;
    i++;
    j--;
  }

  if (inDiagonalLeft >= symbolsToWin) {
    return true;
  }

  // Koukni nahoru doprava
  i = origin.row;
  j = origin.column;
  while (
    i > 0 &&
    j < playingBoardSize - 1 &&
    symbol === getSymbol(getCell(i - 1, j + 1))
  ) {
    inDiagonalRight++;
    i--;
    j++;
  }

  // Koukni dolů doprava
  i = origin.row;
  j = origin.column;
  while (
    i < playingBoardSize - 1 &&
    j < playingBoardSize - 1 &&
    symbol === getSymbol(getCell(i + 1, j + 1))
  ) {
    inDiagonalRight++;
    i++;
    j++;
  }

  if (inDiagonalRight >= symbolsToWin) {
    return true;
  }

  return false;
};
