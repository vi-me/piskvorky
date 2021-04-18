'use strict';

const whoseTurnIndicator = 'circle';

const makeATurn = (event) => {
  event.target.classList.add('cell--circle');
};

document.querySelector('.cell').addEventListener('click', makeATurn);
