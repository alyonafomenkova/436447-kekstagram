'use strict';

(function () {
  var filtersBlock = document.querySelector('.img-filters');
  var Filter = {
    POPULAR: filtersBlock.querySelector('#filter-popular'),
    NEW: filtersBlock.querySelector('#filter-new'),
    DISCUSSED: filtersBlock.querySelector('#filter-discussed'),
  };

  function changeClass(target) {
    for (var key in Filter) {
      var item = Filter[key];
      item.classList.remove('img-filters__button--active');
    }
    target.classList.add('img-filters__button--active');
  }

  function applyPopularFilter(photos) {
    return photos;
  }

  function applyNewFilter(photos) {
    var filteredArray = photos.slice();
    window.utils.shuffleArray(filteredArray);
    return filteredArray.slice(0, 10);
  }

  function applyDiscussedFilter(photos) {
    console.log('photos: ', photos);
    var filteredArray = photos.slice();
    return filteredArray.slice(0, 2);
  }

  function onPopularFilterClick(evt) {
    var photos = window.gallery.getLoadedPhotos();
    changeClass(evt.target);
    window.gallery.clearPictures();
    var popularPhotos = applyPopularFilter(photos);
    window.gallery.renderPictures(popularPhotos);
  }

  function onNewFilterClick(evt) {
    var photos = window.gallery.getLoadedPhotos();
    var newPhotos = applyNewFilter(photos);
    changeClass(evt.target);
    window.gallery.clearPictures();
    window.gallery.renderPictures(newPhotos);
  }

  function onDiscussedFilterClick(evt) {
    var photos = window.gallery.getLoadedPhotos();
    var discussedPhotos = applyDiscussedFilter(photos);
    changeClass(evt.target);
    window.gallery.clearPictures();
    window.gallery.renderPictures(discussedPhotos);
  }

  function showFilters() {
    filtersBlock.classList.remove('img-filters--inactive');
    Filter.POPULAR.addEventListener('click', onPopularFilterClick);
    Filter.NEW.addEventListener('click', onNewFilterClick);
    Filter.DISCUSSED.addEventListener('click', onDiscussedFilterClick);
  }

  window.gallery.setOnCompleteCallback(function() {
    showFilters();
  })

  window.filter = {
    showFilters: showFilters,
  };
})();
