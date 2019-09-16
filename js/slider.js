'use strict';

(function () {
  // Drag'n'drop
  var FIRST_PART_OF_CLASSNAME = 'effects__preview--';
  var effectSlider = window.form.uploadWindow.querySelector('.effect-level');
  var effectsList = window.form.uploadWindow.querySelector('.effects__list');
  var effectLevelBlock = window.form.uploadWindow.querySelector('.effect-level__line');
  var effectLevelPin = window.form.uploadWindow.querySelector('.effect-level__pin');
  var effectDepth = window.form.uploadWindow.querySelector('.effect-level__depth');
  var effectLevelValue = window.form.uploadWindow.querySelector('.effect-level__value');
  var selectedEffect = '';

  function calcBlockCoords(block) {
    var blockCoords = block.getBoundingClientRect();
    return {
      top: blockCoords.top + pageYOffset,
      left: blockCoords.left + pageXOffset,
      width: blockCoords.width
    };
  }

  function calcNewCoords(moveEvt, shift, block) {
    var blockCoords = calcBlockCoords(block);
    var elementCoordsLeft = moveEvt.clientX - shift - blockCoords.left;
    var blockRightEdge = block.offsetWidth - 1;

    if (elementCoordsLeft < 0) {
      elementCoordsLeft = 0;
    } else if (elementCoordsLeft > blockRightEdge) {
      elementCoordsLeft = blockRightEdge;
    }
    return elementCoordsLeft;
  }

  function getRatioValue(currentCoords, block) {
    return (currentCoords / calcBlockCoords(block).width).toFixed(2);
  }

  function getFilterValue(value) {
    var result;
    switch (selectedEffect) {
      case 'chrome':
        result = 'grayscale(' + value + ')';
        break;
      case 'sepia':
        result = 'sepia(' + value + ')';
        break;
      case 'marvin':
        result = 'invert(' + (value * 100) + '%)';
        break;
      case 'phobos':
        result = 'blur(' + (value * 3) + 'px)';
        break;
      case 'heat':
        result = 'brightness(' + (1 + value * 2) + ')';
        break;
      case 'none':
        result = 'none';
        break;
    }
    return result;
  }

  function getFieldsetInputValue(value) {
    var result;
    switch (selectedEffect) {
      case 'chrome':
        result = value;
        break;
      case 'sepia':
        result = value;
        break;
      case 'marvin':
        result = value * 100;
        break;
      case 'phobos':
        result = value * 3;
        break;
      case 'heat':
        result = 1 + value * 2;
        break;
    }
    return result;
  }

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var starCoords = {
      x: evt.clientX,
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: starCoords.x - moveEvt.clientX
      };

      starCoords = {
        x: moveEvt.clientX,
      };

      var finalCoords = calcNewCoords(moveEvt, shift.x, effectLevelBlock);
      effectLevelPin.style.left = finalCoords + 'px';
      effectDepth.style.width = finalCoords + 'px';

      var ratio = getRatioValue(finalCoords, effectLevelBlock);
      window.upload.previewPhoto.style.filter = getFilterValue(ratio);
      effectLevelValue.setAttribute('value', getFieldsetInputValue(ratio));
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Применение эффекта для изображения
  function clearClassList(element) {
    var classList = element.classList;

    while (classList.length > 0) {
      classList.remove(classList.item(0));
    }
  }

  function setPinPosition(value, block) {
    var maxRightPosition = calcBlockCoords(block).width;
    return (maxRightPosition * value) + 'px';
  }

  effectsList.addEventListener('click', function (evt) {
    var target = evt.target;
    var effectName = target.value;
    var className = FIRST_PART_OF_CLASSNAME + effectName;
    selectedEffect = effectName;
    effectSlider.style.display = className === 'effects__preview--none' ? 'none' : 'block';
    clearClassList(window.upload.previewPhoto);
    window.upload.previewPhoto.classList.add(className);
    window.upload.previewPhoto.style.filter = getFilterValue(1);
    effectLevelPin.style.left = setPinPosition(1, effectLevelBlock);
    effectDepth.style.width = setPinPosition(1, effectLevelBlock);
  });
})();
