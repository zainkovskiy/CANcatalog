import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';

import { clearBasket, setSelect } from 'actions/basket';

import { BasketItem } from 'components/BasketItem';
import { ModalWindow } from 'components/ModalWindow';
import { ModalBasket } from 'components/ModalBasket';

import './ButtonBasket.scss';

//dealId закоментить
// const dealId = null;

export function ButtonBasket(props) {
  const { basket } = props;
  const [isShow, setIsShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [deal, setDeal] = useState(dealId || null);
  const dispatch = useDispatch();

  useEffect(() => {
    isShow && document.addEventListener('click', handlerClick);

    return () => {
      document.removeEventListener('click', handlerClick);
    };
  }, [isShow]);

  const handlerClick = () => {
    if (!event.target.dataset.basket) {
      setIsShow(false);
    }
  };

  const handlerClearBasket = () => [dispatch(clearBasket())];

  const handlerSetSelect = () => {
    if (deal) {
      dispatch(setSelect(basket, deal));
      return;
    }
    onClose();
  };
  const selectDeal = (deal) => {
    setDeal(deal);
    onClose();
    dispatch(setSelect(basket, deal));
  };

  const onClose = () => {
    setOpen(!open);
  };

  return (
    <div
      className='basket'
      data-basket='yes'
    >
      <IconButton
        aria-label='cart'
        onClick={() => setIsShow(!isShow)}
        data-basket='yes'
      >
        <ShoppingCartIcon
          data-basket='yes'
          sx={{ pointerEvents: 'none' }}
        />
      </IconButton>
      {isShow && (
        <div
          className='basket__items'
          data-basket='yes'
        >
          {basket.length > 0 ? (
            basket.map((item) => (
              <BasketItem
                key={item.reqNumber}
                card={item}
              />
            ))
          ) : (
            <span className='text'>Корзина пуста</span>
          )}
          {basket.length > 0 && (
            <div
              data-basket='yes'
              className='basket__buttons'
            >
              <Button
                variant='text'
                size='small'
                onClick={handlerSetSelect}
              >
                сохранить
              </Button>
              <Button
                variant='outlined'
                size='small'
                color='error'
                onClick={handlerClearBasket}
              >
                очистить
              </Button>
            </div>
          )}
        </div>
      )}
      <ModalWindow
        open={open}
        onClose={onClose}
      >
        <ModalBasket
          onClose={onClose}
          selectDeal={selectDeal}
        />
      </ModalWindow>
    </div>
  );
}
