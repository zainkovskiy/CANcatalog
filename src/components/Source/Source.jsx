import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { source } from 'actions/filter';

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

export function Source({ sourceValue }) {
  const dispatch = useDispatch();
  const [alignment, setAlignment] = useState(sourceValue);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    dispatch(source(alignment))
  }, [alignment])
  
  return (
    <>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        sx={{justifyContent: 'center'}}
      >
        <ToggleButton value="1c">1c
          <span
            style={{
              backgroundImage: 'url(https://crm.centralnoe.ru/CDB/catalog/filter/desktop/img/centr-small.png)', ...logoStyle,
            }}>
          </span>
        </ToggleButton>
        <ToggleButton value="pars">
          pars
          <span
            style={{
              backgroundImage: 'url(https://crm.centralnoe.ru/CDB/catalog/filter/desktop/img/all.png)', ...logoStyle, backgroundSize: '200%',
            }}>
          </span>
        </ToggleButton>
        <ToggleButton value="mls">
          mls
          <span
            style={{
              backgroundImage: 'url(https://crm.centralnoe.ru/dealincom/assets/building.png)', ...logoStyle,
            }}>
          </span>
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  )
}