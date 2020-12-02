// canvas.js

"use strict";

(() => {

  const Canvas = {
    BACKGROUND_COLOR: `#b744d4`,
    WIDTH: 141,
    HEIGHT: 188,
    RATIO: 2
  };

  const backgroundColor = Canvas.BACKGROUND_COLOR;


  // Дефолтная настройка
  const canvas = new window.fabric.Canvas(`canvas`, {
    width: Canvas.WIDTH * Canvas.RATIO, // Исходная ширина 141 (x2)
    height: Canvas.HEIGHT * Canvas.RATIO, // Исходная высота 188 (x2)
    backgroundColor
  });


  window.canvas = {
    canvas
  };


})();
