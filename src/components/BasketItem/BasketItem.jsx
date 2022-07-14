import React from 'react';
import { useDispatch } from 'react-redux';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { removeFromBasket } from 'actions/basket';

import './BasketItem.scss';

const placeholderImg = 'https://crm.centralnoe.ru/dealincom/assets/empty_photo.jpg';

export function BasketItem({ card }) {
  const dispatch = useDispatch();

  const handlerRemove = () => {
    dispatch(removeFromBasket(card))
  }

  return (
    <div
      className='basket-card'
      data-basket='yes'
    >
      <img
        className='basket-card__img'
        src={card.reqPhoto || placeholderImg}
        alt="photo"
        data-basket='yes'
      />
      <div style={{ width: '100%' }} data-basket='yes'>
        <div data-basket='yes'>
          {card?.reqRoomCount && <span data-basket='yes' className='text basket-card__text'>{card.reqRoomCount}к</span>}
          {card?.reqStreet && <span data-basket='yes' className='text basket-card__text'> {card.reqStreet}</span>}
          {card?.reqHouseNumber && <span data-basket='yes' className='text basket-card__text'> д {card.reqHouseNumber}</span>}
        </div>
        <div data-basket='yes'>
          {card?.reqPrice && <span data-basket='yes' className='text basket-card__text'>{card.reqPrice} тыс. ₽</span>}
        </div>
      </div>
      <div data-basket='yes'>
        <IconButton
          size='small'
          onClick={handlerRemove}
          data-basket='yes'
        >
          <CloseIcon
            fontSize="inherit"
            data-basket='yes'
          />
        </IconButton>
      </div>
    </div>
  )
} 