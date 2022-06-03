import { combineReducers } from "redux"

import { filterReducer } from 'reducers/filter';
import { basketReducer } from 'reducers/basket';
import { cardsReducer } from 'reducers/cards';

export const rootReducer = combineReducers({
  filter: filterReducer,
  basket: basketReducer,
  cards: cardsReducer,
}) 