"use strict";

(() => {

  const writeBtn = document.querySelector(`.export-buttons__button--clipboard`);
  const inputBannerHTML = document.querySelector(`.form__control--export-html`);
  const buttonToJson = document.querySelector(`.export-buttons__button--to-json`);

  const copyToClipboard = (value, button) => {
    navigator.clipboard.writeText(value)
    .then(() => {
      if (button.innerText !== `скопировано!`) {
        const originalText = button.innerText;
        button.innerText = `скопировано!`;
        setTimeout(() => {
          button.innerText = originalText;
        }, 1500);
      }
    })
    .catch((err) => {
      console.log(`Something went wrong`, err);
    });
  };

  const copy = (container, button) => {
    const inputValue = container.value.trim();
    if (inputValue) {
      copyToClipboard(inputValue, button);
    }
  };

  const serialize = () => {
    const html = window.clipboard.inputBannerHTML.textContent;
    const data = {html};
    return JSON.stringify(data);
  };


  const onWriteButtonClick = () => {
    copy(inputBannerHTML, writeBtn);
  };

  const onButtonToJsonClick = () => {
    const json = serialize();
    copyToClipboard(json, buttonToJson);
  };

  writeBtn.addEventListener(`click`, onWriteButtonClick);
  buttonToJson.addEventListener(`click`, onButtonToJsonClick);

  window.clipboard = {
    inputBannerHTML
  };

})();
