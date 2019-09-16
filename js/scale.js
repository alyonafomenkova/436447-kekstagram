'use strict';

(function () {
  var ZOOM_STEP = 25;
  var ZOOM_MIN = 25;
  var ZOOM_MAX = 100;
  var zoomOutBtn = window.form.uploadWindow.querySelector('.scale__control--smaller');
  var zoomInBtn = window.form.uploadWindow.querySelector('.scale__control--bigger');
  var scaleInput = window.form.uploadWindow.querySelector('.scale__control--value');

  function setScaleValue(number) {
    scaleInput.setAttribute('value', number + '%');
  }

  setScaleValue(ZOOM_MAX);

  zoomOutBtn.addEventListener('click', function () {
    var currentScaleValue = scaleInput.value.substring(0, scaleInput.value.length - 1);
    if (currentScaleValue > ZOOM_MIN) {
      var newScaleValue = currentScaleValue - ZOOM_STEP;
      setScaleValue(newScaleValue);
      window.upload.previewPhoto.style.transform = 'scale(' + (newScaleValue / 100).toFixed(2) + ')';
    }
  });

  zoomInBtn.addEventListener('click', function () {
    var currentScaleValue = scaleInput.value.substring(0, scaleInput.value.length - 1);
    if (currentScaleValue < ZOOM_MAX) {
      var newScaleValue = Number(currentScaleValue) + Number(ZOOM_STEP);
      setScaleValue(newScaleValue);
      window.upload.previewPhoto.style.transform = 'scale(' + (newScaleValue / 100).toFixed(2) + ')';
    }
  });
})();
