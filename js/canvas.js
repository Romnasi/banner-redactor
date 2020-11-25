// canvas.js

"use strict";

(() => {

  const inputColor = document.querySelector(`.form__control--color`);
  const buttonSavePng = document.querySelector(`.export-buttons__button--save-as-png`);
  const currentCanvas = document.querySelector(`.preview__canvas`);

  let backgroundColor = `pink`;


  // Дефолтная настройка
  const canvas = new window.fabric.Canvas(`canvas`, {
    width: 282, // Исходная ширина 141 (x2)
    height: 376, // Исходная высота 188 (x2)
    backgroundColor
  });


  const saveToPNG = () => {
    currentCanvas.toBlob((blob) => {
      window.saveAs(blob, `pretty image.png`);
    });
  };


  inputColor.addEventListener(`change`, () => {
    canvas.backgroundColor = inputColor.value;
    canvas.renderAll();
  });


  buttonSavePng.addEventListener(`click`, () => {
    // Если есть активные элементы - сбрасываем выделенные объекты,
    // чтобы не было видно на картинке

    if (canvas.getActiveObject()) {
      canvas.discardActiveObject().renderAll();
      saveToPNG();
    } else {
      saveToPNG();
    }
  });


  window.canvas = {
    canvas
  };


})();
