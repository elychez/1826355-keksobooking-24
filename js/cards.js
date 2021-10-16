const flatTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const mapCanvas = document.querySelector('#map-canvas');
const card = document.querySelector('#card').content.querySelector('.popup');
const renderCard = function (cardData) {
  const cardNode = card.cloneNode(true);
  cardNode.querySelector('.popup__title').textContent = cardData.offer.title;
  cardNode.querySelector('.popup__text--address').textContent = cardData.offer.address;
  cardNode.querySelector('.popup__text--price').textContent = `${cardData.offer.price} ₽/ночь`;
  cardNode.querySelector('.popup__type').textContent = flatTypes[cardData.offer.type];
  cardNode.querySelector('.popup__text--capacity').textContent = `${cardData.offer.rooms} комнаты для ${cardData.offer.guests} гостей`;
  cardNode.querySelector('.popup__text--time').textContent = `Заезд после ${cardData.offer.checkin}, выезд до ${cardData.offer.checkout}`;
  cardNode.querySelector('.popup__description').textContent = cardData.offer.description;
  cardNode.querySelector('.popup__avatar').src = cardData.author.avatar;
  const cardPhotos = cardNode.querySelector('.popup__photos');
  const cardPhoto = cardPhotos.querySelector('.popup__photo');
  cardPhotos.removeChild(cardPhoto);
  if (cardData.offer.photos.length > 0) {
    cardData.offer.photos.forEach((item) => {
      const newPhoto = cardPhoto.cloneNode(false);
      cardPhotos.appendChild(newPhoto);
      newPhoto.src = item;
    });
  } else {
    cardPhotos.remove();
  }
  const cardFeatures = cardNode.querySelector('.popup__features');
  cardFeatures.innerHTML = '';
  for (let i = 0; i < cardData.offer.features.length; i++) {
    const feature = document.createElement('li');
    feature.classList.add('popup__feature', `popup__feature--${cardData.offer.features[i]}`);
    cardFeatures.appendChild(feature);
  }
  mapCanvas.appendChild(cardNode);
};

export {renderCard};
