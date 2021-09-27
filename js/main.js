function getRandomIntInclusive(min, max) {
  if (min >= 0 && max >= min) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

getRandomIntInclusive(1, 57);

function getRandomArbitrary(min, max, float) {
  if (min >= 0 && max >= min) {
    const randomNumber = Math.random() * (max - min) + min;
    return randomNumber.toFixed(float);
  }
}

getRandomArbitrary(1, 77, 3);
