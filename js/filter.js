'use strict';

(function () {
  var filtersBlock = document.querySelector('.img-filters');
  var Filter = {
    POPULAR: filtersBlock.querySelector('#filter-popular'),
    NEW: filtersBlock.querySelector('#filter-new'),
    DISCUSSED: filtersBlock.querySelector('#filter-discussed'),
  };

  function onNewFilterClick() {
    console.log('new filter click!');
  }

  function showFilters() {
    filtersBlock.classList.remove('img-filters--inactive');
    console.log('Filter.NEW: ', Filter.NEW);
    Filter.NEW.addEventListener('click', onNewFilterClick);
  }

  window.filter = {
    showFilters: showFilters,
  };
})();
