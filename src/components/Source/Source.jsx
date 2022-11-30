import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { source, setExtra } from 'actions/filter';

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

export function Source({ sourceValue, handlerClearFilter, getCountObjects }) {
  const dispatch = useDispatch();
  const [alignment, setAlignment] = useState(sourceValue);
  const firstUpdate = useRef(true);

  const handleChange = (event, newAlignment) => {
    if (newAlignment) {
      setAlignment(newAlignment);
    }
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return
    }
    dispatch(source(alignment));
    dispatch(setExtra({}));
    handlerClearFilter();
    getCountObjects();
  }, [alignment])


  return (
    <>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        sx={{ justifyContent: 'center' }}
      >
        <ToggleButton value="1c" sx={{padding: '0.4rem'}}>
          Проверено
          <span
            style={{
              backgroundImage: 'url(https://crm.centralnoe.ru/CDB/catalog/filter/desktop/img/centr-small.png)', ...logoStyle,
            }}>
          </span>
        </ToggleButton>
        <ToggleButton value="pars" sx={{padding: '0.4rem'}}>
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