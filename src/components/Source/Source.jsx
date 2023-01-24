import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { source, setExtra, trash } from 'actions/filter';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const logoStyle = {
  display: 'block',
  width: 24.5,
  height: 24.5,
  margin: '0 0 0 0.5rem',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat'
}

export function Source({ sourceValue, trashValue, handlerClearFilter, getCountObjects }) {
  const dispatch = useDispatch();
  const [alignment, setAlignment] = useState(sourceValue);
  const [clickValue, setClickValue] = useState(false);
  const firstUpdate = useRef(true);

  const handleChange = (event) => {
    if (event.target.id) {
      setAlignment(event.target.id);
      dispatch(source(event.target.id));
      dispatch(trash(false));
      setClickValue(!clickValue);
    }
  };

  const handleChangeTrash = (event, newAlignment) => {
    setAlignment('1c');
    dispatch(source('1c'));
    dispatch(trash(true));
    setClickValue(!clickValue);
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return
    }
    handlerClearFilter();
    getCountObjects(true);
  }, [clickValue])


  return (
    <>
      <ToggleButtonGroup
        color="primary"
        sx={{ justifyContent: 'center' }}
      >
        <ToggleButton
          selected={alignment === '1c' && !trashValue}
          sx={{ padding: '0.4rem' }}
          id="1c"
          onClick={handleChange}
          value='1c'
        >
          Проверено
          <span
            style={{
              backgroundImage: 'url(https://crm.centralnoe.ru/CDB/catalog/filter/desktop/img/centr-small.png)', ...logoStyle,
            }}>
          </span>
        </ToggleButton>
        <ToggleButton
          onClick={handleChangeTrash}
          selected={trashValue}
          id="1c"
          sx={{ padding: '0.4rem' }}
          value='1c'
        >
          Свободные объекты
        </ToggleButton>
        <ToggleButton
          selected={alignment === 'pars'}
          id="pars"
          sx={{ padding: '0.4rem' }}
          onClick={handleChange}
          value='pars'
        >
          Не Проверено
          <span
            style={{
              backgroundImage: 'url(https://crm.centralnoe.ru/CDB/catalog/filter/desktop/img/all.png)', ...logoStyle, backgroundSize: '200%',
            }}>
          </span>
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  )
}