'use strict';

let whoseTurn = 'circle';

let whoseTurnIndicatorIcon = document.querySelector('.game-page__player-icon');

const makeATurn = (event) => {
  if (whoseTurn === 'circle') {
    event.target.classList.add('cell--circle');
    whoseTurn = 'cross';
    whoseTurnIndicatorIcon.src = 'images/cross.svg';
  } else {
    event.target.classList.add('cell--cross');
    whoseTurn = 'circle';
    whoseTurnIndicatorIcon.src = 'images/circle.svg';
  }
};

const cells = document.querySelectorAll('.cell');

for (let i = 0; i < cells.length; i += 1) {
  cells[i].addEventListener('click', makeATurn);
}
