// color.js
"use strict";

(() => {

  const inputColor = document.querySelector(`.form__control--background-color`);
  const inputColorHex = document.querySelector(`.form__control--color-hex`);
  const inputTextColor = document.querySelector(`.form__control--text-color`);
  const inputTextColorHex = document.querySelector(`.form__control--text-color-hex`);

  const changebackgroundColor = (changedInput, connectedInput) => {
    window.canvas.canvas.backgroundColor = changedInput.value;
    connectedInput.value = changedInput.value;
    window.canvas.canvas.renderAll();
    window.modifyText.updateDataWithImage();
  };

  const changeTextColor = (changedInput, connectedInput) => {
    window.text.text.set(`fill`, changedInput.value);
    connectedInput.value = changedInput.value;
    window.canvas.canvas.renderAll();
    window.modifyText.updateData();
  };

  const onInputColorHexChange = () => {
    changebackgroundColor(inputColorHex, inputColor);
  };

  const onInputColorChange = () => {
    changebackgroundColor(inputColor, inputColorHex);
  };

  const onInputTextColorChange = () => {
    changeTextColor(inputTextColor, inputTextColorHex);
  };

  const onInputTextColorHexChange = () => {
    changeTextColor(inputTextColorHex, inputTextColor);
  };

  inputColorHex.addEventListener(`change`, onInputColorHexChange);
  inputColor.addEventListener(`change`, onInputColorChange);
  inputTextColor.addEventListener(`change`, onInputTextColorChange);
  inputTextColorHex.addEventListener(`change`, onInputTextColorHexChange);

})();
