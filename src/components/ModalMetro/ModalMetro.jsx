import React from 'react';

import { useForm } from 'react-hook-form';

import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export function ModalMetro() {
  const {
    handleSubmit,
    register
  } = useForm({
    mode: 'onSubmit'
  })

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <>
      <DialogTitle
        sx={{ fontFamily: 'Montserrat' }}
      >
        ModalMetro
      </DialogTitle>
      <DialogContent>
        <hr />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{display: 'flex'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <span className='text'>Ленинская линия</span>
              {
                metroFirstLine.map((metro, idx) =>
                  <FormControlLabel key={idx} control={<Checkbox {...register('metro')} value={metro} />} label={metro} />
                )
              }
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <span className="text">Дзержинская линия</span>
              {
                metroSecondLine.map((metro, idx) =>
                  <FormControlLabel key={idx} control={<Checkbox {...register('metro')} value={metro} />} label={metro} />
                )
              }
            </div>
          </div>
          <hr />
          <DialogActions>
            <Button type='submit'>Save</Button>
            <Button>Clear</Button>
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