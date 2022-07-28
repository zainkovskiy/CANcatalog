import { createAction } from "redux-actions";
import axios from 'axios';

export const addToBasket = createAction('[Basket] addToBasket');
export const removeFromBasket = createAction('[Basket] removeFromBasket');
export const clearBasket = createAction('[Basket] clearBasket');

export function setSelect(basket, dealId){
  return async function (dispatch){
    axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Filter/Selection.php', {
      action: "setSelection",
      userId: userId,
      dealId: dealId,
      objects: basket
    })
  }
}