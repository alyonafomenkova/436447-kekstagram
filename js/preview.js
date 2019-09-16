'use strict';

(function () {
  var MAX_COMMENTS_VIEW_NUMBER = 5;
  var Comment = {
    CLASS: 'social__comment',
    IMG_CLASS: 'social__picture',
    TEXT_CLASS: 'social__text',
    IMG_ALT: 'Аватар комментатора фотографии',
    IMG_WIDTH: 35,
    IMG_HEIGHT: 35
  };
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCloseBtn = bigPicture.querySelector('.big-picture__cancel');
  var commentsContainer = document.querySelector('.social__comments');
  var commentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var commentInput = bigPicture.querySelector('.social__footer-text');

  function createBigPicture(photo) {
    bigPicture.querySelector('.big-picture__img > img').src = photo.url;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    return bigPicture;
  }

  function createComment(element) {
    var listItem = window.utils.createElement('li', Comment.CLASS);
    var image = window.utils.createElement('img', Comment.IMG_CLASS);
    var text = window.utils.createElement('p', Comment.TEXT_CLASS, element);

    image.src = window.utils.getRandomElement(window.data.avatars);
    image.alt = Comment.IMG_ALT;
    image.width = Comment.IMG_WIDTH;
    image.height = Comment.IMG_HEIGHT;

    listItem.appendChild(image);
    listItem.appendChild(text);
    return listItem;
  }

  function createCommentsList(array) {
    commentsContainer.innerHTML = '';

    if (array.length === 0) {
      return;
    }
    var commentItem;

    if (array.length > MAX_COMMENTS_VIEW_NUMBER) {
      for (var i = 0; i < MAX_COMMENTS_VIEW_NUMBER; i++) {
        commentItem = createComment(array[i].message);
        commentsContainer.appendChild(commentItem);
      }
    } else {
      for (var j = 0; j < array.length; j++) {
        commentItem = createComment(array[j].message);
        commentsContainer.appendChild(commentItem);
      }
    }
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

  commentCount.classList.add('visually-hidden');
  commentsLoader.classList.add('visually-hidden');
  bigPictureCloseBtn.addEventListener('click', closeBigPicture);

  window.preview = {
    commentsContainer: commentsContainer,
    bigPicture: bigPicture,
    createBigPicture: createBigPicture,
    createCommentsList: createCommentsList,
    openBigPicture: openBigPicture
  };
})();
