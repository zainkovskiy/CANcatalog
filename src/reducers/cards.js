import { handleActions } from "redux-actions";
import { fromJS, Map, List } from 'immutable';

import { setCards, setMapDisabledAPI, setSideBarCards } from 'actions/cards'; 


const initialState = new Map({
  cards: new List(),
  sideBarCards: new List(),
  mapDisabledAPI: false
})

export const cardsReducer = handleActions({
  [setCards]: (state, action) => {
    return state.set('cards', fromJS(action.payload))
  },
  [setMapDisabledAPI]: (state, action) => {
    return state.set('mapDisabledAPI', true)
  },
  [setSideBarCards]: (state, action) => {
    return state.set('sideBarCards', fromJS(action.payload))
  }
}, initialState)