import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import moment from 'moment';

import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Checkbox from '@mui/material/Checkbox';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import './ModalExtraFilter.scss';

const defaultPropsField = {
  autoComplete: 'off',
  type: "text",
  variant: "outlined",
  size: 'small',
}

export function ModalExtraFilter({ sourceValue, onClose, extra, setExtra }) {
  const {
    handleSubmit,
    register,
    getValues,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      reqFlatTotalArea: extra?.reqFlatTotalArea || '',
      reqKitchenArea: extra?.reqKitchenArea || '',
      reqFlatLivingArea: extra?.reqFlatLivingArea || '',
      reqLandArea: extra?.reqLandArea || '',
      reqTypeofLayout: extra?.reqTypeofLayout || 'nothing',
      reqBathroomType: extra?.reqBathroomType || 'nothing',
      reqRepairStatus: extra?.reqRepairStatus || 'nothing',
      reqGalleryAvailability: extra?.reqGalleryAvailability || 'nothing',
      reqFloor: extra?.reqFloor || '',
      reqFloorCount: extra?.reqFloorCount || '',
      notFloorFirst: extra?.notFloorFirst || false,
      deadline: moment()
    }
  });

  const onSubmit = (data) => {
    console.log(data);
    setExtra(data)
  }

  const isReady = watch('ready');

  useEffect(() => {
    console.log(extra);
  }, [])

  return (
    <>
      <DialogTitle
        sx={{ fontFamily: 'Montserrat', fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        Дополнительные фильтры
        <IconButton
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <form
          className='extra'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='extra__row'>
            <span className="text extra__title">Площадь м2</span>
            <div className='extra__value'>
              <div>
                <span className='extra__description'>Общая</span>
                <div className='extra__inputs'>
                  <TextField
                    {...defaultPropsField}
                    label="От"
                    {...register('reqFlatTotalArea[0]')}
                  />
                  <TextField
                    {...defaultPropsField}
                    label="До"
                    {...register('reqFlatTotalArea[1]')}
                  />
                </div>
              </div>
              {
                sourceValue !== 'pars' &&
                <>
                  <div>
                    <span className='extra__description'>Кухня</span>
                    <div className='extra__inputs'>
                      <TextField
                        {...defaultPropsField}
                        label="От"
                        {...register('reqKitchenArea[0]')}
                      />
                      <TextField
                        {...defaultPropsField}
                        label="До"
                        {...register('reqKitchenArea[1]')}
                      />
                    </div>
                  </div>
                  <div>
                    <span className='extra__description'>Жилая</span>
                    <div className='extra__inputs'>
                      <TextField
                        {...defaultPropsField}
                        label="От"
                        {...register('reqFlatLivingArea[0]')}
                      />
                      <TextField
                        {...defaultPropsField}
                        label="До"
                        {...register('reqFlatLivingArea[1]')}
                      />
                    </div>
                  </div>
                </>
              }
            </div>
          </div>
          {
            sourceValue === '1c' &&
            <div className='extra__row'>
              <span className="text extra__title">Площадь участка в сотках</span>
              <div className='extra__value'>
                <div className='extra__inputs'>
                  <TextField
                    {...defaultPropsField}
                    label="От"
                    {...register('reqLandArea[0]')}
                  />
                  <TextField
                    {...defaultPropsField}
                    label="До"
                    {...register('reqLandArea[1]')}
                  />
                </div>
              </div>
            </div>
          }
          {
            sourceValue === '1c' &&
            <div className='extra__row'>
              <span className="text extra__title">Планировка</span>
              <Controller
                name='reqTypeofLayout'
                control={control}
                render={({ field }) =>
                  <ToggleButtonGroup
                    color="primary"
                    exclusive
                    {...field}
                    size='small'
                  >
                    <ToggleButton value="nothing">Неважно</ToggleButton>
                    <ToggleButton value="adjacent">Смежная</ToggleButton>
                    <ToggleButton value="isolated">Изолированная</ToggleButton>
                    <ToggleButton value="free">Свободная</ToggleButton>
                  </ToggleButtonGroup>
                }
              />
            </div>
          }
          {
            sourceValue !== 'pars' &&
            <div className='extra__row'>
              <span className="text extra__title">Санузел</span>
              <Controller
                name='reqBathroomType'
                control={control}
                render={({ field }) =>
                  <ToggleButtonGroup
                    color="primary"
                    exclusive
                    {...field}
                    size='small'
                  >
                    <ToggleButton value="nothing">Неважно</ToggleButton>
                    <ToggleButton value="combined">Совмещенный</ToggleButton>
                    <ToggleButton value="separated">Раздельный</ToggleButton>
                  </ToggleButtonGroup>
                }
              />
            </div>
          }
          {
            sourceValue !== 'pars' &&
            <div className='extra__row'>
              <span className="text extra__title">Балкон/Лоджия</span>
              <Controller
                name='reqGalleryAvailability'
                control={control}
                render={({ field }) =>
                  <ToggleButtonGroup
                    color="primary"
                    exclusive
                    {...field}
                    size='small'
                  >
                    <ToggleButton value="nothing">Неважно</ToggleButton>
                    <ToggleButton value="true">Есть</ToggleButton>
                    <ToggleButton value="false">Нет</ToggleButton>
                  </ToggleButtonGroup>
                }
              />
            </div>
          }
          {
            sourceValue === '1c' &&
            <div className='extra__row'>
              <span className="text extra__title">Ремонт</span>
              <Controller
                name='reqRepairStatus'
                control={control}
                render={({ field }) =>
                  <ToggleButtonGroup
                    color="primary"
                    exclusive
                    {...field}
                    size='small'
                  >
                    <ToggleButton value="nothing">Неважно</ToggleButton>
                    <ToggleButton value="noRenovation">Без ремонта</ToggleButton>
                    <ToggleButton value="cosmetic">Косметический</ToggleButton>
                    <ToggleButton value="renovation">Евроремонт</ToggleButton>
                    <ToggleButton value="designer">Дизайнерский</ToggleButton>
                  </ToggleButtonGroup>
                }
              />
            </div>
          }
          <div className='extra__row'>
            <span className="text extra__title">Этаж</span>
            <div className='extra__value'>
              <div className='extra__inputs'>
                <TextField
                  {...defaultPropsField}
                  label="От"
                  {...register('reqFloor[0]')}
                />
                <TextField
                  {...defaultPropsField}
                  label="До"
                  {...register('reqFloor[1]')}
                />
              </div>
              <label className='extra__checkbox-label'>
                <Checkbox

                //этот чекбокс вроде готов
                  checked={getValues().notFloorFirst}
                  {...register('notFloorFirst')}
                />
                Не первый
              </label>
              <label className='extra__checkbox-label'>
                <Checkbox
                  {...register('notFloorLast')}
                />
                Не последний
              </label>
            </div>
          </div>
          {
            sourceValue !== 'pars' &&
            <div className='extra__row'>
              <span className="text extra__title">Этажей в доме</span>
              <div className='extra__value'>
                <div className='extra__inputs'>
                  <TextField
                    {...defaultPropsField}
                    label="От"
                    {...register('reqFloorCount[0]')}
                  />
                  <TextField
                    {...defaultPropsField}
                    label="До"
                    {...register('reqFloorCount[1]')}
                  />
                </div>
              </div>
            </div>
          }
          {
            sourceValue === 'mls' &&
            <div className='extra__row'>
              <span className="text extra__title">Срок сдачи</span>
              <div className='extra__value'>
                <Controller
                  name='quarter'
                  control={control}
                  render={({ field }) =>
                    <ToggleButtonGroup
                      color="primary"
                      exclusive
                      {...field}
                      size='small'
                      disabled={isReady}
                    >
                      <ToggleButton value="I">I</ToggleButton>
                      <ToggleButton value="II">II</ToggleButton>
                      <ToggleButton value="III">III</ToggleButton>
                      <ToggleButton value="IV">IV</ToggleButton>
                    </ToggleButtonGroup>
                  }
                />
                <Controller
                  control={control}
                  name="deadline"
                  rules={{
                    validate: event => event.isSameOrAfter(moment(), 'year') || 'Не меньше чем текущий'
                  }}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePicker
                        views={['year']}
                        label="Срок сдачи*"
                        {...field}
                        disabled={isReady}
                        renderInput={(params) =>
                          <TextField {...params}
                            size="small"
                            autoComplete='off'
                            helperText={errors?.deadline?.message ? errors?.deadline?.message : ''}
                            error={errors?.deadline ? true : false}
                          />}
                      />
                    </LocalizationProvider>
                  )}
                />
                <label className='extra__checkbox-label'>
                  <Checkbox
                    {...register('ready')}
                  />
                  Дом сдан
                </label>
              </div>
            </div>
          }
          <div className='extra__row'>
            <span className="text extra__title"></span>
            <div>
              {
                sourceValue === 'pars' &&
                <label className='extra__checkbox-label'>
                  <Checkbox
                    {...register('isShowAgent')}
                  />
                  Не выводить агентства
                </label>
              }
              {
                sourceValue === '1c' &&
                <div className='extra__value'>
                  <label className='extra__checkbox-label'>
                    <Checkbox
                      {...register('isReserve')}
                    />
                    Не выводить зарезервированные
                  </label>
                  <label className='extra__checkbox-label'>
                    <Checkbox
                      {...register('onlyCancel')}
                    />
                    Выводить только отмененные
                  </label>
                </div>
              }
              {
                sourceValue === 'mls' &&
                <>
                  <label className='extra__checkbox-label'>
                    <Checkbox
                      {...register('buildingMortgage')}
                    />
                    Ипотека
                  </label>
                  <label className='extra__checkbox-label'>
                    <Checkbox
                      {...register('buildingVoenMortgage')}
                    />
                    Военная ипотека
                  </label>
                  <label className='extra__checkbox-label'>
                    <Checkbox
                      {...register('buildingInstallment')}
                    />
                    Рассрочка
                  </label>
                </>
              }
            </div>
          </div>
          <DialogActions >
            <Button type='submit'>Save(console)</Button>
            <Button type='reset'>Clear(no working)</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </>
  )
}