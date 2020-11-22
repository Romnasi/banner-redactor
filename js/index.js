"use strict"

const inputColor = document.querySelector('.form__control--color');
const inputText = document.querySelector('.form__control--text');
const buttonSavePng = document.querySelector('.export-buttons__button--save-as-png');
const currentCanvas = document.querySelector('.drawingCanvas');
const inputCheckbox = document.querySelector(`.form-with-text__control--checkbox`);

let backgroundColor = 'pink';
let textContent = 'Кликни и пиши';
let saveWithtext = true;

// Дефолтная настройка
const canvas = new fabric.Canvas('canvas', {
  width: 360, // Исходная ширина 1080 / 3
  height: 640, // Исходная ширина 1920 / 3
  backgroundColor: backgroundColor
});

const text = new fabric.IText(textContent, {
  left: 60,
  top: 400,
  fill: 'black',
  fontSize: 30,
  fontFamily: 'Roboto',
});
console.log(text.text);
canvas.add(text);


// Отрисовываем canvas
const renderCanvas = () => {
  canvas.clear();

  canvas.backgroundColor = backgroundColor;
  canvas.add(text);
};


const removeText = () => {
  canvas.remove(text);
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


inputText.addEventListener('input', () => {
  canvas.remove(text);
  text.text = inputText.value;
  canvas.add(text);
  // return text
});


buttonSavePng.addEventListener('click', () => {
  saveToPNG();
});

canvas.on('text:changed', function(e) {
  inputText.value = e.target.text;
});


inputCheckbox.addEventListener('change', ()=> {
  console.log(text.text);
  saveWithtext = inputCheckbox.checked;
  if (!saveWithtext) {
    canvas.remove(text);
  } else {
    canvas.add(text);
  }
});
