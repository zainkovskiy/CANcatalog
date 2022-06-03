import { handleActions } from "redux-actions";
import { fromJS, Map, List } from 'immutable';


const initialState = new Map({
  basket: new List()
})

export const basketReducer = handleActions({
}, initialState)