import { handleActions } from "redux-actions";
import { fromJS, Map, List } from 'immutable';

import { loader } from 'actions/filter';

const initialState = new Map({
  isLoading: false,
  cards: new List(),
  basket: new List()
})

export const catalogReducer = handleActions({
  [loader]: (state, payload) => {
    return state.set('isLoading', !state.get('isLoading'))
  }
}, initialState)