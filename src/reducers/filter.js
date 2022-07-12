import { handleActions } from "redux-actions";
import { fromJS, Map, List } from 'immutable';

import { loader, loaderMap, source, metro, extra, map, setIsMap, filter } from 'actions/filter';

const initialState = new Map({
  isLoading: false,
  isLoadingMap: false,
  isMap: false,
  source: '1c',
  metro: {},
  extra: {},
  map: [],
  filter: {
    reqTypeofRealty: 'Квартиры',
  },
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
  [filter]: (state, action) => {
    return state.setIn(['filter', `${action.payload.name}`], action.payload.value)
  },
  [setIsMap]: (state, action) => {
    return state.set('isMap', !state.get('isMap'))
  },
}, initialState)