
(() => {
  "use strict"

  const writeBtn = document.querySelector('.export-buttons__button--clipboard');
  const inputBannerHTML = document.querySelector('.form__control--export-html');


  writeBtn.addEventListener('click', () => {
    const inputValue = inputBannerHTML.value.trim();
    if (inputValue) {
      navigator.clipboard.writeText(inputValue)
      .then(() => {
        if (writeBtn.innerText !== 'Copied!') {
          const originalText = writeBtn.innerText;
          writeBtn.innerText = 'Copied!';
          setTimeout(() => {
            writeBtn.innerText = originalText;
          }, 1500);
        }
      })
      .catch(err => {
        console.log('Something went wrong', err);
      })
    }
  });

  window.clipboard = {
    inputBannerHTML
  };

})();
