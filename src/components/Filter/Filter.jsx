import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import { filter, setExtra } from 'actions/filter';

import TextField from '@mui/material/TextField';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

import { SelectSimple } from 'components/SelectSimple';
import { Dadata } from 'components/Dadata';

import './Filter.scss';

export function Filter(props) {
  const { getBuilderVariants, sourceValue, builderList, clearBuilderList } = props;
  const filterState = useSelector((state) => state.filter.get('filter'));
  const dispatch = useDispatch();

  const [openBuild, setOpenBuild] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [price, setPrice] = useState(['', '']);
  const priceRef = useRef(null);
  const firstUpdate = useRef(true);

  //вешает обработчик событий на открытые листы
  useEffect(() => {
    document.addEventListener('click', checkSelectList);
    return () => {
      document.removeEventListener('click', checkSelectList)
    }
  }, [])

  //ставит фокус на инупт прайс от
  useEffect(() => {
    if (openPrice) {
      priceRef.current.focus()
    }
  }, [openPrice])

  //записывает занчения прайса в state
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return
    }
    handlerSelect('price', price)
  }, [from, to])

  const handlerBuilder = (event) => {
    getBuilderVariants(event.target.value);
    setOpenBuild(true)
  }

  const checkSelectList = () => {
    if (event.target.dataset.search !== 'yes') {
      openPrice || setOpenPrice(false);
      openBuild || closeBuilderList();
    }
  }
  const closeBuilderList = () => {
    setOpenBuild(false);
    clearBuilderList();
  }

  const setPriceValue = (index, event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === 'priceFrom') {
      setFrom(value);
    } else if (name === 'priceTo') {
      setTo(value);
    }
    setPrice(prevPrice => {
      const currentPrice = prevPrice;
      currentPrice.splice(index, 1, value)
      return currentPrice
    })
  }

  const handlerSelect = (name, value) => {
    dispatch(filter({
      name: name,
      value: value
    }))
    dispatch(setExtra({}));
  }
  return (
    <div className='filter'>
      <SelectSimple
        name='reqTypeofRealty'
        label='Тип недвижимости'
        value={filterState?.reqTypeofRealty || 'Квартиры'}
        onChange={handlerSelect}
        source={sourceValue}
      />
      <div style={{ position: 'relative' }}>
        <TextField
          autoComplete='off'
          label="Застройщик/ЖК"
          size='small'
          name='builder'
          disabled={filterState.reqTypeofRealty !== 'Квартиры - Новостройки'}
          onChange={(event) => { handlerBuilder(event), handlerSelect(event.target.name, { name: event.target.value, type: 'none' }) }}
          value={filterState?.builder?.name || ''}
        />
        {
          (builderList.length > 0 && openBuild) &&
          <MenuList
            sx={{
              bgcolor: "background.paper",
              position: 'absolute',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              zIndex: 99,
              borderRadius: '5px'
            }}
          >
            {
              builderList.map((menu, idx) =>
                <MenuItem
                  key={idx}
                  value={menu.name}
                  onClick={(event) => { handlerSelect('builder', menu) }}
                >
                  {menu.name}
                </MenuItem>
              )
            }
          </MenuList>
        }
      </div>
      <Dadata
        onChange={handlerSelect}
      />
      <SelectSimple
        name='reqRoomCount'
        label='Комнаты'
        multiple
        value={filterState?.reqRoomCount || []}
        onChange={handlerSelect}
        disabled={filterState.reqTypeofRealty === 'Гаражи' || filterState.reqTypeofRealty === 'Земля'}
      />
      <div style={{ position: 'relative' }}>
        <TextField
          autoComplete='off'
          id="outlined-basic"
          label="Цена (тыс.)"
          ariant="outlined"
          size='small'
          name='price'
          value={` ${price[0] ? `от ${price[0]}` : ''} ${price[1] ? `до ${price[1]}` : ''} `}
          inputProps={
            {
              readOnly: true,
              'data-search': 'yes',
              style: { cursor: 'pointer' }
            }
          }
          onClick={(event) => { !event.target.disabled && setOpenPrice(!openPrice) }}
          fullWidth
        />
        <AnimatePresence>
          {
            openPrice &&
            <motion.div
              className="search"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              data-search='yes'
            >
              <TextField
                autoComplete='off'
                id="outlined-basic"
                label="От"
                ariant="outlined"
                size='small'
                name='priceFrom'
                inputRef={priceRef}
                value={from}
                inputProps={
                  {
                    'data-search': 'yes'
                  }
                }
                onChange={(event) => {
                  setPriceValue(0, event);
                }}
              />
              <TextField
                autoComplete='off'
                id="outlined-basic"
                label="До"
                ariant="outlined"
                size='small'
                name='priceTo'
                sx={{ margin: '0.5rem 0 0 0' }}
                value={to}
                inputProps={
                  {
                    'data-search': 'yes',
                  }
                }
                onChange={(event) => { setPriceValue(1, event) }}
              />
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>
  )
}