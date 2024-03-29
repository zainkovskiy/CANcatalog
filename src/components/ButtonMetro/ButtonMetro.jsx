import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';

import { ModalWindow } from 'components/ModalWindow';
import { ModalMetro } from 'components/ModalMetro';

import MetroSvg from 'images/Metro.svg';

export function ButtonMetro({ getCountObjects }) {
  const metro = useSelector((state) => state.filter.get('metro'));
  
  const [open, setOpen] = useState(false)

  const onClose = () => {
    setOpen(!open);
  }

  return (
    <>
      <IconButton
        aria-label="setting"
        onClick={onClose}
      >
        <Badge badgeContent={metro?.metro?.length} color="primary">
          <MetroSvg
            style={{ width: 20, height: 20 }}
          />
        </Badge>
      </IconButton>
      {
        open &&
        <ModalWindow
          open={open}
          onClose={onClose}
          children={
            <ModalMetro
              onClose={onClose}
              metro={metro}
              getCountObjects={getCountObjects}
            />}
        />
      }
    </>
  )
}