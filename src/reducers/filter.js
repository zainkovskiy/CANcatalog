import { handleActions } from "redux-actions";
import { fromJS, Map, List } from 'immutable';

import {
  loader,
  loaderMap,
  source,
  setMetro,
  setExtra,
  map,
  setIsMap,
  filter,
  clearFilter,
  removeAddress,
  setLocation
} from 'actions/filter';

const initialState = new Map({
  isLoading: false,
  isLoadingMap: false,
  isMap: false,
  source: '1c',
  location: '',
  metro: {},
  extra: {},
  map: [],
  filter: {
    reqTypeofRealty: 'Квартиры - Вторичка',
    address: [],
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
  [setMetro]: (state, action) => {
    return state.set('metro', action.payload)
  },
  [setExtra]: (state, action) => {
    return state.set('extra', action.payload)
  },
  [map]: (state, action) => {
    return state.set('map', action.payload)
  },
  [filter]: (state, action) => {
    if (action.payload.name === 'address') {
      return state.setIn(['filter', `${action.payload.name}`], [...state.getIn(['filter', `${action.payload.name}`]), action.payload.value]);
    }
    return state.setIn(['filter', `${action.payload.name}`], action.payload.value)
  },
  [removeAddress]: (state, action) => {
    return state.setIn(['filter', 'address'], state.getIn(['filter', 'address']).filter(item => item.value !== action.payload.value))
  },
  [clearFilter]: (state, action) => {
    return state.setIn(['filter'], {
      reqTypeofRealty: 'Квартиры - Вторичка',
      address: [],
    })
  },
  [setIsMap]: (state, action) => {
    return state.set('isMap', !state.get('isMap'))
  },
  [setLocation]: (state, action) => {
    return state.set('location', action.payload)
  },
}, initialState)