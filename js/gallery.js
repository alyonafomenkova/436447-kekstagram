'use strict';

(function () {
  var pictures = document.querySelector('.pictures');
  var loadedPhotos = [];
  var completeListener = function() {};

  function setOnCompleteListener(listener) {
    completeListener = listener;
  }

  function getLoadedPhotos() {
    return loadedPhotos;
  }

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

  function clearPictures() {
    var photosList = pictures.querySelectorAll('.picture');
    photosList.forEach(function(item) {
      pictures.removeChild(item);
    });
  }

  function onSuccessLoading(photos) {
    loadedPhotos = photos;
    renderPictures(photos);
    completeListener();
  }

  window.gallery = {
    loadedPhotos: loadedPhotos,
    setOnCompleteListener: setOnCompleteListener,
    getLoadedPhotos: getLoadedPhotos,
    renderPictures: renderPictures,
    clearPictures: clearPictures
  };

  window.backend.load(onSuccessLoading, window.backend.onErrorLoading); // загрузка данных с сервера
})();
