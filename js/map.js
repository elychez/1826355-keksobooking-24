import {generateMockData} from './mocks.js';
import {renderCard} from './cards.js';

const MAIN_MARKER = {
  lat: 35.652832,
  lng: 139.839478,
};
const address = document.querySelector('#address');
const MAIN_PIN_SIZE = [52, 52];
const MAIN_PIN_ANCHOR_SIZE = [26, 52];
const ICON_SIZE = [40, 40];
const ICON_ANCHOR_SIZE = [20, 40];

const mapActivation = function () {
  const map = L.map('map-canvas')
    .setView({
      lat: MAIN_MARKER.lat,
      lng: MAIN_MARKER.lng,
    }, 10);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: MAIN_PIN_SIZE,
    iconAnchor: MAIN_PIN_ANCHOR_SIZE,
  });

  const mainPinMarker = L.marker(
    {
      lat: MAIN_MARKER.lat,
      lng: MAIN_MARKER.lng,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );
  mainPinMarker.addTo(map);
  mainPinMarker.on('moveend', (evt) => {
    const getLatLng = evt.target.getLatLng();
    const getLat = getLatLng.lat.toFixed(5);
    const getLng = getLatLng.lng.toFixed(5);
    address.value = `Lat: ${getLat}, Lng: ${getLng}`;
  });

  const getMockData = generateMockData();
  getMockData.forEach((item) => {
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


export {mapActivation, MAIN_MARKER};
