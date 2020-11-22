
(() => {
  "use strict"

  const inputColor = document.querySelector('.form__control--color');
  const buttonSavePng = document.querySelector('.export-buttons__button--save-as-png');
  const currentCanvas = document.querySelector('.drawingCanvas');

  let backgroundColor = 'pink';


  // Дефолтная настройка
  const canvas = new fabric.Canvas('canvas', {
    width: 282, // Исходная ширина 141 (x2)
    height: 376, // Исходная высота 188 (x2)
    backgroundColor: backgroundColor
  });


  // Отрисовываем canvas
  const renderCanvas = () => {
    canvas.clear();

    canvas.backgroundColor = backgroundColor;
    canvas.add(window.configBanner.text);
  };


  const saveToPNG = () => {
    currentCanvas.toBlob((blob) => {
      saveAs(blob, "pretty image.png");
    });
  };


  inputColor.addEventListener('change', () => {
    backgroundColor = inputColor.value;
    renderCanvas();
  });


  buttonSavePng.addEventListener('click', () => {
    saveToPNG();
  });


  window.canvas = {
    canvas
  };


})();
