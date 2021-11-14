import {mapActivation, setFilterForm} from './map.js';
import {getData} from './api.js';

getData((data) => {
  mapActivation(data);
  setFilterForm(data);
});

