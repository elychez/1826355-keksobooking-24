import {renderCard} from './cards.js';
import {activateForms, pageInactivation} from './form.js';
import {debounce} from './utils/debounce.js';
import {filterAdverts} from './filter.js';
import {getData} from './api.js';

const MAIN_PIN_SIZE = [52, 52];
const MAIN_PIN_ANCHOR_SIZE = [26, 52];
const ICON_SIZE = [40, 40];
const ICON_ANCHOR_SIZE = [20, 40];

const mapFilters = document.querySelector('.map__filters');

const MainMarker = {
  LAT: 35.65283,
  LNG: 139.83947,
};
const address = document.querySelector('#address');
const markers = [];

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: MAIN_PIN_SIZE,
  iconAnchor: MAIN_PIN_ANCHOR_SIZE,
});

const map = L.map('map-canvas');

pageInactivation();

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
    iconSize: MAIN_PIN_SIZE,
    iconAnchor: MAIN_PIN_ANCHOR_SIZE,
  },
);

mainPinMarker.on('moveend', (evt) => {
  const getLatLng = evt.target.getLatLng();
  const getLat = getLatLng.lat.toFixed(5);
  const getLng = getLatLng.lng.toFixed(5);
  address.value = `${getLat}, ${getLng}`;
});

const centerMap = () => {
  map.flyTo([MainMarker.LAT, MainMarker.LNG], 10);
};

mainPinMarker.addTo(map);
const markerGroup = L.layerGroup().addTo(map);

const renderMarker = (data) => {
  data.forEach((item) => {
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
      .addTo(markerGroup)
      .bindPopup(renderCard(item));
  });
};

const mapActivation = (data) => {
  markerGroup.clearLayers();
  const filteredData = filterAdverts(data);
  renderMarker(filteredData);
};

const setFilterForm = (advertList) => {
  mapFilters.addEventListener('change', debounce(() => mapActivation(advertList)));
};

map.on('load', () => {
  getData((data) => {
    mapActivation(data);
    setFilterForm(data);
    activateForms();
  });
}).setView({
  lat: MainMarker.LAT,
  lng: MainMarker.LNG,
}, 10);

export {mapActivation, MainMarker, mainPinMarker, centerMap, map, setFilterForm};
