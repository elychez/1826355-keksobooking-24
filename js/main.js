import {mapActivation, setFilterForm} from './map.js';
import {getData} from './data.js';

getData((data) => {
  mapActivation(data);
  setFilterForm(data);
});

