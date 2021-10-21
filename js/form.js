const validation = function () {

  const prices = {
    bungalow: 0,
    flat: 100,
    hotel: 3000,
    house: 5000,
    palace: 10000,
  };
  const titleInput = document.querySelector('#title');
  const priceInput = document.querySelector('#price');
  const type = document.querySelector('#type');

  titleInput.addEventListener('invalid', () => {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Минимум 30 символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Максимум 100 символов');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Обязательное поле');
    } else {
      titleInput.setCustomValidity('');
    }
  });

  priceInput.addEventListener('invalid', () => {
    if (priceInput.value > 1000000) {
      priceInput.setCustomValidity('Максимальная цена 1 миллион');
    }
  });

  type.addEventListener('change', (evt) => {
    priceInput.min = prices[evt.target.value];
    priceInput.placeholder = prices[evt.target.value];
  });
};

export {validation};
