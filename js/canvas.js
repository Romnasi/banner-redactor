// canvas.js

"use strict";

(() => {

  const Canvas = {
    BACKGROUND_COLOR: `#b744d4`
  };

  const inputColor = document.querySelector(`.form__control--color`);


  let backgroundColor = Canvas.BACKGROUND_COLOR;


  // Дефолтная настройка
  const canvas = new window.fabric.Canvas(`canvas`, {
    width: 282, // Исходная ширина 141 (x2)
    height: 376, // Исходная высота 188 (x2)
    backgroundColor
  });


  inputColor.addEventListener(`change`, () => {
    canvas.backgroundColor = inputColor.value;
    canvas.renderAll();
  });


  window.canvas = {
    canvas
  };


})();
