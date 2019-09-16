'use strict';

(function () {
  var picture = document.querySelector('#picture').content.querySelector('.picture');

  function createPicture(photo) {
    var pictureElement = picture.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    return pictureElement;
  }

  window.picture = {
    createPicture: createPicture
  };
})();
