'use strict';

(function () {
  var HASHTAG = {
    pattern: /^#[А-Яа-яЁёA-Za-z]{1,19}$/,
    // ^# - не символ #
    // [А-Яа-яЁёA-Za-z] - любая буква независимо от регистра и языка
    // $ - регулярными выражениями, следует искать только в конце строки
    maxCount: 5
  };
  var VALIDITY_MESSAGES = {
    tooManyHashtags: 'Нельзя указывать больше 5 хэш-тегов',
    notUnique: 'Один и тот же хэш-тег не может быть использован дважды',
    brokenPattern: 'Убедитесь, что: хэш-теги начинаются с #, длинна хэш-тегов не больше 20 символов, хэш-теги разделены пробелами.'
  };
  var uploadWindow = document.querySelector('.img-upload__overlay');
  var uploadBtn = document.querySelector('.img-upload__input');
  var uploadWindowClose = uploadWindow.querySelector('.img-upload__cancel');
  var hashtagInput = uploadWindow.querySelector('.text__hashtags');
  var commanetInput = uploadWindow.querySelector('.text__description');
  var form = document.querySelector(".img-upload__form");

  function convertStringIntoArray(field) {
    return field.value.split(' ');
  }

  function checkElementsInArray(array, pattern) {
    var counter = true;
    for (var i = 0; i < array.length; i++) {
      if (!pattern.test(array[i])) {
        counter = false;
      }
    }
    return counter;
  }

  function deleteSimilarElementsInArray(array) {
    var object = {};
    for (var i = 0; i < array.length; i++) {
      var str = array[i].toLowerCase();
      object[str] = true;
    }
    return Object.keys(object);
  }

  function onPageEscPress(evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE && hashtagInput !== document.activeElement && commanetInput !== document.activeElement) {
      closeUploadWindow();
    }
  }

  function closeUploadWindow() {
    uploadWindow.classList.add('hidden');
    document.removeEventListener('keydown', onPageEscPress);
    uploadBtn.value = '';
  }

  function openUploadWindow() {
    document.querySelector(".img-upload__overlay").classList.remove("hidden");
    window.upload.showPreviewPhoto();
    window.upload.showEffectsPreviewPhotos();
    window.form.uploadWindow.classList.remove('hidden');
    document.addEventListener('keydown', onPageEscPress);
  }

  function resetRadioInputs() {
    var radioInputs = document.querySelectorAll('input[type="radio"]');
    for (var i = 0; i < radioInputs.length; i++) {
      radioInputs[i].checked = false;
    }
  }

  function resetInput() {
    hashtagInput.value = '';
    commanetInput.value = '';
    resetRadioInputs();
  }

  function showSuccessWindow() {
    var mainBlock = document.querySelector('main');
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successWindow = successTemplate.cloneNode(true);
    mainBlock.appendChild(successWindow);
  }

  function onPostSuccess () {
    uploadWindow.classList.add('hidden');
    resetInput();
    showSuccessWindow();
    document.querySelector(".success__button").addEventListener('click', function(evt) {
      evt.preventDefault();
      window.utils.closeSuccessPage();
    });
    document.addEventListener('keydown', window.utils.onSuccessPageEscPress);
  }

  hashtagInput.addEventListener('input', function (evt) {
    var hashtagsArray = convertStringIntoArray(hashtagInput);
    var target = evt.target;

    if (hashtagsArray.length > HASHTAG.maxCount) {
      target.setCustomValidity(VALIDITY_MESSAGES.tooManyHashtags);
    } else if (!checkElementsInArray(hashtagsArray, HASHTAG.pattern)) {
      target.setCustomValidity(VALIDITY_MESSAGES.brokenPattern);
    } else if (hashtagsArray.length !== deleteSimilarElementsInArray(hashtagsArray).length) {
      target.setCustomValidity(VALIDITY_MESSAGES.notUnique);
    } else {
      target.setCustomValidity('');
    }
    if (hashtagInput.value === '') {
      target.setCustomValidity('');
    }
  });
  uploadBtn.addEventListener('change', openUploadWindow);
  uploadWindowClose.addEventListener('click', closeUploadWindow);

  form.addEventListener('submit', function(evt) {
    window.backend.save(new FormData(form), onPostSuccess, window.backend.onErrorLoading);
    evt.preventDefault();
  });

  window.form = {
    uploadWindow: uploadWindow,
  };
})();
