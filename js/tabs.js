// tabs.js
"use strict";

(() => {
  // Tabs
  const tabLink = document.querySelector(`.export-buttons__show-config--link`);
  const tabDataURI = document.querySelector(`.export-buttons__show-config--data-uri`);
  // Wrappers textarea
  const textareaWrapperLink = document.querySelector(`.export-buttons__textarea-item--export-html`);
  const textareaWrapperDataURI = document.querySelector(`.export-buttons__textarea-item--export-data-url`);


  const switchTab = (selectedEl, adjacentEl, selectedButton, adjacentButton) => {
    const tabIsHidden = selectedEl.classList.contains(`export-buttons__textarea-item--hidden`);
    const buttonIsHidden = selectedButton.classList.contains(`export-buttons__show-config--hidden`);

    if (tabIsHidden && buttonIsHidden) {
      selectedEl.classList.remove(`export-buttons__textarea-item--hidden`);
      adjacentEl.classList.add(`export-buttons__textarea-item--hidden`);

      selectedButton.classList.remove(`export-buttons__show-config--hidden`);
      adjacentButton.classList.add(`export-buttons__show-config--hidden`);
    }
  };

  const onTabLinkClick = () => {
    switchTab(textareaWrapperLink, textareaWrapperDataURI, tabLink, tabDataURI);
  };

  const onTabDataURIClick = () => {
    switchTab(textareaWrapperDataURI, textareaWrapperLink, tabDataURI, tabLink);
  };

  tabLink.addEventListener(`click`, onTabLinkClick);
  tabDataURI.addEventListener(`click`, onTabDataURIClick);

})();
