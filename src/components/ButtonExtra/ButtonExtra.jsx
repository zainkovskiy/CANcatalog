import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';

import Setting from 'images/setting.svg';

import { ModalWindow } from 'components/ModalWindow';
import { ModalExtraFilter } from 'components/ModalExtraFilter';

export function ButtonExtra({ sourceValue }) {
  const extra = useSelector((state) => state.filter.get('extra'));
  const [open, setOpen] = useState(false)
  const [countExtra, setCountExtra] = useState(0)

  useEffect(() => {
    countValue();
  }, [extra])

  const onClose = () => {
    setOpen(!open);
  }


  const countValue = () => {
    if (Object.keys(extra).length > 0) {
      setCountExtra(0);
      for (let key in extra) {
        if (checkValue(key, extra[key])) {
          setCountExtra(prevCountExtra => {
            return prevCountExtra + 1
          })
          if (key === 'ready') {
            setCountExtra(prevCountExtra => {
              return prevCountExtra - 2
            })
          }
        }
      }
    } else {
      setCountExtra(0)
    }
  }
  const checkValue = (key, value) => {
    if (!value) {
      return false
    }
    if (value === 'nothing') {
      return false
    }
    if (Array.isArray(value) && !value[0] && !value[0]) {
      return false
    }
    if (sourceValue !== 'mls') {
      if (key === 'quarter' || key === 'deadline') {
        return false;
      }
    }
    return true
  }
  return (
    <>
      <IconButton aria-label="setting"
        onClick={onClose}
      >
        <Badge badgeContent={countExtra} color="primary">
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
              sourceValue={sourceValue}
              onClose={onClose}
            />}
        />
      }
    </>
  )
}