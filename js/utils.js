const getRandomIntInclusive = function(min, max) {
  if (min >= 0 && max >= min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

const getRandomItem = function (arr) {
  return arr[getRandomIntInclusive(0, arr.length - 1)];
};

const getRandomArbitrary = function(min, max, float) {
  if (min >= 0 && max >= min) {
    const randomNumber = Math.random() * (max - min) + min;
    return randomNumber.toFixed(float);
  }
};

const shuffleArray = function(data) {
  const array = data.slice();
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

export {getRandomIntInclusive, getRandomItem, getRandomArbitrary, shuffleArray};
