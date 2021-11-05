import {mapActivation, MainMarker} from './map.js';
import {getData} from './data.js';
import {mainPinMarker} from './map.js';

const initValidation = function () {

  const prices = {
    bungalow: 0,
    flat: 100,
    hotel: 3000,
    house: 5000,
    palace: 10000,
  };
  const priceInput = document.querySelector('#price');
  const type = document.querySelector('#type');
  const timeIn = document.querySelector('#timein');
  const timeOut = document.querySelector('#timeout');

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
};

const adForm = document.querySelector('.ad-form');
const main = document.querySelector('main');
const mapFilters = document.querySelector('.map__filters');
const disableForm = main.querySelectorAll('fieldset');
const disableFilters = mapFilters.querySelectorAll('select');
const map = document.querySelector('.map__canvas');
const address = document.querySelector('#address');
const error = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = error.querySelector('.error__button');
const resetButton = adForm.querySelector('.ad-form__reset');

const onErrorMessage = function (errorMessage) {
  error.querySelector('p').textContent = errorMessage;
  main.appendChild(error);
  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      error.remove();
      document.removeEventListener('keydown', errorButton);
    }
  });
  errorButton.addEventListener('click', () => {
    error.remove();
    document.removeEventListener('keydown', errorButton);
  });
};

const pageInactivation = function () {
  adForm.classList.add('ad-form--disabled');
  disableForm.forEach((item) => {
    item.setAttribute('disabled', true);
  });
  disableFilters.forEach((item) => {
    item.setAttribute('disabled', true);
  });
};

const activationOnClick = function () {
  adForm.classList.remove('ad-form--disabled');
  disableForm.forEach((item) => {
    item.removeAttribute('disabled');
  });
  disableFilters.forEach((item) => {
    item.removeAttribute('disabled');
  });
  getData((data) => {
    mapActivation(data);
  }, (errorMessage) => onErrorMessage(errorMessage));
  address.value = `Lat: ${MainMarker.LAT}, Lng: ${MainMarker.LNG}`;
  map.removeEventListener('mousedown', activationOnClick);
};

map.addEventListener('mousedown', activationOnClick);

resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng([
    MainMarker.LAT,
    MainMarker.LNG,
  ]);
  address.value = `Lat: ${MainMarker.LAT}, Lng: ${MainMarker.LNG}`;
});

export {initValidation, pageInactivation};
