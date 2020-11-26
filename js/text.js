"use strict";

(() => {

  const Default = {
    TEXT: `Кликни — \nпиши \nи двигай!`,
    BANNER_TEXT: `Текст баннера`,
    BANNER_TEXT_X: 10,
    BANNER_TEXT_Y: 110,
    BANNER_WIDTH: 141,
    BANNER_HEIGHT: 188,
    LINK: `https://avito.ru`,
    CANVAS_TO_BANNER_RATIO: 2
  };

  const MAX_NUMBER_OF_LINES = 3;

  const inputText = document.querySelector(`.form__control--banner-text`);
  const inputLink = document.querySelector(`.form__control--link`);
  const inputCheckboxWithText = document.querySelector(`.export-buttons__control--with-text`);
  const htmlContainer = document.querySelector(`.preview__html-container`);

  let saveWithtext = true;
  let currentLink = Default.LINK;
  let currentText = Default.BANNER_TEXT;
  let bannerTextX = Default.BANNER_TEXT_X;
  let bannerTextY = Default.BANNER_TEXT_Y;
  let ratio = Default.CANVAS_TO_BANNER_RATIO;


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
    <img width="${Default.BANNER_WIDTH}" height="${Default.BANNER_HEIGHT}"
        srcset="https://www.avito.st/s/app/i/story-previews/story-51/preview@3x.jpg 2x,
        https://www.avito.st/s/app/i/story-previews/story-51/preview@2x.jpg"
        src="https://www.avito.st/s/app/i/story-previews/story-51/preview@2x.jpg"
        class="story-previewer-image-pkKji" alt="${textForAlt}">
    <div class="story-previewer-title-eJkxt" style="position: absolute; top: ${bannerTextY}px; left: ${bannerTextX}px; font-size: 18px; line-height: 21px; width: 141px">${textForTitle}</div>
  </div>
</a>`;
  };


  const renderTextareaShowConfig = () => {
    window.clipboard.inputBannerHTML.textContent = getBannerHTML();
  };
  renderTextareaShowConfig();


  const removeNodeChild = (node) => {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  };


  const renderDemo = () => {
    removeNodeChild(htmlContainer);
    htmlContainer.insertAdjacentHTML(`afterbegin`, window.clipboard.inputBannerHTML.textContent);
  };
  renderDemo();


  const updateData = () => {
    renderTextareaShowConfig();
    renderDemo();
  };


  const text = new window.fabric.IText(Default.TEXT, {
    left: Default.BANNER_TEXT_X * ratio,
    top: Default.BANNER_TEXT_Y * ratio,
    fill: `black`,
    fontSize: 36,
    lineHeight: 1.16, // Default Value: 1.16
    fontFamily: `Roboto`,
  });


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


  window.canvas.canvas.add(text);


  const onCanvasTextChange = (e) => {
    // Ограничиваем количество строк 3-мя
    let lines = e.target.text.split(`\n`);
    if (lines.length > MAX_NUMBER_OF_LINES) {
      lines = lines.slice(0, MAX_NUMBER_OF_LINES);
    }
    e.target.text = lines.join(`\n`);
    inputText.value = e.target.text;
    currentText = e.target.text;
    updateData();
  };


  const onInputTextChange = () => {
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

    currentText = inputText.value;
    updateData();
  };


  const onInputLinkChange = () => {
    currentLink = inputLink.value;
    updateData();
  };


  const oninputCheckboxWithTextChange = () => {
    saveWithtext = inputCheckboxWithText.checked;
    if (!saveWithtext) {
      window.canvas.canvas.remove(text);
    } else {
      window.canvas.canvas.add(text);
    }
  };


  window.canvas.canvas.on(`text:changed`, onCanvasTextChange);
  inputText.addEventListener(`input`, onInputTextChange);
  inputLink.addEventListener(`input`, onInputLinkChange);
  inputCheckboxWithText.addEventListener(`change`, oninputCheckboxWithTextChange);


  window.canvas.canvas.on(`mouse:move`, (e) => {
    if (e.target) {
      if (e.target.type === `i-text`) {
        bannerTextX = e.target.left / ratio;
        bannerTextY = e.target.top / ratio;
        updateData();
      }
    }
  });

  window.configBanner = {
    text
  };

})();
