"use strict";

(() => {

  const DEFAULT_TEXT = `Кликни и пиши`;
  const DEFAULT_LINK = `https://www.avito.ru`;
  const inputText = document.querySelector(`.form__control--banner-text`);
  const inputLink = document.querySelector(`.form__control--link`);
  const inputCheckboxWithText = document.querySelector(`.export-buttons__control--with-text`);

  let saveWithtext = true;
  let currentLink = DEFAULT_LINK;
  let currentText = `Текст баннера`;

  const getBannerHTML = () => {
    return `<a href="${currentLink}" style="color: white">
  <div class="story-previewer-preview-2LCEH story-previewer-viewed-1bSIJ" style="position: relative; display: inline-block">
    <img width="141" height="188"
        srcset="https://www.avito.st/s/app/i/story-previews/story-51/preview@3x.jpg 2x,
        https://www.avito.st/s/app/i/story-previews/story-51/preview@2x.jpg"
        src="https://www.avito.st/s/app/i/story-previews/story-51/preview@2x.jpg"
        class="story-previewer-image-pkKji" alt="${currentText}">
    <div class="story-previewer-title-eJkxt" style="position: absolute; top: 120px; left: 10px; width: 141px">${currentText}</div>
  </div>
</a>`;
  };


  window.clipboard.inputBannerHTML.textContent = getBannerHTML();


  const text = new window.fabric.IText(DEFAULT_TEXT, {
    left: 25,
    top: 220,
    fill: `black`,
    fontSize: 30,
    fontFamily: `Roboto`,
  });

  window.canvas.canvas.add(text);


  window.canvas.canvas.on(`text:changed`, function (e) {
    // Ограничиваем количество строк 3-мя
    let lines = e.target.text.split(`\n`);
    if (lines.length > 3) {
      lines = lines.slice(0, 3);
    }
    e.target.text = lines.join(`\n`);

    inputText.value = e.target.text;
    // Отрисовываем текст баннера в textarea
    currentText = e.target.text;
    window.clipboard.inputBannerHTML.textContent = getBannerHTML();
  });


  inputCheckboxWithText.addEventListener(`change`, ()=> {
    saveWithtext = inputCheckboxWithText.checked;
    if (!saveWithtext) {
      window.canvas.canvas.remove(text);
    } else {
      window.canvas.canvas.add(text);
    }
  });


  inputText.addEventListener(`input`, () => {

    let lines = inputText.value.split(`\n`);

    if (lines.length > 3) {
      inputText.setCustomValidity(`Для этого макета доступно только 3 строки`);
      lines = lines.slice(0, 3);
    } else {
      inputText.setCustomValidity(``);
    }
    inputText.value = lines.join(`\n`);
    inputText.reportValidity();


    window.canvas.canvas.remove(text);
    text.text = inputText.value;
    window.canvas.canvas.add(text);
    // Отрисовываем текст баннера в textarea
    currentText = inputText.value;
    window.clipboard.inputBannerHTML.textContent = getBannerHTML();
  });


  inputLink.addEventListener(`input`, () => {
    // Отрисовываем текст баннера в textarea
    currentLink = inputLink.value;
    window.clipboard.inputBannerHTML.textContent = getBannerHTML();
  });

  window.configBanner = {
    text
  };

})();
