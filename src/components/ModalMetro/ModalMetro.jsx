import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useForm, Controller } from 'react-hook-form';

import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import { SelectForm } from 'components/SelectForm';

import { setMetro } from 'actions/filter';

import './ModalMetro.scss';

export function ModalMetro({ onClose, metro }) {
  const dispatch = useDispatch();

  const [metroAll, setMetroAll] = useState(false,);

  useEffect(() => {
    metro?.isMetroAll && setMetroAll(metro.isMetroAll)
  }, [])

  const {
    handleSubmit,
    register,
    control,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
      metro: metro?.metro ? metro.metro : [],
      metroDistance: metro?.metroDistance || '',
      isMetroAll: metro?.isMetroAll || false,
    }
  })

  const onSubmit = (data) => {
    dispatch(setMetro(data))
    onClose()
    console.log(data);
  }

  const handleAll = (event) => {
    const checked = event.target.checked;
    setValue('metro', checked ? [...metroFirstLine, ...metroSecondLine] : []);
    setMetroAll(checked)
  }

  return (
    <>
      <DialogTitle
        sx={{ fontFamily: 'Montserrat', fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        Поиск по станции метро
        <IconButton
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='metro'>
            <div className='metro__column'>
              <span className='text metro__text'>Ленинская линия</span>
              {
                metroFirstLine.map((metro, idx) =>
                  <FormControlLabel key={idx} control={
                    <Checkbox
                      value={metro}
                      checked={getValues().metro.find(item => item === metro) ? true : false}
                      disabled={metroAll}
                      {...register('metro', { required: !metroAll ? true : false })}
                    />} label={metro} />
                )
              }
            </div>
            <div className='metro__column'>
              <span className="text metro__text">Дзержинская линия</span>
              {
                metroSecondLine.map((metro, idx) =>
                  <FormControlLabel key={idx} control={
                    <Checkbox
                      value={metro}
                      checked={getValues().metro.find(item => item === metro) ? true : false}
                      disabled={metroAll}
                      {...register('metro', { required: !metroAll ? true : false })}
                    />} label={metro} />
                )
              }
            </div>
            <div className='metro__column'>
              <span className='text metro__text'>Время до метро</span>
              <div>
                <SelectForm
                  control={control}
                  name='metroDistance'
                  label='Пешком'
                  multiple={false}
                  disabled={!metroAll}
                  rules={{
                    required: {
                      value: metroAll ? true : false,
                      message: 'Выберете время до метро'
                    }
                  }}
                  error={errors?.metroDistance ? true : false}
                />
                <span className="text"
                  style={{ color: 'red', fontSize: 12 }}
                >{errors?.metroDistance?.message && errors.metroDistance.message}</span>
              </div>
              <Controller
                control={control}
                name='isMetroAll'
                render={({ field }) =>
                  <FormControlLabel
                    label='Рядом с метро (выбрать все)'
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={(event) => { handleAll(event), field.onChange(event) }}
                      />
                    } />
                }
              />
            </div>
          </div>
          <div>
            <span className="text"
              style={{ color: 'red', fontSize: 12, textAlign: 'end', display: 'block' }}
            >{errors?.metro && 'Выберете станцию метро'}</span>
          </div>
          <DialogActions >
            <Button
              color='error'
              onClick={() => { dispatch(setMetro({})), onClose() }}
            >Очистить</Button>
            <Button type='submit' variant='outlined'>Сохранить</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </>
  )
}

const metroFirstLine = [
  'Площадь Маркса',
  'Студенческая',
  'Речной вокзал',
  'Октябрьская',
  'Площадь Ленина',
  'Красный проспект',
  'Гагаринская',
  'Заельцовская',
]

const metroSecondLine = [
  'Площадь Гарина-Махайловского',
  'Сибирская',
  'Маршала Покрышкина',
  'Березовая роща',
  'Золотая Нива',
]