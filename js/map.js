import {generateMockData} from './mocks.js';
import {renderCard} from './cards.js';

const mapActivation = function () {
  const address = document.querySelector('#address');
  const map = L.map('map-canvas')
    .setView({
      lat: 35.652832,
      lng: 139.839478,
    }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(
    {
      lat: 35.652832,
      lng: 139.839478,
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
      iconSize: [40, 40],
      iconAnchor: [20, 40],
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


export {mapActivation};
