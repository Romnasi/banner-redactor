// save-png.js
"use strict";

(() => {

  const inputCheckboxWithText = document.querySelector(`.export-buttons__control--with-text`);
  const buttonSavePng = document.querySelector(`.export-buttons__button--save-as-png`);
  const currentCanvas = document.querySelector(`.preview__canvas`);
  let saveWithtext = false;


  const oninputCheckboxWithTextChange = () => {
    saveWithtext = inputCheckboxWithText.checked;
  };

  const saveToPNG = () => {
    currentCanvas.toBlob((blob) => {
      window.saveAs(blob, `preview.png`);
    });
  };

  const discardActiveObject = () => {
    // Если есть активные элементы - сбрасываем выделенные объекты,
    // чтобы не было видно на картинке
    if (window.canvas.canvas.getActiveObject()) {
      window.canvas.canvas.discardActiveObject().renderAll();
    }
  };

  const save = () => {
    discardActiveObject();
    saveToPNG();
  };


  const hideText = () => {
    window.text.text.set(`fill`, `transparent`);
    window.canvas.canvas.requestRenderAll();
  };

  const showText = () => {
    window.text.text.set(`fill`, `white`);
    window.canvas.canvas.requestRenderAll();
  };

  const onButtonSavePngClick = () => {
    if (!saveWithtext) {
      hideText();
      setTimeout(save, 100);
      setTimeout(showText, 100);
    } else {
      save();
    }
    window.robo.say(`Изображение готово..`);
  };

  inputCheckboxWithText.addEventListener(`change`, oninputCheckboxWithTextChange);
  buttonSavePng.addEventListener(`click`, onButtonSavePngClick);

})();
