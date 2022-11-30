import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { filter } from 'actions/filter';

import { selectList } from '../../selectList';

export function SelectTypeofRealty({ typeOfRealty, selectType, openSelectType }) {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);

  const handlerSelect = (name, value) => {
    dispatch(filter({
      name: name,
      value: value
    }))
  }
  return (
    <div style={{ position: 'relative' }}>
      <TextField
        autoComplete='off'
        id="outlined-basic"
        label="Тип недвижимости"
        ariant="outlined"
        size='small'
        value={typeOfRealty}
        inputProps={
          {
            readOnly: true,
            'data-search': 'yes',
            style: { cursor: 'pointer' }
          }
        }
        onClick={() => { openSelectType(!selectType) }}
        fullWidth
      />
      <AnimatePresence>
        {
          selectType &&
          <motion.div
            className="search"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            data-search='yes'
          >

            <ListItemButton
              onClick={() => setOpen(!open)}
              data-search='yes'

            >
              <ListItemText primary="Квартиры - Вторичка" data-search='yes'
                primaryTypographyProps={{ 'data-search': 'yes' }}
              />
              {open ? <ExpandLess data-search='yes' /> : <ExpandMore data-search='yes' />}
            </ListItemButton>

            <Collapse in={open} timeout="auto" unmountOnExit data-search='yes'>
              <List component="div" disablePadding data-search='yes'>
                <MenuItem
                  sx={{ pl: 4 }}
                  onClick={() => { handlerSelect('reqTypeofRealty', 'Новостройки') }}
                  selected={typeOfRealty === 'Новостройки'}
                >
                  Новостройка
                </MenuItem>
                <MenuItem
                  sx={{ pl: 4 }}
                  onClick={() => { handlerSelect('reqTypeofRealty', 'Вторичка') }}
                  selected={typeOfRealty === 'Вторичка'}
                >
                  Вторичка
                </MenuItem>
              </List>
            </Collapse>
            {
              selectList.reqTypeofRealty.map((item, idx) =>
                <MenuItem
                  key={idx}
                  onClick={() => { handlerSelect('reqTypeofRealty', `${item}`) }}
                  selected={typeOfRealty === item}
                >
                  {item}
                </MenuItem>
              )
            }
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}