const COORDINATES = {
  MaxLatitude: 35.70000,
  MinLatitude: 35.65000,
  MaxLongitude: 139.80000,
  MinLongitude: 139.70000,
};

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const PHOTO_NUMBERS = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
];

const TITLES = [
  'Шикарная вилла у порта',
  'Апартаменты на берегу лазурного моря',
  'Бунгало на отлельном острове',
  'Отель в сердце города',
  'Микро домик в горах',
  'Дом в снежных горах',
  'Квартира на окраине города',
];

const DESCRIPTIONS = [
  'Вид с окна на высоте птичьего полета',
  'Тихие соседи',
  'Горка примяком из номера',
  'Выход из виллы прямо на пляж',
  'Домик в центре леса',
  'Центр города, рукой подать до театра, кино и центра развлечений',
  'Рядом дорожки для бега вдоль океана',
];

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

getRandomArbitrary(1, 77, 3);

const shuffleArray = function(data) {
  const array = data.slice();
  for (let itt = array.length - 1; itt > 0; itt--) {
    const jtt = Math.floor(Math.random() * (itt + 1));
    const temp = array[itt];
    array[itt] = array[jtt];
    array[jtt] = temp;
  }
  return array;
};

const generateMokData = function () {
  const data = [];
  for (let itt = 0; itt < 10; itt++) {
    const lat = getRandomArbitrary(COORDINATES.MinLatitude, COORDINATES.MaxLatitude, 6);
    const lng = getRandomArbitrary(COORDINATES.MinLongitude, COORDINATES.MaxLongitude, 6);
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
        features: shuffleArray(FEATURES).slice(0, getRandomIntInclusive(0, FEATURES.length-1)),
        description: getRandomItem(DESCRIPTIONS),
        photos: getRandomItem(PHOTOS),
      },
      location: {
        lat: lat,
        lng: lng,
      },
    });
  }
  return data;
};

generateMokData();
