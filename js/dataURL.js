// dataURL.js
'use strict';

(() => {
  let dataURL = [];

  const set = (newDataURL) => {
    dataURL = newDataURL;
  };

  const get = () => {
    return dataURL;
  };


  window.dataURL = {
    get,
    set
  };

})();
