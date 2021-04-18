'use strict';

const whoseTurnIndicator = 'circle';

const makeATurn = (event) => {
  event.target.classList.add('cell--circle');
};

const cells = document.querySelectorAll('.cell');

for (let i = 0; i < cells.length; i += 1) {
  cells[i].addEventListener('click', makeATurn);
}
