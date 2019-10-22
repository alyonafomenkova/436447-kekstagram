'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var loadedPhotos = [];
  var completeCallback = function () {};

  function setOnCompleteCallback(listener) {
    completeCallback = listener; // Задаём функцию (код) извне, который будет выполняться в onSuccessLoading
  }

  function getLoadedPhotos() {
    return loadedPhotos;
  }

  function onPhotoClick(photo) {
    // Создание функции (вызывается сразу при задании через addEventListener)
    return function () {
      // Выполняется позже (по клику)
      window.preview.createBigPicture(photo);
      window.comments.commentsContainer.innerHTML = '';
      window.comments.onCommentsLoaded(photo.comments);
      window.comments.loadMoreComments(window.comments.COMMENTS_STEP);
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

  function clearPictures() {
    var photosList = pictures.querySelectorAll('.picture');
    photosList.forEach(function (item) {
      pictures.removeChild(item);
    });
  }

  function onSuccessLoading(photos) {
    loadedPhotos = photos;
    renderPictures(photos);
    completeCallback();
  }

  window.gallery = {
    loadedPhotos: loadedPhotos,
    setOnCompleteCallback: setOnCompleteCallback,
    getLoadedPhotos: getLoadedPhotos,
    renderPictures: renderPictures,
    clearPictures: clearPictures
  };

  window.backend.load(onSuccessLoading, window.backend.onErrorLoading); // загрузка данных с сервера
})();
