import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

import Setting from 'images/setting.svg';

import { ModalWindow } from 'components/ModalWindow';
import { ModalExtraFilter } from 'components/ModalExtraFilter';

export function ButtonExtra({ sourceValue, extra, setExtra }) {
  const [open, setOpen] = useState(false)

  const onClose = () => {
    setOpen(!open);
  }
  return (
    <>
      <IconButton aria-label="setting"
        onClick={onClose}
      >
        <Badge badgeContent={0} color="primary">
          <span className="text"
            style={{ display: 'block', fontSize: 12, margin: '0 0.2rem 0 0' }}
          >еще</span>
          <Setting
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
            <ModalExtraFilter
              extra={extra}
              setExtra={setExtra}
              sourceValue={sourceValue}
              onClose={onClose}
            />}
        />
      }
    </>
  )
}