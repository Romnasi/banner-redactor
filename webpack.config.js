const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/canvas.js",
    "./js/color.js",
    "./js/text.js",
    "./js/save-png.js",
    "./js/add-image.js",
    "./js/clipboard.js",
    "./js/modify-text.js",
    "./js/robo.js",
    "./js/tabs.js",
    "./js/gradient.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
