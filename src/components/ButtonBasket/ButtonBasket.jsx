import React, { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';

import { BasketItem } from 'components/BasketItem';

import './ButtonBasket.scss';

export function ButtonBasket(props) {
  const { basket } = props;
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    isShow && document.addEventListener('click', handlerClick);

    return () => {
      document.removeEventListener('click', handlerClick);
    }
  }, [isShow])

  const handlerClick = () => {
    if (!event.target.dataset.basket){
      setIsShow(false);
    }
  }

  return (
    <div className="basket" data-basket='yes'>
      <IconButton
        aria-label="cart"
        onClick={() => setIsShow(!isShow)}
        data-basket='yes'
      >
        <Badge badgeContent={basket.lenght} color="primary" data-basket='yes'>
          <ShoppingCartIcon data-basket='yes' sx={{ pointerEvents: 'none' }}/>
        </Badge>
      </IconButton>
      {
        isShow &&
        <div
          className="basket__items"
          data-basket='yes'
        >
          {
            basket.length > 0 ?
              basket.map(item =>
                <BasketItem
                  key={item.reqNumber}
                  card={item}
                />
              ) :
              <span className="text">Корзина пуста</span>
          }
        </div>
      }
    </div>
  )
}