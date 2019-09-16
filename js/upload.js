'use strict';

(function () {
  var previewPhoto = document.querySelector('.img-upload__preview > img');

  function showEffectsPreviewPhotos(src) {
    var effectsPreviewList = window.form.uploadWindow.querySelectorAll('.effects__preview');

    for (var i = 0; i < effectsPreviewList.length; i++) {
      effectsPreviewList[i].style.backgroundImage = 'url(' + src + ')';
    }
  }

  function showPreviewPhoto() {
    var selectedImg = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    if (!selectedImg.type.startsWith('image/')) {
      console.log('Не картинка'); // TODO: Добавить сообщение об ошибке, если пользователь загружает не картинку
      return;
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
