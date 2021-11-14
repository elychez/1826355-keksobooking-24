import {MainMarker} from './map.js';
import {onSuccess, onError} from './events.js';

const address = document.querySelector('#address');
const adForm = document.querySelector('.ad-form');


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
  address.value = `${MainMarker.LAT}, ${MainMarker.LNG}`;
};

export {getData};
