import {MainMarker, mainPinMarker} from './map.js';

const adForm = document.querySelector('.ad-form');
const success = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const error = document.querySelector('#error').content.querySelector('.error');
const main = document.querySelector('main');
const address = document.querySelector('#address');

const onKeydownCloseSuccessMessage = function (evt) {
  if (evt.key === 'Escape') {
    success.remove();
    adForm.reset();
    document.removeEventListener('keydown', onKeydownCloseSuccessMessage);
    mainPinMarker.setLatLng([
      MainMarker.LAT,
      MainMarker.LNG,
    ]);
    address.value = `Lat: ${MainMarker.LAT}, Lng: ${MainMarker.LNG}`;
  }
};

const onClickCloseSuccessMessage = function (evt) {
  if (evt.which === 1) {
    if (evt.target !== evt.currentTarget) {
      success.remove();
      adForm.reset();
      document.removeEventListener('keydown', onKeydownCloseSuccessMessage);
      document.removeEventListener('click', onClickCloseSuccessMessage);
      mainPinMarker.setLatLng([
        MainMarker.LAT,
        MainMarker.LNG,
      ]);
      address.value = `Lat: ${MainMarker.LAT}, Lng: ${MainMarker.LNG}`;
    }
  }
};

const onSuccess = function () {
  main.appendChild(success);
  document.addEventListener('keydown', onKeydownCloseSuccessMessage);
  document.addEventListener('click', onClickCloseSuccessMessage);
  mainPinMarker.setLatLng([
    MainMarker.LAT,
    MainMarker.LNG,
  ]);
};

const onKeyDownCloseErrorMessage = function (evt) {
  if (evt.key === 'Escape') {
    error.remove();
    document.removeEventListener('keydown', onKeyDownCloseErrorMessage);
  }
};

const onClickCloseErrorMessage = function (evt) {
  if (evt.which === 1) {
    if (evt.target !== evt.currentTarget) {
      error.remove();
      document.removeEventListener('keydown', onKeyDownCloseErrorMessage);
    }
  }
};

const onError = function () {
  main.appendChild(error);
  document.addEventListener('keydown', onKeyDownCloseErrorMessage);
  document.addEventListener('click', onClickCloseErrorMessage);
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
      type: 'multipart/form-data',
    },
  )
    .then(() => onSuccess())
    .catch(() => onError());
});

const getData = function (onSuccessResult, onFailResult) {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((result) => onSuccessResult(result))
    .catch(() => onFailResult('Не удалось загрузить данные!'));
};

export {getData, onKeyDownCloseErrorMessage, onClickCloseErrorMessage};
