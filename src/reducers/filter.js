import { handleActions } from "redux-actions";
import { fromJS, Map, List } from 'immutable';

import { loader, source, metro, extra, setIsMap } from 'actions/filter';

const initialState = new Map({
  isLoading: false,
  isMap: false,
  source: '1c',
  metro: {},
  extra: {},
  filter: new Map(),
})

export const filterReducer = handleActions({
  [loader]: (state, action) => {
    return state.set('isLoading', !state.get('isLoading'))
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
  [setIsMap]: (state, action) => {
    return state.set('isMap', !state.get('isMap'))
  },
}, initialState)