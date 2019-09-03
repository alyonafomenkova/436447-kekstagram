'use strict';

var NUMBER_OF_PHOTOS = 25;
var MIN_PHOTO_INDEX = 1;
var MAX_PHOTO_INDEX = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var COMMENTS_NUMBER = {
  MIN: 0,
  MAX: 10
}; 'TODO: Проверить enum'
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

var urls = shuffleArray(getPhotoUrl());
var avatars = getAvatar();

// вспомогательная функция getRandomInteger
function getRandomInteger(min, max) {
  return min + Math.floor(Math.random() * (max + 1 - min));
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

  for (var i = MIN_PHOTO_INDEX; i <= MAX_PHOTO_INDEX; i++) {
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
      avatar: avatars.splice(0, 1)[0],
      // splice(0, 1) - удаляем 1 элемент с индексом 0. Метод splice возвращает массив удалённых эл-ов. Нам нужен сам элемент, поэтому [0]
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
    });
  }
  return photos;
}

var res = generatePhotos(NUMBER_OF_PHOTOS);
console.log('res: ', res);
