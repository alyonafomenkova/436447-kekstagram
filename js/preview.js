'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCloseBtn = bigPicture.querySelector('.big-picture__cancel');
  var commentInput = bigPicture.querySelector('.social__footer-text');

  function createBigPicture(photo) {
    bigPicture.querySelector('.big-picture__img > img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    return bigPicture;
  }

  function openBigPicture() {
    document.querySelector('body').classList.add('modal-open');
    window.preview.bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', onBigPictureEscPress);
  }

  function closeBigPicture() {
    document.querySelector('body').classList.remove('modal-open');
    window.preview.bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
  }

  function onBigPictureEscPress(evt) {
    if (evt.keyCode === window.utils.ESC_KEYCODE && commentInput !== document.activeElement) {
      closeBigPicture();
    }
  }

  bigPictureCloseBtn.addEventListener('click', closeBigPicture);

  window.preview = {
    bigPicture: bigPicture,
    createBigPicture: createBigPicture,
    openBigPicture: openBigPicture
  };
})();
