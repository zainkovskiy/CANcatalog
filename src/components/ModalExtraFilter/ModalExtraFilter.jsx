import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { FormCheckbox } from 'components/FormCheckbox';
import { SelectForm } from 'components/SelectForm';

import { setExtra } from 'actions/filter';

import './ModalExtraFilter.scss';

const defaultPropsField = {
  autoComplete: 'off',
  type: "text",
  variant: "outlined",
  size: 'small',
}

export function ModalExtraFilter({ sourceValue, onClose, extra }) {
  const typeOfRealty = useSelector((state) => state.filter.get('filter').reqTypeofRealty);
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
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
      notFloorLast: extra?.notFloorLast || false,
      isShowAgent: extra?.isShowAgent || false,
      isReserve: extra?.isReserve || false,
      onlyCancel: extra?.onlyCancel || false,
      apartments: extra?.apartments || false,
      buildingMortgage: extra?.buildingMortgage || false,
      buildingVoenMortgage: extra?.buildingVoenMortgage || false,
      buildingInstallment: extra?.buildingInstallment || false,
      elevator: extra?.elevator || false,
      parking: extra?.parking || false,
      stove: extra?.stove || false,
      bathroomInside: extra?.bathroomInside || false,
      bath: extra?.bath || false,
      garage: extra?.garage || false,
      pool: extra?.pool || false,
      quarter: extra?.quarter || moment().quarter().toString(),
      deadline: extra?.deadline || '',
      buildingYear: extra?.buildingYear || '',
      dataPublication: extra?.dataPublication || '',
      heatingType: extra?.heatingType || 'nothing',
      ready: extra?.ready || false,
      material: extra?.material || "nothing",
      typeSale: extra?.typeSale || "nothing",
      photo: extra?.photo || "nothing",
      ceilingHeight: extra?.ceilingHeight || '',
      roomsInside: extra?.roomsInside || '',
      roomsForSale: extra?.roomsForSale || '',
      communications: extra?.communications || ['nothing'],
      typeGround: extra?.typeGround || ['nothing'],
      status: extra?.status || 'actual',
      statusDate: extra?.statusDate || '',
      withoutDocs: extra?.withoutDocs || false,
      hasExclusive: extra?.hasExclusive || false,
    }
  });


  const onSubmit = (data) => {
    console.log(data);
    dispatch(setExtra(data));
    onClose();
  }

  const isReady = watch('ready');
  const isWithoutDocs = watch('withoutDocs');
  const isStatusDate = watch('status');

  const handlerToggle = (prevState, value, change) => {
    if (value === 'nothing') {
      change(['nothing']);
      return
    }
    if (prevState.includes('nothing')) {
      change([value]);
      return
    }

    const find = prevState.find(el => el === value);
    if (find) {
      const index = prevState.indexOf(find);
      const newState = prevState;
      newState.splice(index, 1)
      newState.length === 0 ? change(['nothing']) : change(newState)
    } else {
      change([...prevState, value])
    }
  }

  const validateDeadline = (value) => {
    if (value) {
      return value.isSameOrAfter(moment(), 'year')
    }
    return true
  }

  return (
    <>
      <DialogTitle
        sx={{ fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
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
          {
            typeOfRealty !== 'Земля' &&
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
                  (sourceValue !== 'pars' && typeOfRealty !== 'Гаражи') &&
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
          }
          {
            (typeOfRealty === 'Комната' && typeOfRealty === 'Комнаты/Доли') &&
            <div className='extra__row'>
              <span className="text extra__title">Комнаты</span>
              <div className='extra__value'>
                <div className='extra__inputs'>
                  <TextField
                    {...defaultPropsField}
                    label="В квартире"
                    {...register('roomsInside')}
                  />
                  <TextField
                    {...defaultPropsField}
                    label="На продажу"
                    {...register('roomsForSale')}
                  />
                </div>
              </div>
            </div>
          }
          {
            (typeOfRealty === 'Дома/Часть дома' || typeOfRealty === 'Дома' || typeOfRealty === 'Земля') &&
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
            (sourceValue === '1c' && typeOfRealty !== 'Гаражи' && typeOfRealty !== 'Земля' && typeOfRealty !== 'Квартиры - Новостройки') &&
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
            (sourceValue === '1c' && typeOfRealty !== 'Гаражи' && typeOfRealty !== 'Земля' && typeOfRealty !== 'Квартиры - Новостройки') &&
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
            (sourceValue === '1c' && typeOfRealty !== 'Гаражи' && typeOfRealty !== 'Земля') &&
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
            (typeOfRealty !== 'Гаражи' && typeOfRealty !== 'Земля') &&
            <div className='extra__row'>
              <span className="text extra__title">Материал стен</span>
              <div className='extra__value'>
                <div className='extra__inputs' style={{ width: '50%' }}>
                  <SelectForm
                    control={control}
                    name='material'
                    label='Материал стен'
                    multiple={false}
                  />
                </div>
              </div>
            </div>
          }
          {
            (sourceValue === '1c' && typeOfRealty !== 'Гаражи' && typeOfRealty !== 'Земля') &&
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
          {
            (typeOfRealty !== 'Дома' && typeOfRealty !== 'Дома/Часть дома' && typeOfRealty !== 'Гаражи' && typeOfRealty !== 'Земля') &&
            <div className='extra__row'>
              <span className="text extra__title">Этаж</span>
              <div className='extra__value' style={{ flexDirection: 'column' }}>
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
                <div>
                  <FormCheckbox
                    control={control}
                    name='notFloorFirst'
                    label='Не первый'
                  />
                  <FormCheckbox
                    control={control}
                    name='notFloorLast'
                    label='Не последний'
                  />
                </div>
              </div>
            </div>
          }
          {
            (typeOfRealty !== 'Гаражи' && typeOfRealty !== 'Земля') &&
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
            (sourceValue === '1c' && (typeOfRealty === 'Квартиры' || typeOfRealty === 'Квартиры - Новостройки')) &&
            <div className='extra__row'>
              <span className="text extra__title">Высота потолка</span>
              <div className='extra__value'>
                <div className='extra__inputs'>
                  <TextField
                    {...defaultPropsField}
                    label="Высота потолка"
                    {...register('ceilingHeight')}
                  />
                </div>
              </div>
            </div>
          }
          {/* {
            (typeOfRealty === 'Дома/Часть дома' || typeOfRealty === 'Дома') &&
            <div className='extra__row'>
              <span className="text extra__title">Коммуникации</span>
              <Controller
                name='communications'
                control={control}
                render={({ field }) =>
                  <ToggleButtonGroup
                    color="primary"
                    {...field}
                    size='small'
                    onChange={(event) => { handlerToggle(field.value, event.target.value, field.onChange) }}
                  >
                    <ToggleButton value="nothing">Неважно</ToggleButton>
                    <ToggleButton value="electricity">Электричество</ToggleButton>
                    <ToggleButton value="gas">Газ</ToggleButton>
                    <ToggleButton value="waterSupply">Водоснабжение</ToggleButton>
                    <ToggleButton value="sewerage">Канализация</ToggleButton>
                  </ToggleButtonGroup>
                }
              />
            </div>
          } */}
          {/* {
            (typeOfRealty === 'Дома/Часть дома' || typeOfRealty === 'Дома') &&
            <div className='extra__row'>
              <span className="text extra__title">Отопление</span>
              <div className='extra__value'>
                <div className='extra__inputs' style={{ width: '50%' }}>
                  <SelectForm
                    control={control}
                    name='heatingType'
                    label='Отопление'
                    multiple={false}
                  />
                </div>
              </div>
            </div>
          } */}
          {/* {
            (typeOfRealty === 'Дома/Часть дома' || typeOfRealty === 'Дома') &&
            <div className='extra__row'>
              <span className="text extra__title">Использование земель</span>
              <Controller
                name='typeGround'
                control={control}
                render={({ field }) =>
                  <ToggleButtonGroup
                    color="primary"
                    {...field}
                    size='small'
                    onChange={(event) => { handlerToggle(field.value, event.target.value, field.onChange) }}
                  >
                    <ToggleButton value="nothing">Неважно</ToggleButton>
                    <ToggleButton value="IZHS">ИЖС</ToggleButton>
                    <ToggleButton value="garden">Садоводство</ToggleButton>
                    <ToggleButton value="DNP">ДНП</ToggleButton>
                    <ToggleButton value="private">Личное подсобное хозяйтсво</ToggleButton>
                    <ToggleButton value="farmer">Фермерское хозяйтсво</ToggleButton>
                    <ToggleButton value="industry">Земля промназначения</ToggleButton>
                  </ToggleButtonGroup>
                }
              />
            </div>
          } */}
          {/* {
            (typeOfRealty === 'Дома/Часть дома' || typeOfRealty === 'Дома') &&
            <div className='extra__row'>
              <span className="text extra__title">Постройки</span>
              <div>
                <FormCheckbox
                  control={control}
                  name='bath'
                  label='Баня'
                />
                <FormCheckbox
                  control={control}
                  name='garage'
                  label='Гараж'
                />
                <FormCheckbox
                  control={control}
                  name='pool'
                  label='Бассейн'
                />
              </div>
            </div>
          } */}
          {
            (sourceValue === '1c' && typeOfRealty === 'Квартиры - Новостройки') &&
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
                      <ToggleButton value="1">I</ToggleButton>
                      <ToggleButton value="2">II</ToggleButton>
                      <ToggleButton value="3">III</ToggleButton>
                      <ToggleButton value="4">IV</ToggleButton>
                    </ToggleButtonGroup>
                  }
                />
                <Controller
                  control={control}
                  name="deadline"
                  rules={{
                    validate: event => validateDeadline(event) || 'Не меньше чем текущий'
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
                <FormCheckbox
                  control={control}
                  name='ready'
                  label='Дом сдан'
                />
              </div>
            </div>
          }
          {
            (sourceValue === '1c' && typeOfRealty !== 'Квартиры - Новостройки' && typeOfRealty !== 'Гаражи' && typeOfRealty !== 'Земля') &&
            <div className='extra__row'>
              <span className="text extra__title">Год постройки</span>
              <div className='extra__value'>
                <Controller
                  control={control}
                  name="buildingYear"
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePicker
                        views={['year']}
                        label="Год постройки"
                        {...field}
                        renderInput={(params) =>
                          <TextField {...params}
                            size="small"
                            autoComplete='off'
                            error={false}
                          />}
                      />
                    </LocalizationProvider>
                  )}
                />
              </div>
            </div>
          }
          {
            (typeOfRealty === 'Квартиры - Новостройки' && sourceValue === '1c') ? "" :
              <>
                {
                  (typeOfRealty !== 'Гаражи' && typeOfRealty !== 'Земля') &&
                  <div className='extra__row'>
                    <span className="text extra__title">Дата актуализации</span>
                    <div className='extra__value'>
                      <Controller
                        control={control}
                        name="dataPublication"
                        render={({ field }) => (
                          // <LocalizationProvider dateAdapter={AdapterMoment}>
                          //   <DatePicker
                          //     label="Дата актуализации"
                          //     {...field}
                          //     // onChange={(event) => console.log(event.format('YYYY-MM-DD'))}
                          //     renderInput={(params) =>
                          //       <TextField {...params}
                          //         size="small"
                          //         autoComplete='off'
                          //         error={false}
                          //       />}
                          //   />
                          // </LocalizationProvider>
                          <TextField
                            variant="outlined"
                            size='small'
                            type='date'
                            {...field}
                          />
                        )}
                      />
                    </div>
                  </div>
                }
              </>
          }
          {/* {
            (typeOfRealty !== 'Гаражи' && typeOfRealty !== 'Земля') &&
            <div className='extra__row'>
              <span className="text extra__title">Тип продажи</span>
              <Controller
                name='typeSale'
                control={control}
                render={({ field }) =>
                  <ToggleButtonGroup
                    color="primary"
                    exclusive
                    {...field}
                    size='small'
                  >
                    <ToggleButton value="nothing">Неважно</ToggleButton>
                    <ToggleButton value="swap">обмен</ToggleButton>
                    <ToggleButton value="free">свободная</ToggleButton>
                  </ToggleButtonGroup>
                }
              />
            </div>
          } */}
          {
            (typeOfRealty !== 'Гаражи' && typeOfRealty !== 'Земля' && sourceValue !== 'pars') &&
            <div className='extra__row'>
              <span className="text extra__title">Фотографии</span>
              <Controller
                name='photo'
                control={control}
                render={({ field }) =>
                  <ToggleButtonGroup
                    color="primary"
                    exclusive
                    {...field}
                    size='small'
                  >
                    <ToggleButton value="nothing">Неважно</ToggleButton>
                    <ToggleButton value="noRenovation">Без фото</ToggleButton>
                    <ToggleButton value="cosmetic">Есть фото</ToggleButton>
                    {/* <ToggleButton value="renovation">Профессиональные</ToggleButton>
                    <ToggleButton value="designer">Видео</ToggleButton>
                    <ToggleButton value="designer">Планировка</ToggleButton> */}
                  </ToggleButtonGroup>
                }
              />
            </div>
          }
          {
            (sourceValue === '1c' && typeOfRealty !== 'Квартиры - Новостройки') &&
            <div className='extra__row'>
              <span className="text extra__title">Статус</span>
              <div className="extra__value">
                <Controller
                  name='status'
                  control={control}
                  render={({ field }) =>
                    <ToggleButtonGroup
                      color="primary"
                      exclusive
                      {...field}
                      size='small'
                    >
                      <ToggleButton value="actual">Актуально</ToggleButton>
                      <ToggleButton value="sold">Продано</ToggleButton>
                      <ToggleButton value="cancel">Отменено</ToggleButton>
                      {
                        typeOfRealty === 'Квартиры' &&
                        <ToggleButton value="postponed">Отложено</ToggleButton>
                      }
                    </ToggleButtonGroup>
                  }
                />
                {/* {
                  typeOfRealty === 'Квартиры' &&
                  <Controller
                    control={control}
                    name="statusDate"
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          label="Отложенно до"
                          {...field}
                          disabled={isStatusDate !== 'postponed'}
                          renderInput={(params) =>
                            <TextField {...params}
                              size="small"
                              autoComplete='off'
                              error={false}
                              disabled={isStatusDate !== 'postponed'}
                            />}
                        />
                      </LocalizationProvider>
                    )}
                  />
                } */}
              </div>
            </div>
          }
          {/* {
            (typeOfRealty !== 'Дома/Часть дома' && typeOfRealty !== 'Дома' && typeOfRealty !== 'Гаражи' && typeOfRealty !== 'Земля') &&
            <div className='extra__row'>
              <span className="text extra__title"></span>
              <div>
                <FormCheckbox
                  control={control}
                  name='apartments'
                  label='Апартаменты'
                />
              </div>
            </div>
          } */}
          {/* {
            (typeOfRealty !== 'Дома/Часть дома' && typeOfRealty !== 'Дома' && typeOfRealty !== 'Гаражи' && typeOfRealty !== 'Земля') &&
            <div className='extra__row'>
              <span className="text extra__title"></span>
              <div>
                <FormCheckbox
                  control={control}
                  name='elevator'
                  label='Лифт'
                />
                <FormCheckbox
                  control={control}
                  name='parking'
                  label='Парковка'
                />
                <FormCheckbox
                  control={control}
                  name='stove'
                  label='Плита'
                />
              </div>
            </div>
          } */}
          {/* {
            (typeOfRealty === 'Дома/Часть дома' || typeOfRealty === 'Дома') &&
            <div className='extra__row'>
              <span className="text extra__title"></span>
              <div>
                <FormCheckbox
                  control={control}
                  name='bathroomInside'
                  label='Санузел в доме'
                />
              </div>
            </div>
          } */}
          <div className='extra__row'>
            <span className="text extra__title"></span>
            <div>
              {/* {
                sourceValue === '1c' &&
                <div className='extra__value'>
                  <FormCheckbox
                    control={control}
                    name='isReserve'
                    label='Не выводить зарезервированные'
                  />
                  <FormCheckbox
                    control={control}
                    name='onlyCancel'
                    label='Выводить только отмененные'
                  />
                </div>
              } */}
              {
                (sourceValue === '1c' && typeOfRealty === 'Квартиры - Новостройки') &&
                <>
                  <FormCheckbox
                    control={control}
                    name='buildingMortgage'
                    label='Ипотека'
                  />
                  <FormCheckbox
                    control={control}
                    name='buildingVoenMortgage'
                    label='Военная ипотека'
                  />
                  <FormCheckbox
                    control={control}
                    name='buildingInstallment'
                    label='Рассрочка'
                  />
                </>
              }
            </div>
          </div>
          {
            sourceValue === 'pars' &&
            <div className='extra__row'>
              <span className="text extra__title"></span>
              <div>

                <FormCheckbox
                  control={control}
                  name='isShowAgent'
                  label='Не выводить агентства'
                />
              </div>
            </div>
          }
          {
            sourceValue === '1c' &&
            <div className='extra__row'>
              <span className="text extra__title"></span>
              <div>
                <FormCheckbox
                  control={control}
                  name='withoutDocs'
                  label='Без договора'
                />
                {
                  isWithoutDocs &&
                  <FormCheckbox
                    control={control}
                    name='hasExclusive'
                    label='ранее был СК'
                  />
                }
              </div>
            </div>
          }
          <DialogActions >
            <Button
              onClick={() => { dispatch(setExtra({})), onClose() }}
            >Очистить</Button>
            <Button type='submit'>Сохранить</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </>
  )
}