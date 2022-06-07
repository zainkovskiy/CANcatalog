import { handleActions } from "redux-actions";
import { fromJS, Map, List } from 'immutable';

import { loader, source } from 'actions/filter';

const initialState = new Map({
  isLoading: false,
  source: '1c',
  metro: new Map(),
  extra: new Map(),
  filter: new Map(),
})

export const filterReducer = handleActions({
  [loader]: (state, action) => {
    return state.set('isLoading', !state.get('isLoading'))
  }, 
  [source]: (state, action) => {
    return state.set('source', action.payload)
  }
}, initialState)