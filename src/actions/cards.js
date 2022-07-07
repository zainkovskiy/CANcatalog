import { createAction } from "redux-actions";
import axios from 'axios';

import { loader, loaderMap } from 'actions/filter';

export const setCards = createAction('[Cards] setCard')

export function getCards(req, isMap) {
  console.log(req);
  return async function (dispatch) {
    dispatch(setCards([]));
    try {
      const res = await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/testMap.php', req);
      console.log(res)
      if(Array.isArray(res?.data)){
        dispatch(setCards(res.data));
      }
    } catch (error) {
      console.log(error.message);
    } finally{
      isMap ? dispatch(loaderMap()) : dispatch(loader());
    }
  }
}