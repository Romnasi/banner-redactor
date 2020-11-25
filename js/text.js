"use strict";

(() => {

  const Default = {
    TEXT: `Кликни и пиши`,
    BANNER_TEXT: `Текст баннера`,
    LINK: `https://www.avito.ru`
  };

  const MAX_NUMBER_OF_LINES = 3;

  const inputText = document.querySelector(`.form__control--banner-text`);
  const inputLink = document.querySelector(`.form__control--link`);
  const inputCheckboxWithText = document.querySelector(`.export-buttons__control--with-text`);
  const htmlContainer = document.querySelector(`.preview__html-container`);

  let saveWithtext = true;
  let currentLink = Default.LINK;
  let currentText = Default.BANNER_TEXT;


  const replaceForTitle = (text) => {
    return text.replace(/\n/g, `<br>`);
  };


  const replaceForAlt = (text) => {
    return text.replace(/\n/g, ` `);
  };


  const getBannerHTML = () => {

    const textForTitle = replaceForTitle(currentText);
    const textForAlt = replaceForAlt(currentText);

    return `<a href="${currentLink}" style="color: white">
  <div class="story-previewer-preview-2LCEH story-previewer-viewed-1bSIJ" style="position: relative; display: inline-block">
    <img width="141" height="188"
        srcset="https://www.avito.st/s/app/i/story-previews/story-51/preview@3x.jpg 2x,
        https://www.avito.st/s/app/i/story-previews/story-51/preview@2x.jpg"
        src="https://www.avito.st/s/app/i/story-previews/story-51/preview@2x.jpg"
        class="story-previewer-image-pkKji" alt="${textForAlt}">
    <div class="story-previewer-title-eJkxt" style="position: absolute; top: 120px; left: 10px; width: 141px">${textForTitle}</div>
  </div>
</a>`;
  };


  window.clipboard.inputBannerHTML.textContent = getBannerHTML();


  const removeNodeChild = (node) => {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  };


  const refreshDemo = () => {
    removeNodeChild(htmlContainer);
    htmlContainer.insertAdjacentHTML(`afterbegin`, window.clipboard.inputBannerHTML.textContent);
  };

  refreshDemo();


  const text = new window.fabric.IText(Default.TEXT, {
    left: 25,
    top: 220,
    fill: `black`,
    fontSize: 30,
    fontFamily: `Roboto`,
    // hasRotatingPoint: `false`,
  });

  window.canvas.canvas.add(text);


  // Убираем возможность вращения и масшабирования текста в canvas
  text.setControlsVisibility({
    mt: false,
    mb: false,
    ml: false,
    mr: false,
    tr: false,
    tl: false,
    br: false,
    bl: false,
    mtr: false
  });


  window.canvas.canvas.on(`text:changed`, function (e) {
    // Ограничиваем количество строк 3-мя
    let lines = e.target.text.split(`\n`);
    if (lines.length > MAX_NUMBER_OF_LINES) {
      lines = lines.slice(0, MAX_NUMBER_OF_LINES);
    }
    e.target.text = lines.join(`\n`);

    inputText.value = e.target.text;
    // Отрисовываем текст баннера в textarea
    currentText = e.target.text;
    window.clipboard.inputBannerHTML.textContent = getBannerHTML();
    refreshDemo();
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

    if (lines.length > MAX_NUMBER_OF_LINES) {
      inputText.setCustomValidity(`Для этого макета доступно только 3 строки`);
      lines = lines.slice(0, MAX_NUMBER_OF_LINES);
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
    refreshDemo();
  });


  inputLink.addEventListener(`input`, () => {
    // Отрисовываем текст баннера в textarea
    currentLink = inputLink.value;
    window.clipboard.inputBannerHTML.textContent = getBannerHTML();
    refreshDemo();
  });

  window.configBanner = {
    text
  };

})();
