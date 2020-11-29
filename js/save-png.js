// save-png.js
"use strict";

(() => {

  const inputCheckboxWithText = document.querySelector(`.export-buttons__control--with-text`);
  const buttonSavePng = document.querySelector(`.export-buttons__button--save-as-png`);
  const currentCanvas = document.querySelector(`.preview__canvas`);
  let saveWithtext = false;


  const oninputCheckboxWithTextChange = () => {
    saveWithtext = inputCheckboxWithText.checked;
    if (saveWithtext) {
      window.canvas.canvas.remove(window.text.text);
      window.canvas.canvas.add(window.text.text);
    } else {
      window.canvas.canvas.remove(window.text.text);
    }
  };

  const saveToPNG = () => {
    currentCanvas.toBlob((blob) => {
      window.saveAs(blob, `preview.png`);
    });
  };


  buttonSavePng.addEventListener(`click`, () => {
    // Если есть активные элементы - сбрасываем выделенные объекты,
    // чтобы не было видно на картинке

    if (window.canvas.canvas.getActiveObject()) {
      window.canvas.canvas.discardActiveObject().renderAll();
      saveToPNG();
    } else {
      saveToPNG();
    }
  });

  inputCheckboxWithText.addEventListener(`change`, oninputCheckboxWithTextChange);

})();
