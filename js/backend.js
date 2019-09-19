'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data1';
  // var URL_SAVE = 'https://js.dump.academy/kekstagram';
  var REQUEST_TIMEOUT = 10000;
  var RequestStatuses = {
    OK: 200,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    SERVER: 500
  };

  function onErrorLoading(error) {
    var mainBlock = document.querySelector('main');
    var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorMessageTemplate.cloneNode(true);
    errorElement.textContent = error;
    mainBlock.appendChild(errorElement);
  }

  function load(onSuccess, onError) {
    var xhr = new XMLHttpRequest(); // Создаём новый XMLHttpRequest-объект
    xhr.responseType = 'json'; // В ответе ожидаем JSON (парсится автоматически)
    xhr.timeout = REQUEST_TIMEOUT; // готовы ждать ответ от сервера 10s

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case RequestStatuses.OK:
          onSuccess(xhr.response);
          break;
        case RequestStatuses.MOVED_PERMANENTLY:
          onError('Похоже, сервер переехал. ' + 'Код ошибки: ' + xhr.status);
          break;
        case RequestStatuses.FOUND:
          onError('Сервер временно переехал, но скоро вернется. ' + 'Код ошибки: ' + xhr.status);
          break;
        case RequestStatuses.BAD_REQUEST:
          onError('Некорректный запрос. ' + 'Код ошибки: ' + xhr.status);
          break;
        case RequestStatuses.UNAUTHORIZED:
          onError('Вы должны быть авторизованы. ' + 'Код ошибки: ' + xhr.status);
          break;
        case RequestStatuses.NOT_FOUND:
          onError('Запрашиваемая Вами страница не найдена. ' + 'Код ошибки: ' + xhr.status);
          break;
        case RequestStatuses.SERVER:
          onError('Извините, небольшие неполадки с сервером. Приходите завтра. ' + 'Код ошибки: ' + xhr.status);// может быть xhr.statusText ?
          break;
        default:
          onError('Что-то пошло не так... ' + 'код ошибки: ' + xhr.status);
      }
    }); // происходит, когда получен какой-либо ответ, включая ответы с HTTP-ошибкой
    // Важно поставить load перед send, т.к. запрос м.б.и не нужен, а данные возьмутся из кеша

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    }); // когда запрос не может быть выполнен, например, нет соединения или невалидный URL
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    }); // запрос не успел выполниться за установленный таймаут

    xhr.open('GET', URL_LOAD); // Инициализируем запрос: указываем метод и URL
    xhr.send(); // Отсылаем запрос
  }
  window.backend = {
    load: load,
    onErrorLoading: onErrorLoading
  };
})();
