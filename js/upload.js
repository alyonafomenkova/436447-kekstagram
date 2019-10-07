'use strict';

(function () {
  var previewPhoto = document.querySelector('.img-upload__preview > img');

  function showEffectsPreviewPhotos(src) {
    var effectsPreviewList = window.form.uploadWindow.querySelectorAll('.effects__preview');

    for (var i = 0; i < effectsPreviewList.length; i++) {
      effectsPreviewList[i].style.backgroundImage = 'url(' + src + ')';
    }
  }

  function showError() {
    var overlayBlock = document.querySelector('.img-upload__overlay');
    var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorMessageTemplate.cloneNode(true);
    var errorTitle = errorElement.querySelector('.error__title');
    errorTitle.textContent = "Ошибка в формате. Пожалуйста, попробуйте загрузить другое фото.";
    overlayBlock.appendChild(errorElement);
    document.querySelector(".error__button").addEventListener('click', function(evt) {
      evt.preventDefault();
      document.querySelector(".img-upload__overlay").classList.add("hidden");
      window.utils.closeErrorPage();
    });
    document.addEventListener('keydown', window.utils.onErrorPageEscPress);
  }

  function showPreviewPhoto() {
    var selectedImg = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    if (!selectedImg.type.startsWith('image/')) {
      showError();
    }

    reader.onloadend = function () {
      previewPhoto.src = reader.result;
      showEffectsPreviewPhotos(reader.result);
    };

    if (selectedImg) {
      reader.readAsDataURL(selectedImg);
    } else {
      previewPhoto.src = '';
    }
  }

  window.upload = {
    previewPhoto: previewPhoto,
    showPreviewPhoto: showPreviewPhoto,
    showEffectsPreviewPhotos: showEffectsPreviewPhotos
  };
})();
