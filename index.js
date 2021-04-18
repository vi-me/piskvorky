'use strict';

let whoseTurn = 'circle';
let cellsWithCircles = document.querySelector('.cell--circle');
let cellsWithCrosses = document.querySelector('.cell--cross');

let whoseTurnIndicatorIcon = document.querySelector('.game-page__player-icon');

const makeATurn = (event) => {
  if (whoseTurn === 'circle') {
    event.target.classList.add('cell--circle');
    event.target.innerHTML = `<img class="img-in-cell"  src="images/circle.svg" alt="Cell taken by Player O"/>`;
    whoseTurnIndicatorIcon.src = 'images/cross.svg';
    whoseTurn = 'cross';
  } else {
    event.target.classList.add('cell--cross');
    event.target.innerHTML = `<img class="img-in-cell" src="images/cross.svg" alt="Cell taken by Player X"/>`;
    whoseTurn = 'circle';
    whoseTurnIndicatorIcon.src = 'images/circle.svg';
  }
};

const cells = document.querySelectorAll('.cell');

for (let i = 0; i < cells.length; i += 1) {
  cells[i].addEventListener('click', makeATurn);
}
