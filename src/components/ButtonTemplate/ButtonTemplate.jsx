import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMore from '@mui/icons-material/ExpandMore';

import { ModalWindow } from 'components/ModalWindow';

import { getCards } from 'actions/cards';
import { loader, loaderMap } from 'actions/filter';

export function ButtonTemplate({ sourceValue, isMap }) {
  const filterMain = useSelector((state => state.filter.get('filter')));
  const dispatch = useDispatch();
  const [openClientID, setOpenClientID] = useState(false);
  const [openInputURL, setOpenInputURL] = useState(false);
  const [modalEl, setModalEl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const openModal = Boolean(modalEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickModal = (source) => {
    setModalEl(source);
  };
  const handleCloseModal = () => {
    setModalEl(null);
  };
  const handlerSelect = (req) => {
    isMap ? dispatch(loaderMap()) : dispatch(loader());
    dispatch(getCards(req, isMap))
  }
  const handlerReq = (action, value) => {
    isMap ? dispatch(loaderMap()) : dispatch(loader());
    setOpenInputURL(false);
    setOpenClientID(false);
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
              onClick={() => { handlerSelect({ action: 'get', onlyMy: userLogin, type: filterMain.reqTypeofRealty }), handleClose() }}
            >Показать мои</MenuItem>
          }
          {
            sourceValue === '1c' &&
            <MenuItem
              onClick={() => { handlerSelect({ action: 'get', onlyOffice: userLogin, type: filterMain.reqTypeofRealty }), handleClose() }}
            >Показать мой офис</MenuItem>
          }
          {
            sourceValue === '1c' &&
            <MenuItem
              onClick={() => { setOpenClientID(!openClientID), handleClose() }}
            >По номеру в объявлении</MenuItem>
          }
          {
            sourceValue === 'pars' &&
            <MenuItem
              onClick={() => { setOpenInputURL(!openInputURL), handleClose() }}
            >Поиск по ссылке</MenuItem>
          }
          {
            sourceValue === '1c' &&
            <MenuItem
              onClick={() => { handleClickModal('office'), handleClose(); }}
            >По другому офису
            </MenuItem>
          }
          {
            sourceValue === '1c' &&
            <MenuItem
              onClick={() => { handleClickModal('realtor'), handleClose(); }}
            >Поиск по риелтору
            </MenuItem>
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
      {
        openModal &&
        <ModalWindow
          open={openModal}
          maxSize='sm'
          onClose={handleCloseModal}
        >
          <TemplateSearchModalWindow
            source={modalEl}
            onClose={handleCloseModal}
            setReq={handlerReq}
          />
        </ModalWindow>
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
import MenuList from '@mui/material/MenuList';
import Autocomplete from '@mui/material/Autocomplete';

const TemplateModalWindow = (props) => {
  const { onClose, title, description, setReq, action } = props;
  const [value, setValue] = useState('');
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
          value={value}
          onChange={(event) => { setValue(event.target.value) }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          size='medium'
          variant="contained"
          onClick={() => setReq(action, value)}
          disabled={Boolean(!value)}
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

const TemplateSearchModalWindow = ({ source, onClose, setReq }) => {
  const [open, setOpen] = useState(false); ``
  const [loading, setLoading] = useState(false); ``
  const [options, setOptions] = useState([]);
  const [selectValue, setSelectValue] = useState('');

  const findOptions = async (value) => {
    if (value === 0) {
      return
    }
    if(!value || value?.length < 1){
      setSelectValue('')
    }
    setLoading(true);
    setOpen(false);
    await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Filter/FilterUsers.php', {
      [source === 'office' ? 'department' : 'employee']: value,
      // [source === 'office' ? 'onlyOffice' : 'employee']: source === 'office' ? 'onlyOffice' : 'employee',
    }).then((data) => {
      setOptions(data.data);
    }).finally(() => {
      setLoading(false);
      setOpen(true);
    })
  }

  const getLabel = (option) => {
    if (source === 'office') {
      return option.depName;
    }
    if (source === 'realtor') {
      return option.LAST_NAME;
    }
  }

  const handleChange = (value) => {
    setSelectValue(value);
  }

  const handleSearch = () => {
    setReq(
      source === 'office' ? 'getByOffice' : 'getByRealtor',
      selectValue
    );
    onClose();
  }

  return (
    <>
      <DialogTitle
        sx={{ fontFamily: 'Montserrat', fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        Поиск по {' '}
        {
          source === 'office' &&
          'офису'
        }
        {
          source === 'realtor' &&
          'риелтору'
        }
        <IconButton
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div style={{width: '100%', height: '50vh'}}>
          <Autocomplete
            size='small'
            disablePortal
            options={options}
            open={open}
            onOpen={() => { setOpen(true); }}
            onClose={() => { setOpen(false); }}
            onChange={(event, newValue) => handleChange(newValue)}
            isOptionEqualToValue={(option, value) => source === 'realtor' ? option.ID === value.ID : option.depName === value.depName}
            onInputChange={(event) => findOptions(event.target.value)}
            getOptionLabel={(option) => getLabel(option)}
            loading={loading}
            loadingText={<span className='text'><em>Загрузка...</em></span>}
            noOptionsText={<span className='text'>Не найдено</span>}
            renderInput={(params) => <TextField {...params} />}
            filterOptions={(x) => x}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          size='medium'
          variant="contained"
          onClick={handleSearch}
          disabled={!selectValue}
        >
          Найти
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
