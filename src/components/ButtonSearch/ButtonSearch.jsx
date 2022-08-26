import React from 'react';
import { useDispatch, useStore } from 'react-redux';
import Button from '@mui/material/Button';

import { loader, loaderMap } from 'actions/filter';
import { getCards, setSideBarCards } from 'actions/cards';

export function ButtonSearch() {
  const state = useStore().getState().filter.toJS()
  const dispatch = useDispatch();

  const sendRequest = () => {
    state.isMap ? dispatch(loaderMap()) : dispatch(loader());
    dispatch(setSideBarCards([]));
    dispatch(getCards({
      filter: state.filter,
      metro: state.metro,
      extra: state.extra,
      map: state.map,
      source: state.source,
      userId: userId,
    }, state.isMap))
  }

  return (
    <Button
      variant="contained"
      size='small'
      onClick={sendRequest}
    >
      найти
    </Button>
  )
}
