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
  var commentsContainer = document.querySelector('.social__comments');
  var commentCount = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');

  function createComment(element) {
    var listItem = window.utils.createElement('li', Comment.CLASS);
    var image = window.utils.createElement('img', Comment.IMG_CLASS);
    var text = window.utils.createElement('p', Comment.TEXT_CLASS, element.message);

    image.src = element.avatar;
    image.alt = Comment.IMG_ALT;
    image.width = Comment.IMG_WIDTH;
    image.height = Comment.IMG_HEIGHT;

    listItem.appendChild(image);
    listItem.appendChild(text);
    return listItem;
  }

  function createCommentsList(array) {
    var commentItem;
    for (var i = 0; i < array.length && i < MAX_COMMENTS_VIEW_NUMBER; i++) {
      commentItem = createComment(array[i]);
      commentsContainer.appendChild(commentItem);
    }
  }

  commentCount.classList.add('visually-hidden');
  commentsLoader.classList.add('visually-hidden');

  window.comments = {
    commentsContainer: commentsContainer,
    createCommentsList: createCommentsList,
  };
})();
