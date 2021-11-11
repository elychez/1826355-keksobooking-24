import {MainMarker} from './map.js';
import {mainPinMarker, centerMap} from './map.js';

const initValidation = () => {

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
  const capacity = document.querySelector('#capacity');
  const rooms = document.querySelector('#room_number');

  capacity.addEventListener('change', (evt) => {
    switch(evt.target.value) {
      case '1':
        return rooms.value = 1;
      case '2':
        return rooms.value = 2;
      case '3':
        return rooms.value = 3;
      case '0':
        return rooms.value = 100;
    }
  });

  rooms.addEventListener('change', (evt) => {
    switch(evt.target.value) {
      case '1':
        return capacity.value = 1;
      case '2':
        return capacity.value = 2;
      case '3':
        return capacity.value = 3;
      case '100':
        return capacity.value = 0;
    }
  });

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
const address = document.querySelector('#address');
const resetButton = adForm.querySelector('.ad-form__reset');

const pageInactivation = () => {
  adForm.classList.add('ad-form--disabled');
  disableForm.forEach((item) => {
    item.setAttribute('disabled', true);
  });
  disableFilters.forEach((item) => {
    item.setAttribute('disabled', true);
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

resetButton.addEventListener('click', () => {
  mainPinMarker.setLatLng([
    MainMarker.LAT,
    MainMarker.LNG,
  ]);
  address.value = `Lat: ${MainMarker.LAT}, Lng: ${MainMarker.LNG}`;
  centerMap();
});

export {initValidation, pageInactivation, activateForms};
