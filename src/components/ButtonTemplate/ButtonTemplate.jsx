import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { ModalWindow } from 'components/ModalWindow';

import { getCards } from 'actions/cards';
import { loader, loaderMap } from 'actions/filter';

export function ButtonTemplate({ sourceValue, isMap }) {
  const dispatch = useDispatch();
  const [openClientID, setOpenClientID] = useState(false);
  const [openInputURL, setOpenInputURL] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlerSelect = (req) => {
    isMap ? dispatch(loaderMap()) : dispatch(loader());
    dispatch(getCards(req, isMap))
  }
  const handlerReq = (action, value) => {
    isMap ? dispatch(loaderMap()) : dispatch(loader());
    setOpenInputURL(false);
    dispatch(getCards({
      action: 'get',
      [action]: [value]
    }, isMap))
  }
  return (
    <>
      <div>
        <Button
          variant="contained"
          size="small"
          onClick={handleClick}
        >
          Шаблон
          <ExpandMore />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {
            sourceValue === '1c' &&
            <MenuItem
              onClick={() => { handlerSelect({ action: 'get', onlyMy: userLogin }), handleClose() }}
            >Только мои</MenuItem>
          }
          {
            sourceValue === '1c' &&
            <MenuItem
              onClick={() => { handlerSelect({ action: 'get', onlyOffice: myOffice }), handleClose() }}
            >Мой офис</MenuItem>
          }
          {
            sourceValue === '1c' &&
            <MenuItem
              onClick={() => { setOpenClientID(!openClientID), handleClose() }}
            >Поиск по клиенту</MenuItem>
          }
          {
            sourceValue === 'pars' &&
            <MenuItem
              onClick={() => { setOpenInputURL(!openInputURL), handleClose() }}
            >Поиск по ссылке</MenuItem>
          }
        </Menu>
      </div>
      {
        openClientID &&
        <ModalWindow
          maxSize='sm'
          open={openClientID}
          onClose={() => setOpenClientID(!openClientID)}
          children={<TemplateModalWindow
            onClose={() => setOpenClientID(!openClientID)}
            title='Поиск по номеру для клиента'
            description='Введите номер для клиента (6 цифр)'
            setReq={handlerReq}
            action='clientIdInner'
          />}
        />
      }
      {
        openInputURL &&
        <ModalWindow
          maxSize='sm'
          open={openInputURL}
          onClose={() => setOpenInputURL(!openInputURL)}
          children={<TemplateModalWindow
            onClose={() => setOpenInputURL(!openInputURL)}
            title='Поиск по ссылке'
            description='Укажите ссылку на объявление'
            setReq={handlerReq}
            action='outURL'
          />}
        />
      }
    </>
  )
}

import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';

const TemplateModalWindow = (props) => {
  const { onClose, title, description, setReq, action } = props;
  const [ value, setValue ] = useState('');
  return (
    <>
      <DialogTitle
        sx={{ fontFamily: 'Montserrat', fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        {title}
        <IconButton
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <span className='text'>{description}</span>
        <TextField
          autoComplete='off'
          id="outlined-basic"
          variant="outlined"
          size='small'
          fullWidth
          sx={{ mt: '0.5rem' }}
          value={ value }
          onChange={(event) => { setValue(event.target.value) } }
        />
      </DialogContent>
      <DialogActions>
        <Button
          size='medium'
          variant="contained"
          onClick={() => setReq(action, value)}
          disabled={ Boolean(!value) }
        >
          Сохранить
        </Button>
        <Button
          size='medium'
          variant="outlined"
          color='error'
          onClick={onClose}
        >
          Закрыть
        </Button>
      </DialogActions>
    </>
  )
}