import { handleActions } from "redux-actions";
import { fromJS, Map, List } from 'immutable';

import { addToBasket, removeFromBasket, clearBasket } from 'actions/basket';


const initialState = new Map({
  basket: new List()
})

export const basketReducer = handleActions({
  [addToBasket]: (state, action) => {
    const cardObj = action.payload;
    return state.update('basket', arr => arr.push(cardObj))
  },
  [removeFromBasket]: (state, action) => {
    const cardObj = action.payload;
    return state.update('basket', arr => arr.filterNot(item => item.reqNumber == cardObj.reqNumber))
  },
  [clearBasket]: (state, action) => {
    return state.set('basket', new List())
  },
}, initialState)