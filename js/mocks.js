import {CHECKIN, CHECKOUT, Coordinates, DESCRIPTIONS, FEATURES, PHOTO_NUMBERS, PHOTOS, TITLES, TYPE} from './const.js';
import {getRandomIntInclusive, getRandomItem, getRandomArbitrary, shuffleArray} from './utils.js';

const generateMockData = function () {
  const data = [];
  for (let i = 0; i < 10; i++) {
    const lat = getRandomArbitrary(Coordinates.MIN_LATITUDE, Coordinates.MAX_LATITUDE, 6);
    const lng = getRandomArbitrary(Coordinates.MIN_LONGITUDE, Coordinates.MAX_LONGITUDE, 6);
    data.push({
      author: {
        avatar: `img/avatars/user${getRandomItem(PHOTO_NUMBERS)}.png`,
      },
      offer: {
        title: getRandomItem(TITLES),
        address: `${lat}, ${lng}`,
        price: getRandomIntInclusive(1, 1e6),
        type: getRandomItem(TYPE),
        rooms: getRandomIntInclusive(1, 7),
        guests: getRandomIntInclusive(1, 10),
        checkin: getRandomItem(CHECKIN),
        checkout: getRandomItem(CHECKOUT),
        features: shuffleArray(FEATURES).slice(0, getRandomIntInclusive(1, FEATURES.length)),
        description: getRandomItem(DESCRIPTIONS),
        photos: shuffleArray(PHOTOS).slice(0, getRandomIntInclusive(1, PHOTOS.length)),
      },
      location: {
        lat: lat,
        lng: lng,
      },
    });
  }
  return data;
};

export {generateMockData};
