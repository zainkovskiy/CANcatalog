import React, { useState, useEffect } from "react";
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';

import './BasketBasket.scss';

export function BasketBasket(props) {
  const { basket } = props;
  const [isShow, setIsShow] = useState(false)
  return (
    <div className="basket">
      <IconButton
        aria-label="cart"
        onClick={() => setIsShow(!isShow)}
      >
        <Badge badgeContent={basket.lenght} color="primary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      {
        isShow &&
        <div className="basket__items">
          {
            basket.lenght > 0 ?
              basket.map(item => 'item') :
              <span className="text">Корзина пуста</span>
          }
        </div>
      }
    </div>
  )
}