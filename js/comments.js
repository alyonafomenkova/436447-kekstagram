'use strict';

(function () {
  var COMMENTS_STEP = 5;
  var offset = 0;
  var Comment = {
    CLASS: 'social__comment',
    IMG_CLASS: 'social__picture',
    TEXT_CLASS: 'social__text',
    IMG_ALT: 'Аватар комментатора фотографии',
    IMG_WIDTH: 35,
    IMG_HEIGHT: 35,
  };
  var commentsContainer = document.querySelector('.social__comments');
  var commentCountBlock = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var allComments = [];
  var loadedCommentsNumber = 0;

  function updateCommentsNumber(number) {
    commentCountBlock.firstChild.textContent = '';
    commentCountBlock.firstChild.textContent = number;
  }

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

  function onCommentsLoaded(comments) {
    allComments = comments;
    commentsContainer.innerHTML = '';
    offset = 0;
    loadedCommentsNumber = 0;
    commentsLoader.classList.remove('visually-hidden');
  }

  function loadMoreComments(count) {
    var from = offset;
    var to = offset + count - 1;

    if (to >= allComments.length) {
      to = allComments.length - 1;
    }

    if (from > allComments.length) {
      return;
    }

    for (var i = from; i <= to; i++) {
      var commentItem = createComment(allComments[i]);
      commentsContainer.appendChild(commentItem);
      loadedCommentsNumber += 1;
    }

    if (loadedCommentsNumber === allComments.length) {
      commentsLoader.classList.add('visually-hidden');
    }

    offset += count;
    updateCommentsNumber(loadedCommentsNumber);
  }

  function onCommentsLoaderClick() {
    loadMoreComments(COMMENTS_STEP);
  }

  commentsLoader.addEventListener('click', onCommentsLoaderClick);

  window.comments = {
    COMMENTS_STEP: COMMENTS_STEP,
    commentsContainer: commentsContainer,
    onCommentsLoaded: onCommentsLoaded,
    loadMoreComments: loadMoreComments
  };
})();
