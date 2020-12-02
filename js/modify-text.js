// modify-text.js
"use strict";

(() => {

  const Default = {
    BANNER_TEXT: `Кликни — \nи двигай \nтекст!`,
    BANNER_TEXT_X: 10,
    BANNER_TEXT_Y: 110,
    BANNER_WIDTH: 141,
    BANNER_HEIGHT: 188,
    BANNER_IMG_SRC: `https://www.avito.st/s/app/i/story-previews/story-51/preview@2x.jpg`,
    BANNER_LINK: `https://avito.ru`,
    CANVAS_TO_BANNER_RATIO: 2,
    BANNER_TEXT_COLOR: `#ffffff`
  };

  const MAX_NUMBER_OF_LINES = 3;

  const inputText = document.querySelector(`.form__control--banner-text`);
  const inputLink = document.querySelector(`.form__control--link`);
  const htmlContainer = document.querySelector(`.preview__html-container`);
  const inputWithDataURL = document.querySelector(`.form__control--export-data-url`);


  let currentLink = Default.BANNER_LINK;
  let currentText = Default.BANNER_TEXT;
  let bannerTextX = Default.BANNER_TEXT_X;
  let bannerTextY = Default.BANNER_TEXT_Y;
  let currentImgSrc = Default.BANNER_IMG_SRC;
  let currentTextColor = Default.BANNER_TEXT_COLOR;


  const getBannerHTML = () => {

    const textForTitle = currentText.replace(/\n/g, `<br>`);
    const textForAlt = currentText.replace(/\n/g, ` `);

    currentTextColor = window.text.text.fill;

    return `<a href="${currentLink}" style="color: ${currentTextColor}">
  <div class="story-previewer-preview-2LCEH story-previewer-viewed-1bSIJ" style="position: relative; display: inline-block; overflow: hidden">
    <img width="${Default.BANNER_WIDTH}" height="${Default.BANNER_HEIGHT}" src="${currentImgSrc}" style="border-radius: 8px"
        class="story-previewer-image-pkKji" alt="${textForAlt}">
    <div class="story-previewer-title-eJkxt" style="position: absolute; top: ${bannerTextY}px; left: ${bannerTextX}px; font-size: 18px; line-height: 21px; width: 141px">${textForTitle}</div>
  </div>
</a>`;
  };


  const getDataURL = () => {
    window.canvas.canvas.remove(window.text.text);
    const dataURL = window.canvas.canvas.toDataURL({
      format: `png`,
      quality: 1
    });
    window.canvas.canvas.add(window.text.text);

    return dataURL;
  };

  let currentDataURL = getDataURL();


  const getBannerWithDataURL = (refreshImage) => {

    if (refreshImage) {
      currentDataURL = getDataURL();
    }

    currentTextColor = window.text.text.fill;

    const textForTitle = currentText.replace(/\n/g, `<br>`);
    const textForAlt = currentText.replace(/\n/g, ` `);

    return `<a href="${currentLink}" style="color: ${currentTextColor}">
  <div class="story-previewer-preview-2LCEH story-previewer-viewed-1bSIJ" style="position: relative; display: inline-block; overflow: hidden">
    <img width="${Default.BANNER_WIDTH}" height="${Default.BANNER_HEIGHT}" src="${currentDataURL}" style="border-radius: 8px"
        class="story-previewer-image-pkKji" alt="${textForAlt}">
    <div class="story-previewer-title-eJkxt" style="position: absolute; top: ${bannerTextY}px; left: ${bannerTextX}px; font-size: 18px; line-height: 21px; width: 141px">${textForTitle}</div>
  </div>
</a>`;
  };


  const renderTextareaShowConfig = () => {
    window.clipboard.inputBannerHTML.textContent = getBannerHTML();
  };
  renderTextareaShowConfig();


  const renderTextareaShowDataURL = (refreshImage) => {

    inputWithDataURL.textContent = getBannerWithDataURL(refreshImage);
  };
  renderTextareaShowDataURL();


  const renderDemo = () => {
    window.util.removeNodeChild(htmlContainer);
    htmlContainer.insertAdjacentHTML(`afterbegin`, inputWithDataURL.textContent);
  };
  renderDemo();


  const updateData = () => {
    renderTextareaShowConfig();
    renderTextareaShowDataURL();
    renderDemo();
  };
  const updateDataWithImage = () => {
    renderTextareaShowConfig();
    renderTextareaShowDataURL(true);
    renderDemo();
  };

  const debouncedRender = window.util.debounce(updateData);
  const debouncedRenderWithImage = window.util.debounce(updateDataWithImage);


  const onCanvasTextMouseMove = (e) => {
    if (e.target) {
      if (e.target.type === `text`) {
        // Ограничиваем перемещение текста по оси x
        if (e.target.left > Default.BANNER_WIDTH * Default.CANVAS_TO_BANNER_RATIO) {
          e.target.left = Default.BANNER_WIDTH * Default.CANVAS_TO_BANNER_RATIO - 20;
        } else if (e.target.left < 0) {
          e.target.left = 0;
        }

        // Ограничиваем перемещение текста по оси y
        if (e.target.top > Default.BANNER_HEIGHT * Default.CANVAS_TO_BANNER_RATIO) {
          e.target.top = Default.BANNER_HEIGHT * Default.CANVAS_TO_BANNER_RATIO - 20;
        } else if (e.target.top < 0) {
          e.target.top = 0;
        }

        bannerTextX = e.target.left / Default.CANVAS_TO_BANNER_RATIO;
        bannerTextY = e.target.top / Default.CANVAS_TO_BANNER_RATIO;

        debouncedRender();
      } else if (e.target.type === `image`) {
        debouncedRenderWithImage();
      }
    }
  };


  const onCanvasTextChange = (e) => {
    // Ограничиваем количество строк 3-мя
    let lines = e.target.text.split(`\n`);
    if (lines.length > MAX_NUMBER_OF_LINES) {
      lines = lines.slice(0, MAX_NUMBER_OF_LINES);
    }
    e.target.text = lines.join(`\n`);
    inputText.value = e.target.text;
    currentText = e.target.text;
    debouncedRender();
  };


  const onInputTextChange = () => {
    let lines = inputText.value.split(`\n`);

    if (lines.length > MAX_NUMBER_OF_LINES) {
      inputText.setCustomValidity(`Для этого макета доступно только 3 строки`);
      window.robo.say(`Только 3 строки...`);
      lines = lines.slice(0, MAX_NUMBER_OF_LINES);
    } else {
      inputText.setCustomValidity(``);
    }
    inputText.value = lines.join(`\n`);
    inputText.reportValidity();

    window.canvas.canvas.remove(window.text.text);
    window.text.text.text = inputText.value;
    window.canvas.canvas.add(window.text.text);

    currentText = inputText.value;
    debouncedRender();
  };


  const onInputLinkChange = () => {
    currentLink = inputLink.value;
    debouncedRender();
  };


  window.canvas.canvas.on(`mouse:move`, onCanvasTextMouseMove);
  window.canvas.canvas.on(`text:changed`, onCanvasTextChange);
  inputText.addEventListener(`input`, onInputTextChange);
  inputLink.addEventListener(`input`, onInputLinkChange);


  window.modifyText = {
    updateData,
    updateDataWithImage
  };

})();
