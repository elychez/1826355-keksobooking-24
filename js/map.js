import {renderCard} from './cards.js';

const MainMarker = {
  LAT: 35.652832,
  LNG: 139.839478,
};
const address = document.querySelector('#address');
const MAIN_PIN_SIZE = [52, 52];
const MAIN_PIN_ANCHOR_SIZE = [26, 52];
const ICON_SIZE = [40, 40];
const ICON_ANCHOR_SIZE = [20, 40];

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: MAIN_PIN_SIZE,
  iconAnchor: MAIN_PIN_ANCHOR_SIZE,
});

const map = L.map('map-canvas');

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

const centerMap = function () {
  map.flyTo([MainMarker.LAT, MainMarker.LNG], 10);
};

const mapActivation = function (data) {
  map
    .setView({
      lat: MainMarker.LAT,
      lng: MainMarker.LNG,
    }, 10);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  mainPinMarker.addTo(map);

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

    marker
      .addTo(map)
      .bindPopup(renderCard(item));
  });
};


export {mapActivation, MainMarker, mainPinMarker, centerMap, map};
