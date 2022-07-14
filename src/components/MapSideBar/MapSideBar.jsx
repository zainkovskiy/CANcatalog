import React from 'react';
import { motion } from 'framer-motion';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { MapSideBarItem } from 'components/MapSideBarItem';

import './MapSideBar.scss';

export function MapSideBar({ list, onClose }) {
  return (
    <motion.div
      className='bar'
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
    >
      <div className='bar-top'>
        <span className='text'>{list.length} объектов</span>
        <IconButton
          size='small'
          onClick={() => onClose([])}
        >
          <CloseIcon
            fontSize="inherit"
          />
        </IconButton>
      </div>
      <div className='bar-bottom'>
        {
          list.map((item, idx) =>
            <MapSideBarItem
              item={item}
              key={item.reqNumber}
            />
          )
        }
      </div>
    </motion.div>
  )
}