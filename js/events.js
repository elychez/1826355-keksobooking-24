import {resetPage} from './form.js';

const success = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const error = document.querySelector('#error').content.querySelector('.error');
const main = document.querySelector('main');

const onKeydownCloseSuccessMessage = (evt) => {
  if (evt.key === 'Escape') {
    resetPage();
    success.remove();
    document.removeEventListener('keydown', onKeydownCloseSuccessMessage);
  }
};

const onClickCloseSuccessMessage = (evt) => {
  if (evt.target !== evt.currentTarget && evt.which === 1) {
    resetPage();
    success.remove();
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
