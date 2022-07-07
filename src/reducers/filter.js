import { handleActions } from "redux-actions";
import { fromJS, Map, List } from 'immutable';

import { loader, loaderMap, source, metro, extra, map, setIsMap } from 'actions/filter';

const initialState = new Map({
  isLoading: false,
  isLoadingMap: false,
  isMap: false,
  source: '1c',
  metro: {},
  extra: {},
  map: [],
  filter: new Map(),
})

export const filterReducer = handleActions({
  [loader]: (state, action) => {
    return state.set('isLoading', !state.get('isLoading'))
  }, 
  [loaderMap]: (state, action) => {
    return state.set('isLoadingMap', !state.get('isLoadingMap'))
  }, 
  [source]: (state, action) => {
    return state.set('source', action.payload)
  },
  [metro]: (state, action) => {
    return state.set('metro', action.payload)
  }, 
  [extra]: (state, action) => {
    return state.set('extra', action.payload)
  },
  [map]: (state, action) => {
    return state.set('map', action.payload)
  },
  [setIsMap]: (state, action) => {
    return state.set('isMap', !state.get('isMap'))
  },
}, initialState)