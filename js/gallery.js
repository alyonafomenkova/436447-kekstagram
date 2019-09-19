'use strict';

(function () {
  var pictures = document.querySelector('.pictures');

  function onPhotoClick(photo) {
    // Создание функции (вызывается сразу при задании через addEventListener)
    return function () {
      // Выполняется позже (по клику)
      window.preview.createBigPicture(photo);
      window.preview.commentsContainer.innerHTML = '';
      window.preview.createCommentsList(photo.comments);
      window.preview.openBigPicture();
    };
  }

  function renderPictures(photosArr) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photosArr.length; i++) {
      var createdPicture = window.picture.createPicture(photosArr[i]);
      createdPicture.addEventListener('click', onPhotoClick(photosArr[i]));
      fragment.appendChild(createdPicture);
    }
    pictures.appendChild(fragment);
  }

  function onSuccessLoading(photos) {
    renderPictures(photos);
  }

  window.backend.load(onSuccessLoading, window.backend.onErrorLoading); // загрузка данных с сервера
})();
