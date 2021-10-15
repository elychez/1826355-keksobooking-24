import {generateMockData} from './mocks.js';

generateMockData();

const cardArray = generateMockData();
const cardArrayElement = cardArray[0];
console.log('cardArrayElement', cardArrayElement);

const mapCanvas = document.querySelector('.map__canvas');
const mapCard = document.querySelector('#card').content.querySelector('.popup');
const renderCard = function (cardElement) {
  const card = mapCard.cloneNode(true);
  card.querySelector('.popup__title').textContent = cardElement.offer.title;
  card.querySelector('.popup__text--address').textContent = cardElement.offer.address;
  card.querySelector('.popup__text--price').textContent = `${cardElement.offer.price}₽/ночь`;
  mapCanvas.appendChild(card);
};

renderCard(cardArrayElement);
