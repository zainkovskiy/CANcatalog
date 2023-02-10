import React from 'react';
import { useDispatch, useStore, useSelector } from 'react-redux';
import Button from '@mui/material/Button';

import { loader, loaderMap } from 'actions/filter';
import { getCards, setSideBarCards } from 'actions/cards';

// const userId = 2921;

export function ButtonSearch() {
  const state = useStore().getState().filter.toJS()
  const cardsCount = useSelector((state) => state.cards.get('cardsCount'))
  const cardCountLoading = useSelector((state) => state.cards.get('cardCountLoading'))
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
      trash: state?.trash || false,
      userId: userId,
    }, state.isMap))
  }

  return (
    <div className='setting__buttons'>
      <span className="text" style={{ fontSize: 12 }}>
        {
          cardCountLoading ?
            'Идет поиск объектов...' :
            `Найдено ${cardsCount?.count || 0} объектов`
        }
      </span>
      <Button
        variant="contained"
        size='small'
        onClick={sendRequest}
        disabled={cardCountLoading}
      >
        показать
      </Button>
    </div>
  )
}
