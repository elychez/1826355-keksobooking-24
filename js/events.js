import {centerMap, MainMarker, mainPinMarker, mapActivation, setFilterForm} from './map.js';
import {getData} from './api.js';

const adForm = document.querySelector('.ad-form');
const success = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const error = document.querySelector('#error').content.querySelector('.error');
const main = document.querySelector('main');
const address = document.querySelector('#address');
const priceInput = document.querySelector('#price');
const mapFilters = document.querySelector('.map__filters');

const resetPage = () => {
  success.remove();
  adForm.reset();
  mapFilters.reset();
  mainPinMarker.setLatLng([
    MainMarker.LAT,
    MainMarker.LNG,
  ]);
  centerMap();
  address.value = `${MainMarker.LAT}, ${MainMarker.LNG}`;
  priceInput.placeholder = 1000;
  getData((data) => {
    mapActivation(data);
    setFilterForm(data);
  });
};

const onKeydownCloseSuccessMessage = (evt) => {
  if (evt.key === 'Escape') {
    resetPage();
    document.removeEventListener('keydown', onKeydownCloseSuccessMessage);
  }
};

const onClickCloseSuccessMessage = (evt) => {
  if (evt.target !== evt.currentTarget && evt.which === 1) {
    resetPage();
    document.removeEventListener('keydown', onKeydownCloseSuccessMessage);
    document.removeEventListener('click', onClickCloseSuccessMessage);
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
  if (evt.target !== evt.currentTarget && evt.which === 1) {
    error.remove();
    document.removeEventListener('keydown', onKeyDownCloseErrorMessage);
  }
};

const onError = () => {
  main.appendChild(error);
  document.addEventListener('keydown', onKeyDownCloseErrorMessage);
  document.addEventListener('click', onClickCloseErrorMessage);
};

export {onKeyDownCloseErrorMessage, onClickCloseErrorMessage, onError, onSuccess};
