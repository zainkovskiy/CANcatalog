import { handleActions } from "redux-actions";
import { fromJS, Map, List } from 'immutable';
import moment from "moment";

import {
  setCards,
  setMapDisabledAPI,
  setSideBarCards,
  setDefaultCards,
  sortMinMax,
  sortMaxMin,
  sortDefault,
  sortDate,
  setSortIndex
} from 'actions/cards';


const initialState = new Map({
  defaultCards: new List(),
  defaultSortIndex: 0,
  cards: new List(),
  sideBarCards: new List(),
  mapDisabledAPI: false
})

export const cardsReducer = handleActions({
  [setCards]: (state, action) => {
    return state.set('cards', fromJS(action.payload))
  },
  [setDefaultCards]: (state, action) => {
    return state.set('defaultCards', fromJS(action.payload))
  },
  [setMapDisabledAPI]: (state, action) => {
    return state.set('mapDisabledAPI', true)
  },
  [setSideBarCards]: (state, action) => {
    return state.set('sideBarCards', fromJS(action.payload))
  },
  [sortMinMax]: (state, action) => {
    return state.set('cards', state.get('defaultCards').sort((a, b) => {
      if (a.get(action.payload) < b.get(action.payload)) {
        return -1
      }
      if (a.get(action.payload) > b.get(action.payload)) {
        return 1
      }
      return 0
    }))
  },
  [sortMaxMin]: (state, action) => {
    return state.set('cards', state.get('defaultCards').sort((a, b) => {
      if (+a.get(action.payload) > +b.get(action.payload)) {
        return -1
      }
      if (+a.get(action.payload) < +b.get(action.payload)) {
        return 1
      }
      return 0
    }))
  },
  [sortDefault]: (state, action) => {
    return state.set('cards', state.get('defaultCards'));
  },
  [sortDate]: (state, action) => {
    return state.set('cards', state.get('defaultCards').sort((a, b) => {
      if (moment(a.get(action.payload)).isAfter(b.get(action.payload))) {
        return -1
      }
      if (moment(a.get(action.payload)).isBefore(b.get(action.payload))) {
        return 1
      }
      return 0
    }))
  },
  [setSortIndex]: (state, action) => {
    return state.set('defaultSortIndex', action.payload);
  }
}, initialState)