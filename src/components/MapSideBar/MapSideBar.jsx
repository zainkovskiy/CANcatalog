import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { MapSideBarItem } from 'components/MapSideBarItem';

import { setSideBarCards } from 'actions/cards';
import './MapSideBar.scss';

export function MapSideBar() {
  const dispatch = useDispatch();
  const sideBarList = useSelector((state) => state.cards.get('sideBarCards').toJS())

  const onClose = () => {
    dispatch(setSideBarCards([]))
  }

  return (
    <AnimatePresence>
      {
        sideBarList.length > 0 &&
        <motion.div
          className='bar'
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          <div className='bar-top'>
            <span className='text'>{sideBarList.length} объектов</span>
            <IconButton
              size='small'
              onClick={onClose}
            >
              <CloseIcon
                fontSize="inherit"
              />
            </IconButton>
          </div>
          <div className='bar-bottom'>
            {
              sideBarList.map((item, idx) =>
                <MapSideBarItem
                  item={item}
                  key={item.reqNumber}
                />
              )
            }
          </div>
        </motion.div>
      }
    </AnimatePresence>
  )
}