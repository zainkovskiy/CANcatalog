import React, { useState } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export function Source() {
  const [alignment, setAlignment] = useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <>
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="web">Web <span style={{display: 'block', width: 40, height: 40, 
        backgroundImage: 'url(https://crm.centralnoe.ru/CDB/catalog/filter/desktop/img/centr-small.png)', backgroundSize: 'contain'}}></span></ToggleButton>
        <ToggleButton value="android">Android</ToggleButton>
        <ToggleButton value="ios">iOS</ToggleButton>
      </ToggleButtonGroup>
    </>
  )
}