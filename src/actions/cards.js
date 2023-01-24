import { createAction } from "redux-actions";
import axios from 'axios';
import { isPointInPolygon } from 'geolib';

import { loader, loaderMap } from 'actions/filter';

export const setCards = createAction('[Cards] setCard');
export const setMapDisabledAPI = createAction('[Cards] setMapDisabledAPI');
export const setSideBarCards = createAction('[Cards] setSideBarCards');
export const setDefaultCards = createAction('[Cards] setDefaultCards');
export const sortMinMax = createAction('[Cards] sortMinMax');
export const sortMaxMin = createAction('[Cards] sortMaxMin');
export const sortDefault = createAction('[Cards] sortDefault');
export const sortDate = createAction('[Cards] sortDate');
export const setSortIndex = createAction('[Cards] setSortIndex');
export const setCountCart = createAction('[Cards] setCountCart');
export const setCardCountLoading = createAction('[Cards] setCardCountLoading');

export function getCards(req, isMap) {
  return async function (dispatch) {
    dispatch(setCards([]));
    dispatch(setMapDisabledAPI());
    try {
      const res = await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Filter/Controller.php', req);
      if (Array.isArray(res?.data)) {
        if (req?.map?.source === 'polygon') {
          dispatch(setCards(res.data.filter(item => isPointInPolygon([item.lat, item.lng], req.map.geometry[0]))))
          dispatch(setDefaultCards(res.data.filter(item => isPointInPolygon([item.lat, item.lng], req.map.geometry[0]))))
        } else {
          dispatch(setCards(res.data));
          dispatch(setDefaultCards(res.data));
        }
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      isMap ? dispatch(loaderMap()) : dispatch(loader());
      dispatch(setSortIndex(0));
    }
  }
}

export function getCountCart(raw) {
  return async function (dispatch) {
    dispatch(setCardCountLoading())
    try {
      const res = await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Filter/Controller.php', {
        action: 'getCount',
        body: raw
      });
      if (res?.status === 200 && res?.data) {
        dispatch(setCountCart(res.data))
      } else {
        dispatch(setCountCart(null))
      }
    } catch (error) {
      dispatch(setCountCart(null))
    } finally {
      console.log('finally');
      dispatch(setCardCountLoading())
    }
  }
}