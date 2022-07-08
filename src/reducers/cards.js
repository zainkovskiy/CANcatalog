import { handleActions } from "redux-actions";
import { fromJS, Map, List } from 'immutable';

import { setCards } from 'actions/cards'; 


const initialState = new Map({
  cards: new List(),
})

export const cardsReducer = handleActions({
  [setCards]: (state, action) => {
    return state.set('cards', fromJS(action.payload))
  }
}, initialState)