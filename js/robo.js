// robo.js
"use strict";

(() => {

  const roboTextBox = document.querySelector(`.promo__robo-text`);
  const roboFlashesh = document.querySelector(`.robo__flashes`);
  const previewInfoBtn = document.querySelector(`.preview__info-btn`);


  const say = (phrase) => {
    roboTextBox.textContent = phrase;
    roboTextBox.classList.remove(`promo__robo-text--animation`);
    roboFlashesh.classList.remove(`robo__flashes--animation`);
    void roboTextBox.offsetWidth;
    roboTextBox.classList.add(`promo__robo-text--animation`);
    roboFlashesh.classList.add(`robo__flashes--animation`);
  };


  const startPhrase = () => {
    say(`создадим баннер!`);
  };

  setTimeout(startPhrase, 4000);


  previewInfoBtn.addEventListener(`click`, () => {
    say(`Можно двигать текст`);
  });


  window.robo = {
    say
  };

})();
