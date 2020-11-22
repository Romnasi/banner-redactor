(() => {
  "use strict"

  const DEFAULT_TEXT = 'Кликни и пиши';
  const DEFAULT_LINK = 'https://www.avito.ru';
  const inputText = document.querySelector('.form__control--text');
  const inputLink = document.querySelector('.form__control--link');
  const inputCheckbox = document.querySelector(`.form-with-text__control--checkbox`);

  let saveWithtext = true;
  let currentLink = 'https://www.avito.ru';

  const getBannerHTML = () => {
    return `<a href="${currentLink}" style="color: white">
      <div class="story-previewer-preview-2LCEH story-previewer-viewed-1bSIJ" style="position: relative">
        <img width="141" height="188" srcset="https://www.avito.st/s/app/i/story-previews/story-51/preview@3x.jpg 2x, https://www.avito.st/s/app/i/story-previews/story-51/preview@2x.jpg" src="https://www.avito.st/s/app/i/story-previews/story-51/preview@2x.jpg" class="story-previewer-image-pkKji" alt="Ура!">
        <div class="story-previewer-title-eJkxt" style="position: absolute; top: 120px; left: 10px; width: 141px">Продают собственники</div>
      </div>
    </a>`;
  };


  window.clipboard.inputBannerHTML.textContent = getBannerHTML();


  const text = new fabric.IText(DEFAULT_TEXT, {
    left: 25,
    top: 220,
    fill: 'black',
    fontSize: 30,
    fontFamily: 'Roboto',
  });
  window.canvas.canvas.add(text);


  window.canvas.canvas.on('text:changed', function(e) {
    inputText.value = e.target.text;
  });


  inputCheckbox.addEventListener('change', ()=> {
    saveWithtext = inputCheckbox.checked;
    if (!saveWithtext) {
      window.canvas.canvas.remove(text);
    } else {
      window.canvas.canvas.add(text);
    }
  });


  inputText.addEventListener('input', () => {
    window.canvas.canvas.remove(text);
    text.text = inputText.value;
    window.canvas.canvas.add(text);
  });


  inputLink.addEventListener('input', (e) => {
    currentLink = inputLink.value;
    window.clipboard.inputBannerHTML.textContent = getBannerHTML();
  });

  window.configBanner = {
    text
  };

})();
