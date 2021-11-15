const flatTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const renderPhotos = (data, cardPhoto, cardPhotos) => {
  if (data.offer.photos) {
    data.offer.photos.forEach((item) => {
      const newPhoto = cardPhoto.cloneNode(false);
      cardPhotos.appendChild(newPhoto);
      newPhoto.src = item;
    });
  } else {
    cardPhotos.remove();
  }
};

const renderFeatures = (data, cardFeatures) => {
  if (data.offer.features) {
    data.offer.features.forEach((featureItem) => {
      const feature = document.createElement('li');
      feature.classList.add('popup__feature', `popup__feature--${featureItem}`);
      cardFeatures.appendChild(feature);
    });
  }
};

const renderDescriptions = (data, descriptionElement) => {
  if (data.offer.description) {
    descriptionElement.textContent = data.offer.description;
  } else {
    descriptionElement.remove();
  }
};

const card = document.querySelector('#card').content.querySelector('.popup');
const renderCard = (cardData) => {
  const cardNode = card.cloneNode(true);
  cardNode.querySelector('.popup__title').textContent = cardData.offer.title;
  cardNode.querySelector('.popup__text--address').textContent = cardData.offer.address;
  cardNode.querySelector('.popup__text--price').textContent = `${cardData.offer.price} ₽/ночь`;
  cardNode.querySelector('.popup__type').textContent = flatTypes[cardData.offer.type];
  cardNode.querySelector('.popup__text--capacity').textContent = `${cardData.offer.rooms} комнаты для ${cardData.offer.guests} гостей`;
  cardNode.querySelector('.popup__text--time').textContent = `Заезд после ${cardData.offer.checkin}, выезд до ${cardData.offer.checkout}`;
  const descriptionElement = cardNode.querySelector('.popup__description');
  renderDescriptions(cardData, descriptionElement);
  cardNode.querySelector('.popup__avatar').src = cardData.author.avatar;
  const cardPhotos = cardNode.querySelector('.popup__photos');
  const cardPhoto = cardPhotos.querySelector('.popup__photo');
  cardPhotos.removeChild(cardPhoto);
  renderPhotos(cardData, cardPhoto, cardPhotos);
  const cardFeatures = cardNode.querySelector('.popup__features');
  cardFeatures.innerHTML = '';
  renderFeatures(cardData, cardFeatures);
  return cardNode;
};

export {renderCard};
