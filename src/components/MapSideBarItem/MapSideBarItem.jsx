import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close';

import { addToBasket, removeFromBasket } from 'actions/basket';

import './MapSideBarItem.scss';

export function MapSideBarItem({ item }) {
  const dispatch = useDispatch();
  const basketList = useSelector((state) => state.basket.get('basket'));

  const hasFromBasket = () => {
    if (basketList.find(card => card.reqNumber === item.reqNumber)) {
      return true
    }
    return false
  }

  const handlerButton = () => {
    hasFromBasket() ? dispatch(removeFromBasket(item)) : dispatch(addToBasket(item));
  }

  const variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  const openObject = () => {
    BX.SidePanel.Instance.open(`https://crm.centralnoe.ru/cardObject/?login=yes&source=${item.source}&reqNumber=${item.reqNumber}`, { animationDuration: 300, width: document.getElementById('root').clientWidth })
  }

  return (
    <motion.div
      variants={variants}
      initial='hidden'
      animate='visible'
      className='side-bar-item'
      onClick={(event) => { event.target.tagName !== 'BUTTON' && openObject() }}
    >
      {
        item?.reqTypeofRealty &&
        <span className='text'>{item?.reqRoomCount ? `${item.reqRoomCount}к., ` : ''}{item.reqTypeofRealty}</span>
      }
      <span className='text'>
        {item?.reqCity ? `${item.reqCity}, ` : ''}
        {item?.reqStreet ? `ул.${item.reqStreet}` : ''}
        {item?.reqHouseNumber ? `, ${item.reqHouseNumber}` : ''}
      </span>
      <div className='side-bar-item__bottom'>
        <div>
          {
            item?.reqPrice &&
            <span
              className='text'
              style={{ fontSize: 22 }}
            >
              {item?.reqPrice}&#8381;
            </span>
          }
        </div>
        <IconButton
          onClick={ handlerButton }
          color={ basketList.find(obj => obj.reqNumber === item.reqNumber) ? "error" : "primary" }
        >
          {
            basketList.find(card => card.reqNumber === item.reqNumber) ?
              <CloseIcon
                sx={{ pointerEvents: 'none' }}
              /> :
              <AddCircleOutlineIcon
                sx={{ pointerEvents: 'none' }}
              />
          }
        </IconButton>
      </div>
    </motion.div>
  )
}