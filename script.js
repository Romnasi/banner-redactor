const fileChooser = document.querySelector(`.form__control--file`);
const inputText = document.querySelector(`.form__control--text`);
const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

canvas = document.querySelector(".drawingCanvas");
context = canvas.getContext("2d");


//Текст
let textContent = `Здесь будет ваш текст`;

context.textBaseline = "top";
context.font = "bold 20px Arial";
context.fillStyle = "black";
context.fillText(textContent, 10, 10);


inputText.addEventListener(`input`, () => {
  textContent = inputText.value;
  context.fillText(textContent, 10, 10);
});


// Создаем объект изображения
var img = new Image();

const showPreview = (fileChooser, preview) => {
  fileChooser.addEventListener(`change`, () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        img.src = reader.result;
      });

      reader.readAsDataURL(file);

      // Привязываем функцию к событию onload
      img.onload = function() {
      	context.drawImage(img, 0, 0);
      };
    }
  });
};


showPreview(fileChooser, img);
