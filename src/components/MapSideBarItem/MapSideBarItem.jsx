import React from 'react';
import { motion } from 'framer-motion';

import './MapSideBarItem.scss';

export function MapSideBarItem({ item }) {

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
      onClick={openObject}
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
      {
        item?.reqPrice &&
        <span 
        className='text'
        >
          {item?.reqPrice}&#8381;
        </span>
      }
    </motion.div>
  )
}