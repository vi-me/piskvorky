'use strict';

let whoseTurn = 'circle'; /*  = document.querySelector('.cell--cross'); */
/* let cellsWithCircles = document.querySelector('.cell--circle');
let cellsWithCrosses */ let whoseTurnIndicatorIcon = document.querySelector(
  '.game-page__player-icon',
);

const makeATurn = (event) => {
  if (
    event.target.classList.contains('cell--taken') === true ||
    event.target.classList.contains('img-in-cell')
  ) {
    console.log('Dané pole je již obsazené.');
  } else if (whoseTurn === 'circle') {
    event.target.classList.add('cell--circle', 'cell--taken');
    event.target.innerHTML = `<img class="img-in-cell"  src="images/circle.svg"  alt="Cell taken by Player O"/> `;
    event.target.setAttribute('disabled', true);

    console.log('Hráč "O" ukončil svůj tah. Na tahu je hráč "X"');
    whoseTurnIndicatorIcon.src = 'images/cross.svg';
    whoseTurn = 'cross';
  } else {
    event.target.classList.add('cell--cross', 'cell--taken');
    event.target.innerHTML = `<img class="img-in-cell" src="images/cross.svg"  alt="Cell taken by Player X"/>`;
    event.target.setAttribute('disabled', true);
    whoseTurn = 'circle';
    whoseTurnIndicatorIcon.src = 'images/circle.svg';
    console.log('Hráč "X" ukončil svůj tah. Na tahu je hráč "O"');
  }
};

const cells = document.querySelectorAll('.cell');

for (let i = 0; i < cells.length; i += 1) {
  cells[i].addEventListener('click', makeATurn);
}
