'use strict';

let whoseTurn = 'circle'; /*  = document.querySelector('.cell--cross'); */
/* let cellsWithCircles = document.querySelector('.cell--circle');
let cellsWithCrosses */ let whoseTurnIndicatorIcon = document.querySelector(
  '.game-page__player-icon',
);

const cells = document.querySelectorAll('.cell');

const makeATurn = (event) => {
  if (isWinningMove(event.target) === true) {
    alert('Hra skončila!');
  }
  /*   if (
    event.target.classList.contains('cell--taken') === true ||
    event.target.classList.contains('img-in-cell')
  ) {
    console.log('Dané pole je již obsazené.');
  } else  */ if (
    whoseTurn === 'circle'
  ) {
    event.target.classList.add('cell--circle', 'cell--taken');
    event.target.innerHTML = `<img class="img-in-cell"  src="images/circle.svg"  alt="Cell taken by Player O"/> `;
    event.target.setAttribute('disabled', true);

    whoseTurn = 'cross';
    whoseTurnIndicatorIcon.src = 'images/cross.svg';
    console.log('Hráč "O" ukončil svůj tah. Na tahu je hráč "X"');
  } else {
    event.target.classList.add('cell--cross', 'cell--taken');
    event.target.innerHTML = `<img class="img-in-cell" src="images/cross.svg"  alt="Cell taken by Player X"/>`;
    event.target.setAttribute('disabled', true);

    whoseTurn = 'circle';
    whoseTurnIndicatorIcon.src = 'images/circle.svg';
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

  let inRow = 1; // Jednička pro právě vybrané políčko
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

  let inColumn = 1;
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

  return false;
};
