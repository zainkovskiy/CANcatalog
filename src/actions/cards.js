import { createAction } from "redux-actions";
import axios from 'axios';
import { isPointInPolygon } from 'geolib';

import { loader, loaderMap } from 'actions/filter';

export const setCards = createAction('[Cards] setCard');
export const setMapDisabledAPI = createAction('[Cards] setMapDisabledAPI');

export function getCards(req, isMap) {
  return async function (dispatch) {
    dispatch(setCards([]));
    dispatch(setMapDisabledAPI());
    try {
      const res = await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/testMap.php', req);
      if(Array.isArray(res?.data)){
        if (req?.map?.source === 'polygon'){
          dispatch(setCards(res.data.filter(item => isPointInPolygon([item.lat, item.lng], req.map.geometry[0]))))
        } else {
          dispatch(setCards(res.data));
        }
      }
    } catch (error) {
      console.log(error.message);
    } finally{
      isMap ? dispatch(loaderMap()) : dispatch(loader());
    }
  }
}