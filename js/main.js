import {generateMockData} from './mocks.js';
import {renderCard} from './cards.js';

const cardArray = generateMockData();

renderCard(cardArray[0]);
