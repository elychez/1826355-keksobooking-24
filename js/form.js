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

export {initValidation};
