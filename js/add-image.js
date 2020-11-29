// add-image.js

"use strict";

(() => {

  const fileChooser = document.querySelector(`.form__control--file`);
  const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];


  fileChooser.addEventListener(`change`, function (e) {
    const file = e.target.files[0];

    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();
      reader.onload = function (f) {
        const data = f.target.result;
        window.fabric.Image.fromURL(data, function (img) {
          const oImg = img.set({
            left: 20,
            top: 20,
            angle: `00`,
          }).scale(0.3);
          window.canvas.canvas.add(oImg).renderAll();

        });
      };
      reader.readAsDataURL(file);
    }

  });


})();
