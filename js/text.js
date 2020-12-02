// text.js

"use strict";

(() => {

  const Default = {
    TEXT: `Кликни — \nи двигай \nтекст!`,
    BANNER_TEXT_X: 10, // yes
    BANNER_TEXT_Y: 110, // yes
    CANVAS_TO_BANNER_RATIO: 2 // yes
  };

  const text = new window.fabric.Text(Default.TEXT, {
    left: Default.BANNER_TEXT_X * Default.CANVAS_TO_BANNER_RATIO,
    top: Default.BANNER_TEXT_Y * Default.CANVAS_TO_BANNER_RATIO,
    fill: `white`,
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

  window.text = {
    text
  };


})();
