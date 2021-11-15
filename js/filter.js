const MAX_ADVERT_COUNT = 10;

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const mapFilters = document.querySelector('.map__filters');
const checkboxes = mapFilters.querySelectorAll('.map__checkbox');

const priceRange = {
  'low': {
    from: 0,
    to: 10000,
  },
  'middle': {
    from: 10001,
    to: 50000,
  },
  'high': {
    from: 50001,
    to: 1000000,
  },
};

const filterByHouse = (advert) => housingType.value === 'any' || housingType.value === advert.offer.type;

const filterByPrice = (advert) => {
  const priceRangeValue = priceRange[housingPrice.value];
  return housingPrice.value === 'any' || advert.offer.price >= priceRangeValue.from && advert.offer.price < priceRangeValue.to;
};

const filterByRooms = (advert) => housingRooms.value === 'any' || advert.offer.rooms === Number(housingRooms.value);

const filterByGuests = (advert) => housingGuests.value === 'any' || advert.offer.guests === Number(housingGuests.value);

const filterByFeatures = (advert) => {
  const features = advert.offer.features || [];
  const selectedFeatures = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((item) => item.value);
  return !selectedFeatures.some((element) => !features.includes(element));
};

const filters = [
  filterByHouse,
  filterByPrice,
  filterByRooms,
  filterByGuests,
  filterByFeatures,
];

const isSuitableAdvert = (advert) => filters.every((filter) => filter(advert));

const filterAdverts = (adverts) => {
  const filteredAdverts = [];
  for (let i = 0; i < adverts.length && filteredAdverts.length < MAX_ADVERT_COUNT; i++) {
    const advert = adverts[i];
    if (isSuitableAdvert(advert)) {
      filteredAdverts.push(advert);
    }
  }
  return filteredAdverts;
};

export {filterAdverts};
