import {renderCard} from './cards.js';
import {activateForms, initValidation, pageInactivation} from './form.js';
import {debounce} from './utils/debounce.js';

const MAIN_PIN_SIZE = [52, 52];
const MAIN_PIN_ANCHOR_SIZE = [26, 52];
const ICON_SIZE = [40, 40];
const ICON_ANCHOR_SIZE = [20, 40];
const MAX_ADVERT_COUNT = 10;

const MainMarker = {
  LAT: 35.652832,
  LNG: 139.839478,
};
const address = document.querySelector('#address');
const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const mapFilters = document.querySelector('.map__filters');
const checkboxes = mapFilters.querySelectorAll('.map__checkbox');
const markers = [];

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

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: MAIN_PIN_SIZE,
  iconAnchor: MAIN_PIN_ANCHOR_SIZE,
});

const map = L.map('map-canvas');

initValidation();
pageInactivation();

map.on('load', () => {
  activateForms();
}).setView({
  lat: MainMarker.LAT,
  lng: MainMarker.LNG,
}, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinMarker = L.marker(
  {
    lat: MainMarker.LAT,
    lng: MainMarker.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.on('moveend', (evt) => {
  const getLatLng = evt.target.getLatLng();
  const getLat = getLatLng.lat.toFixed(5);
  const getLng = getLatLng.lng.toFixed(5);
  address.value = `Lat: ${getLat}, Lng: ${getLng}`;
});

const centerMap = () => {
  map.flyTo([MainMarker.LAT, MainMarker.LNG], 10);
};

mainPinMarker.addTo(map);

const filterByHouse = (advert) => housingType.value === 'any' || housingType.value === advert.offer.type;

const filterByPrice = (advert) => {
  const priceRangeValue = priceRange[housingPrice.value];
  return housingPrice.value === 'any' || advert.offer.price >= priceRangeValue.from && advert.offer.price < priceRangeValue.to;
};

const filterByRooms = (advert) => housingRooms.value === 'any' || advert.offer.rooms === Number(housingRooms.value);

const filterByGuests = (advert) => housingGuests.value === 'any' || advert.offer.guests === Number(housingGuests.value);

const filterByFeatures = (advert) => {
  const features = advert.offer.features || [];
  const featuresList = Array.from(checkboxes).filter((checkbox) => checkbox.checked);
  const selectedFeatures = Array.from(featuresList).map((item) => item.value);
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

const mapActivation = (data) => {
  markers.forEach((marker) => {
    marker.remove();
  });
  filterAdverts(data).forEach((item) => {
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: ICON_SIZE,
      iconAnchor: ICON_ANCHOR_SIZE,
    });
    const marker = L.marker(
      {
        lat: item.location.lat,
        lng: item.location.lng,
      },
      {
        icon,
      },
    );
    markers.push(marker);
    marker
      .addTo(map)
      .bindPopup(renderCard(item));
  });
};

const setFilterForm = (advertList) => {
  mapFilters.addEventListener('change', debounce(() => mapActivation(advertList)));
};

export {mapActivation, MainMarker, mainPinMarker, centerMap, map, setFilterForm};
