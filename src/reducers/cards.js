import { handleActions } from "redux-actions";
import { fromJS, Map, List } from 'immutable';


const initialState = new Map({
  cards: new List(),
})

export const cardsReducer = handleActions({
}, initialState)