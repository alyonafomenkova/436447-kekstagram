'use strict';
// Моковые данные
var NUMBER_OF_PHOTOS = 25;
var MIN_PHOTO_INDEX = 1;
var MAX_PHOTO_INDEX = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_AVATAR_INDEX = 1;
var MAX_AVATAR_INDEX = 6;
var COMMENTS_NUMBER = {
  MIN: 0,
  MAX: 6
}; // TODO: Проверить enum
var SENTENCE_NUMBER = {
  MIN: 1,
  MAX: 2
};
var COMMENTS_TEXT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = [
  'Анна', 'Василий', 'Алёна', 'Пётр', 'Андрей', 'Настя', 'Михаил', 'Паша', 'Маша', 'Сергей', 'Катя', 'Артём',
  'Михаил', 'Марина', 'Лиза', 'Вова', 'Ксения', 'Стас', 'Николай', 'Таня', 'Валентина', 'Ирина', 'Захар', 'Никита', 'Юрий',
];
var DESCRIPTIONS = [
  'Тестим новую камеру!',
  'Наконец-то отпуск!',
  'Еда. Много еды.',
  'Отдыхаем...',
  'Я и мои друзья :)',
  'Пробежал полумарафон...'
];

var urls = shuffleArray(getPhotoUrl());
var avatars = getAvatar();

// вспомогательная функция getRandomInteger
function getRandomInteger(min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
}

// вспомогательная функция getRandomInteger
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// вспомогательная функция shuffleArray
function shuffleArray(arr) {
  var out = arr.slice(0);
  var j;
  var temp;
  for (var i = out.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = out[j];
    out[j] = out[i];
    out[i] = temp;
  }
  return out;
}

function getPhotoUrl() {
  var array = [];

  for (var i = MIN_PHOTO_INDEX; i <= MAX_PHOTO_INDEX; i++) {
    array.push('photos/' + i + '.jpg');
  }
  return array;
}

function getAvatar() {
  var array = [];

  for (var i = MIN_AVATAR_INDEX; i <= MAX_AVATAR_INDEX; i++) {
    array.push('img/avatar-' + i + '.svg');
  }
  return array;
}

function createCommentDefiniteLength() {
  var numberOfSentences = getRandomInteger(SENTENCE_NUMBER.MIN, SENTENCE_NUMBER.MAX);
  shuffleArray(COMMENTS_TEXT);

  if (numberOfSentences === SENTENCE_NUMBER.MIN) {
    return COMMENTS_TEXT[0];
  } else {
    return COMMENTS_TEXT.slice(0, 2);
  }
}

function generateComments(count) {
  var randomComments = [];

  for (var i = 0; i < count; i++) {
    randomComments.push({
      avatar: getRandomElement(avatars),
      message: createCommentDefiniteLength(),
      name: NAMES.splice(0, 1)[0]
    });
  }
  return randomComments;
}

function generatePhotos(count) {
  var photos = [];

  for (var i = 0; i < count; i++) {
    photos.push({
      url: urls.splice(0, 1)[0],
      // splice(0, 1) - удаляем 1 элемент с индексом 0. Метод splice возвращает массив удалённых эл-ов. Нам нужен сам элемент, поэтому [0]
      likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
      comments: generateComments(getRandomInteger(COMMENTS_NUMBER.MIN, COMMENTS_NUMBER.MAX)),
      description: getRandomElement(shuffleArray(DESCRIPTIONS))
    });
  }
  return photos;
}

// Создание DOM-элементов соответствующих фотографиям и заполнение их данными из массива
var pictures = document.querySelector('.pictures');
var picture = document.querySelector('#picture').content.querySelector('.picture');
var photos = generatePhotos(NUMBER_OF_PHOTOS);

function createPicture(photo) {
  var pictureElement = picture.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments;
  return pictureElement;
}

// Создание главного изображение
var ESC_KEYCODE = 27;
var bigPicture = document.querySelector('.big-picture');
var commentsContainer = document.querySelector('.social__comments');
var Comment = {
  CLASS: 'social__comment',
  IMG_CLASS: 'social__picture',
  TEXT_CLASS: 'social__text',
  IMG_ALT: 'Аватар комментатора фотографии',
  IMG_WIDTH: 35,
  IMG_HEIGHT: 35
};
var MAX_COMMENTS_VIEW_NUMBER = 5;

function createBigPicture(photo) {
  bigPicture.querySelector('.big-picture__img').src = photo.url;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  return bigPicture;
}

function createElement(tagName, className, text) {
  var element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
}

