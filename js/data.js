import {centerMap, MainMarker, mainPinMarker} from './map.js';

const adForm = document.querySelector('.ad-form');
const success = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const error = document.querySelector('#error').content.querySelector('.error');
const main = document.querySelector('main');
const address = document.querySelector('#address');

const resetPage = () => {
  success.remove();
  adForm.reset();
  mainPinMarker.setLatLng([
    MainMarker.LAT,
    MainMarker.LNG,
  ]);
  centerMap();
  address.value = `Lat: ${MainMarker.LAT}, Lng: ${MainMarker.LNG}`;
};

const onKeydownCloseSuccessMessage = (evt) => {
  if (evt.key === 'Escape') {
    resetPage();
    document.removeEventListener('keydown', onKeydownCloseSuccessMessage);
  }
};

const onClickCloseSuccessMessage = (evt) => {
  if (evt.which === 1) {
    if (evt.target !== evt.currentTarget) {
      resetPage();
      document.removeEventListener('keydown', onKeydownCloseSuccessMessage);
      document.removeEventListener('click', onClickCloseSuccessMessage);
    }
  }
};

const onSuccess = () => {
  main.appendChild(success);
  document.addEventListener('keydown', onKeydownCloseSuccessMessage);
  document.addEventListener('click', onClickCloseSuccessMessage);
};

const onKeyDownCloseErrorMessage = (evt) => {
  if (evt.key === 'Escape') {
    error.remove();
    document.removeEventListener('keydown', onKeyDownCloseErrorMessage);
  }
};

const onClickCloseErrorMessage = (evt) => {
  if (evt.which === 1) {
    if (evt.target !== evt.currentTarget) {
      error.remove();
      document.removeEventListener('keydown', onKeyDownCloseErrorMessage);
    }
  }
};

const onError = () => {
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
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => onError());
});

const getData = (onSuccessResult) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((result) => onSuccessResult(result))
    .catch(() => onError());
  address.value = `Lat: ${MainMarker.LAT}, Lng: ${MainMarker.LNG}`;
};

export {getData, onKeyDownCloseErrorMessage, onClickCloseErrorMessage};
