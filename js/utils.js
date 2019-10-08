'use strict';

(function () {
  var ESC_KEYCODE = 27;

  function getRandomInteger(min, max) {
    return min + Math.floor(Math.random() * (max + 1 - min));
  }

  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function shuffleArray(arr) {
    var out = arr.slice(0);
    var j;
    var temp;
    for (var i = out.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = out[j];
      out[j] = out[i];
      out[i] = temp;
    }
    return out;
  }

  function createElement(tagName, className, text) {
    var element = document.createElement(tagName);
    element.classList.add(className);
    if (text) {
      element.textContent = text;
    }
    return element;
  }


  function closeErrorPage() {
    document.querySelector(".error").remove();
    document.removeEventListener('keydown', onErrorPageEscPress);
  }

  function onErrorPageEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeErrorPage();
    }
  }

  function closeSuccessPage() {
    document.querySelector(".success").remove();
    document.removeEventListener('keydown', onSuccessPageEscPress);
  }

  function onSuccessPageEscPress(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeSuccessPage();
    }
  }

  window.utils = {
    ESC_KEYCODE: ESC_KEYCODE,
    getRandomInteger: getRandomInteger,
    getRandomElement: getRandomElement,
    shuffleArray: shuffleArray,
    createElement: createElement,
    closeErrorPage: closeErrorPage,
    onErrorPageEscPress: onErrorPageEscPress,
    closeSuccessPage: closeSuccessPage,
    onSuccessPageEscPress: onSuccessPageEscPress
  };
})();
