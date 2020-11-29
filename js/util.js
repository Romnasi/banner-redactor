// util.js
"use strict";

(() => {

  const DEBOUNCE_INTERVAL = 500; // ms

  const removeNodeChild = (node) => {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  };


  const debounce = (cb) => {
    let lastTimeout;

    return (...parameters) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };


  window.util = {
    removeNodeChild,
    debounce
  };

})();
