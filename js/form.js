import {MainMarker, mapActivation, setFilterForm} from './map.js';
import {mainPinMarker, centerMap} from './map.js';
import {getData} from './api.js';

const prices = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const adForm = document.querySelector('.ad-form');
const main = document.querySelector('main');
const mapFilters = document.querySelector('.map__filters');
const disableForm = main.querySelectorAll('fieldset');
const disableFilters = mapFilters.querySelectorAll('select');
const address = document.querySelector('#address');
const resetButton = adForm.querySelector('.ad-form__reset');
const formItems = document.querySelectorAll('.ad-form__element > input, .ad-form__element > select');
const priceInput = document.querySelector('#price');
const type = document.querySelector('#type');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const capacity = document.querySelector('#capacity');
const rooms = document.querySelector('#room_number');
const submitBtn = document.querySelector('.ad-form__submit');

submitBtn.addEventListener('click', () => {
  if (rooms.value < capacity.value || (Number(rooms.value) === 100) || Number(capacity.value) === 0) {
    capacity.setCustomValidity('Число гостей не соответствует числу комнат!');
    if (Number(rooms.value) === 100 && Number(capacity.value) === 0) {
      capacity.setCustomValidity('');
    }
  } else {
    capacity.setCustomValidity('');
  }
  formItems.forEach((item) => {
    item.removeAttribute('style');
  });
});

const resetPage = () => {
  adForm.reset();
  mapFilters.reset();
  mainPinMarker.setLatLng([
    MainMarker.LAT,
    MainMarker.LNG,
  ]);
  centerMap();
  address.value = `${MainMarker.LAT}, ${MainMarker.LNG}`;
  priceInput.min = prices.flat;
  priceInput.placeholder = prices.flat;
  getData((data) => {
    mapActivation(data);
    setFilterForm(data);
  });
};

type.addEventListener('change', (evt) => {
  priceInput.min = prices[evt.target.value];
  priceInput.placeholder = prices[evt.target.value];
});

timeIn.addEventListener('change', (evt) => {
  timeOut.value = evt.target.value;
});

timeOut.addEventListener('change', (evt) => {
  timeIn.value = evt.target.value;
});

const pageInactivation = () => {
  adForm.classList.add('ad-form--disabled');
  disableForm.forEach((item) => {
    item.disabled = true;
  });
  disableFilters.forEach((item) => {
    item.disabled = true;
  });
};

const activateForms = () => {
  adForm.classList.remove('ad-form--disabled');
  disableForm.forEach((item) => {
    item.removeAttribute('disabled');
  });
  disableFilters.forEach((item) => {
    item.removeAttribute('disabled');
  });
};

formItems.forEach((item) => {
  item.addEventListener('invalid', (evt) => {
    evt.target.style.border = '1px solid red';
  });
});

resetButton.addEventListener('click', () => {
  resetPage();
});

export {pageInactivation, activateForms, resetPage};