function createComment(element) {
  var listItem = createElement('li', Comment.CLASS);
  var image = createElement('img', Comment.IMG_CLASS);
  var text = createElement('p', Comment.TEXT_CLASS, element);

  image.src = getRandomElement(avatars);
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

var commentCount = document.querySelector('.social__comment-count');
var commentsLoader = document.querySelector('.comments-loader');

commentCount.classList.add('visually-hidden');
commentsLoader.classList.add('visually-hidden');

// Отрисовка сгенерированных DOM-элементов в блок, показ большого изображения при клике
var bigPictureCloseBtn = bigPicture.querySelector('.big-picture__cancel');

function openSetupBigPicture() {
  document.querySelector('body').classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onBigPictureEscPress);
}

function closeSetupBigPicture() {
  document.querySelector('body').classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onBigPictureEscPress);
}

function onBigPictureEscPress(evt) {
  // if (evt.keyCode === ESC_KEYCODE && commentField !== document.activeElement) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeSetupBigPicture();
  }
}

function showFullscreenPicture(photo) {
  return function () {
    createBigPicture(photo);
    commentsContainer.innerHTML = '';
    createCommentsList(photo.comments);
    openSetupBigPicture();
  };
}

function renderPictures(photosArr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photosArr.length; i++) {
    var createdPicture = createPicture(photosArr[i]);
    createdPicture.addEventListener('click', showFullscreenPicture(photosArr[i]));
    fragment.appendChild(createdPicture);
  }
  pictures.appendChild(fragment);
}

renderPictures(photos);

// Загрузка изображения и показ формы редактирования
var uploadBtn = document.querySelector('.img-upload__input');
var uploadWindow = document.querySelector('.img-upload__overlay');
var uploadWindowClose = uploadWindow.querySelector('.img-upload__cancel');
var previewPhoto = document.querySelector('.img-upload__preview > img');

function showEffectsPreviewPhotos(src) {
  var effectsPreviewList = uploadWindow.querySelectorAll('.effects__preview');

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

function onPageEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeUploadWindow();
  }
}

function closeUploadWindow() {
  uploadWindow.classList.add('hidden');
  document.removeEventListener('keydown', onPageEscPress);
  uploadBtn.value = '';
}

function openUploadWindow() {
  showPreviewPhoto();
  showEffectsPreviewPhotos();
  uploadWindow.classList.remove('hidden');
  document.addEventListener('keydown', onPageEscPress);
}

uploadBtn.addEventListener('change', openUploadWindow);
uploadWindowClose.addEventListener('click', closeUploadWindow);
bigPictureCloseBtn.addEventListener('click', closeSetupBigPicture);

// Применение эффекта для изображения и Редактирование размера изображения
var effectSlider = uploadWindow.querySelector('.effect-level');
var noEffect = uploadWindow.querySelector('.effects__preview--none');
var chromeEffect = uploadWindow.querySelector('.effects__preview--chrome');
var sepiaEffect = uploadWindow.querySelector('.effects__preview--sepia');
var marvinEffect = uploadWindow.querySelector('.effects__preview--marvin');
var phobosEffect = uploadWindow.querySelector('.effects__preview--phobos');
var heatEffect = uploadWindow.querySelector('.effects__preview--heat');

function clearClassList(element) {
  var classList = element.classList;

  while (classList.length > 0) {
    classList.remove(classList.item(0));
  }
}

function applyEffects() {
  noEffect.addEventListener('click', function () {
    clearClassList(previewPhoto);
    effectSlider.classList.add('visually-hidden');
  });

  chromeEffect.addEventListener('click', function () {
    clearClassList(previewPhoto);
    effectSlider.classList.remove('visually-hidden');
    previewPhoto.classList.add('effects__preview--chrome');
  });

  sepiaEffect.addEventListener('click', function () {
    clearClassList(previewPhoto);
    effectSlider.classList.remove('visually-hidden');
    previewPhoto.classList.add('effects__preview--sepia');
  });

  marvinEffect.addEventListener('click', function () {
    clearClassList(previewPhoto);
    effectSlider.classList.remove('visually-hidden');
    previewPhoto.classList.add('effects__preview--marvin');
  });

  phobosEffect.addEventListener('click', function () {
    clearClassList(previewPhoto);
    effectSlider.classList.remove('visually-hidden');
    previewPhoto.classList.add('effects__preview--phobos');
  });

  heatEffect.addEventListener('click', function () {
    clearClassList(previewPhoto);
    effectSlider.classList.remove('visually-hidden');
    previewPhoto.classList.add('effects__preview--heat');
  });
}

applyEffects();
