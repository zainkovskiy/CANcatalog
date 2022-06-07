import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

import { ModalWindow } from 'components/ModalWindow';
import { ModalMetro } from 'components/ModalMetro';

import MetroSvg from 'images/Metro.svg';

export function ButtonMetro() {
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
        <Badge badgeContent={0} color="primary">
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
          children={<ModalMetro/>}
        />
      }
    </>
  )
}