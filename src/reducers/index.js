import { combineReducers } from "redux"

import { catalogReducer } from 'reducers/catalog';

export const rootReducer = combineReducers({
  catalog: catalogReducer,
}) 