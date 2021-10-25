import {generateMockData} from './mocks.js';
import {renderCard} from './cards.js';
import {initValidation} from './form.js';

const cardArray = generateMockData();

renderCard(cardArray[0]);
initValidation();

