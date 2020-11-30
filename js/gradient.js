// gradient.js
"use strict";

(() => {

  const createGradient = () => {
    const gradient = new window.fabric.Gradient({
      type: `linear`,
      coords: {
        x1: 0,
        y1: 0,
        x2: window.canvas.canvas.width,
        y2: window.canvas.canvas.height,
      },
      colorStops: [
        {
          color: `rgb(166,111,213)`,
          offset: 0,
        },
        {
          color: `rgba(106, 72, 215, 0.5)`,
          offset: 0.5,
        },
        {
          color: `#200772`,
          offset: 1,
        }
      ]});
    window.canvas.canvas.backgroundColor = gradient.toLive(window.canvas.canvas.contextContainer);
    window.canvas.canvas.renderAll();
  };

  window.gradient = {
    createGradient
  };


})();
