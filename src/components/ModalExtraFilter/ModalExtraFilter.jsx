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
    }
  });


  const onSubmit = (data) => {
    console.log(data);
    dispatch(setExtra(data));
    onClose();
  }

  const isReady = watch('ready');

  const isStatusDate = watch('status');

  const handlerToggle = (prevState, value, change) => {
    console.log('here');
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

  return (
    <>
      <DialogTitle
        sx={{ fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        ???????????????????????????? ??????????????
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
            typeOfRealty !== '??????????' &&
            <div className='extra__row'>
              <span className="text extra__title">?????????????? ??2</span>
              <div className='extra__value'>
                <div>
                  <span className='extra__description'>??????????</span>
                  <div className='extra__inputs'>
                    <TextField
                      {...defaultPropsField}
                      label="????"
                      {...register('reqFlatTotalArea[0]')}
                    />
                    <TextField
                      {...defaultPropsField}
                      label="????"
                      {...register('reqFlatTotalArea[1]')}
                    />
                  </div>
                </div>
                {
                  (sourceValue !== 'pars' && typeOfRealty !== '????????????') &&
                  <>
                    <div>
                      <span className='extra__description'>??????????</span>
                      <div className='extra__inputs'>
                        <TextField
                          {...defaultPropsField}
                          label="????"
                          {...register('reqKitchenArea[0]')}
                        />
                        <TextField
                          {...defaultPropsField}
                          label="????"
                          {...register('reqKitchenArea[1]')}
                        />
                      </div>
                    </div>
                    <div>
                      <span className='extra__description'>??????????</span>
                      <div className='extra__inputs'>
                        <TextField
                          {...defaultPropsField}
                          label="????"
                          {...register('reqFlatLivingArea[0]')}
                        />
                        <TextField
                          {...defaultPropsField}
                          label="????"
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
            (typeOfRealty === '??????????????' && typeOfRealty === '??????????????/????????') &&
            <div className='extra__row'>
              <span className="text extra__title">??????????????</span>
              <div className='extra__value'>
                <div className='extra__inputs'>
                  <TextField
                    {...defaultPropsField}
                    label="?? ????????????????"
                    {...register('roomsInside')}
                  />
                  <TextField
                    {...defaultPropsField}
                    label="???? ??????????????"
                    {...register('roomsForSale')}
                  />
                </div>
              </div>
            </div>
          }
          {
            (typeOfRealty === '????????/?????????? ????????' || typeOfRealty === '????????' || typeOfRealty === '??????????') &&
            <div className='extra__row'>
              <span className="text extra__title">?????????????? ?????????????? ?? ????????????</span>
              <div className='extra__value'>
                <div className='extra__inputs'>
                  <TextField
                    {...defaultPropsField}
                    label="????"
                    {...register('reqLandArea[0]')}
                  />
                  <TextField
                    {...defaultPropsField}
                    label="????"
                    {...register('reqLandArea[1]')}
                  />
                </div>
              </div>
            </div>
          }
          {
            (sourceValue === '1c' && typeOfRealty !== '????????????' && typeOfRealty !== '??????????') &&
            <div className='extra__row'>
              <span className="text extra__title">????????????????????</span>
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
                    <ToggleButton value="nothing">??????????????</ToggleButton>
                    <ToggleButton value="adjacent">??????????????</ToggleButton>
                    <ToggleButton value="isolated">??????????????????????????</ToggleButton>
                    <ToggleButton value="free">??????????????????</ToggleButton>
                  </ToggleButtonGroup>
                }
              />
            </div>
          }
          {
            (sourceValue === '1c' && typeOfRealty !== '????????????' && typeOfRealty !== '??????????') &&
            <div className='extra__row'>
              <span className="text extra__title">??????????????</span>
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
                    <ToggleButton value="nothing">??????????????</ToggleButton>
                    <ToggleButton value="combined">??????????????????????</ToggleButton>
                    <ToggleButton value="separated">????????????????????</ToggleButton>
                  </ToggleButtonGroup>
                }
              />
            </div>
          }
          {
            (sourceValue === '1c' && typeOfRealty !== '????????????' && typeOfRealty !== '??????????') &&
            <div className='extra__row'>
              <span className="text extra__title">????????????/????????????</span>
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
                    <ToggleButton value="nothing">??????????????</ToggleButton>
                    <ToggleButton value="true">????????</ToggleButton>
                    <ToggleButton value="false">??????</ToggleButton>
                  </ToggleButtonGroup>
                }
              />
            </div>
          }
          {
            (typeOfRealty !== '????????????' && typeOfRealty !== '??????????') &&
            <div className='extra__row'>
              <span className="text extra__title">???????????????? ????????</span>
              <div className='extra__value'>
                <div className='extra__inputs' style={{ width: '50%' }}>
                  <SelectForm
                    control={control}
                    name='material'
                    label='???????????????? ????????'
                    multiple={false}
                  />
                </div>
              </div>
            </div>
          }
          {
            (sourceValue === '1c' && typeOfRealty !== '????????????' && typeOfRealty !== '??????????') &&
            <div className='extra__row'>
              <span className="text extra__title">????????????</span>
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
                    <ToggleButton value="nothing">??????????????</ToggleButton>
                    <ToggleButton value="noRenovation">?????? ??????????????</ToggleButton>
                    <ToggleButton value="cosmetic">??????????????????????????</ToggleButton>
                    <ToggleButton value="renovation">????????????????????</ToggleButton>
                    <ToggleButton value="designer">????????????????????????</ToggleButton>
                  </ToggleButtonGroup>
                }
              />
            </div>
          }
          {
            (typeOfRealty !== '????????' && typeOfRealty !== '????????/?????????? ????????' && typeOfRealty !== '????????????' && typeOfRealty !== '??????????') &&
            <div className='extra__row'>
              <span className="text extra__title">????????</span>
              <div className='extra__value'>
                <div className='extra__inputs'>
                  <TextField
                    {...defaultPropsField}
                    label="????"
                    {...register('reqFloor[0]')}
                  />
                  <TextField
                    {...defaultPropsField}
                    label="????"
                    {...register('reqFloor[1]')}
                  />
                </div>
                <FormCheckbox
                  control={control}
                  name='notFloorFirst'
                  label='???? ????????????'
                />
                <FormCheckbox
                  control={control}
                  name='notFloorLast'
                  label='???? ??????????????????'
                />
              </div>
            </div>
          }
          {
            (typeOfRealty !== '????????????' && typeOfRealty !== '??????????') &&
            <div className='extra__row'>
              <span className="text extra__title">???????????? ?? ????????</span>
              <div className='extra__value'>
                <div className='extra__inputs'>
                  <TextField
                    {...defaultPropsField}
                    label="????"
                    {...register('reqFloorCount[0]')}
                  />
                  <TextField
                    {...defaultPropsField}
                    label="????"
                    {...register('reqFloorCount[1]')}
                  />
                </div>
              </div>
            </div>
          }
          {
            (typeOfRealty !== '????????/?????????? ????????' && typeOfRealty !== '????????' && typeOfRealty !== '??????????' && typeOfRealty !== '????????????') &&
            <div className='extra__row'>
              <span className="text extra__title">???????????? ??????????????</span>
              <div className='extra__value'>
                <div className='extra__inputs'>
                  <TextField
                    {...defaultPropsField}
                    label="???????????? ??????????????"
                    {...register('ceilingHeight')}
                  />
                </div>
              </div>
            </div>
          }
          {
            (typeOfRealty === '????????/?????????? ????????' || typeOfRealty === '????????') &&
            <div className='extra__row'>
              <span className="text extra__title">????????????????????????</span>
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
                    <ToggleButton value="nothing">??????????????</ToggleButton>
                    <ToggleButton value="electricity">??????????????????????????</ToggleButton>
                    <ToggleButton value="gas">??????</ToggleButton>
                    <ToggleButton value="waterSupply">??????????????????????????</ToggleButton>
                    <ToggleButton value="sewerage">??????????????????????</ToggleButton>
                  </ToggleButtonGroup>
                }
              />
            </div>
          }
          {
            (typeOfRealty === '????????/?????????? ????????' || typeOfRealty === '????????') &&
            <div className='extra__row'>
              <span className="text extra__title">??????????????????</span>
              <div className='extra__value'>
                <div className='extra__inputs' style={{ width: '50%' }}>
                  <SelectForm
                    control={control}
                    name='heatingType'
                    label='??????????????????'
                    multiple={false}
                  />
                </div>
              </div>
            </div>
          }
          {
            (typeOfRealty === '????????/?????????? ????????' || typeOfRealty === '????????') &&
            <div className='extra__row'>
              <span className="text extra__title">?????????????????????????? ????????????</span>
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
                    <ToggleButton value="nothing">??????????????</ToggleButton>
                    <ToggleButton value="IZHS">??????</ToggleButton>
                    <ToggleButton value="garden">??????????????????????</ToggleButton>
                    <ToggleButton value="DNP">??????</ToggleButton>
                    <ToggleButton value="private">???????????? ?????????????????? ??????????????????</ToggleButton>
                    <ToggleButton value="farmer">???????????????????? ??????????????????</ToggleButton>
                    <ToggleButton value="industry">?????????? ????????????????????????????</ToggleButton>
                  </ToggleButtonGroup>
                }
              />
            </div>
          }
          {
            (typeOfRealty === '????????/?????????? ????????' || typeOfRealty === '????????') &&
            <div className='extra__row'>
              <span className="text extra__title">??????????????????</span>
              <div>
                <FormCheckbox
                  control={control}
                  name='bath'
                  label='????????'
                />
                <FormCheckbox
                  control={control}
                  name='garage'
                  label='??????????'
                />
                <FormCheckbox
                  control={control}
                  name='pool'
                  label='??????????????'
                />
              </div>
            </div>
          }
          {
            typeOfRealty === '???????????????? - ??????????????????????' &&
            <div className='extra__row'>
              <span className="text extra__title">???????? ??????????</span>
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
                    validate: event => event.isSameOrAfter(moment(), 'year') || '???? ???????????? ?????? ??????????????'
                  }}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePicker
                        views={['year']}
                        label="???????? ??????????*"
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
                  label='?????? ????????'
                />
              </div>
            </div>
          }
          {
            (typeOfRealty !== '???????????????? - ??????????????????????' && typeOfRealty !== '????????????' && typeOfRealty !== '??????????') &&
            <div className='extra__row'>
              <span className="text extra__title">?????? ??????????????????</span>
              <div className='extra__value'>
                <Controller
                  control={control}
                  name="buildingYear"
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePicker
                        views={['year']}
                        label="?????? ??????????????????"
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
            (typeOfRealty !== '????????????' && typeOfRealty !== '??????????') &&
            <div className='extra__row'>
              <span className="text extra__title">???????? ????????????????????</span>
              <div className='extra__value'>
                <Controller
                  control={control}
                  name="dataPublication"
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePicker
                        label="???????? ????????????????????"
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
            (typeOfRealty !== '????????????' && typeOfRealty !== '??????????') &&
            <div className='extra__row'>
              <span className="text extra__title">?????? ??????????????</span>
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
                    <ToggleButton value="nothing">??????????????</ToggleButton>
                    <ToggleButton value="swap">??????????</ToggleButton>
                    <ToggleButton value="free">??????????????????</ToggleButton>
                  </ToggleButtonGroup>
                }
              />
            </div>
          }
          {
            (typeOfRealty !== '????????????' && typeOfRealty !== '??????????') &&
            <div className='extra__row'>
              <span className="text extra__title">????????????????????</span>
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
                    <ToggleButton value="nothing">??????????????</ToggleButton>
                    <ToggleButton value="noRenovation">?????? ????????</ToggleButton>
                    <ToggleButton value="cosmetic">???????? ????????</ToggleButton>
                    <ToggleButton value="renovation">????????????????????????????????</ToggleButton>
                    <ToggleButton value="designer">??????????</ToggleButton>
                    <ToggleButton value="designer">????????????????????</ToggleButton>
                  </ToggleButtonGroup>
                }
              />
            </div>
          }
          {
            (sourceValue === '1c' && typeOfRealty !== '???????????????? - ??????????????????????') &&
            <div className='extra__row'>
              <span className="text extra__title">????????????</span>
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
                      <ToggleButton value="actual">??????????????????</ToggleButton>
                      <ToggleButton value="sold">??????????????</ToggleButton>
                      <ToggleButton value="cancel">????????????????</ToggleButton>
                      <ToggleButton value="postponed">???????????????? ????</ToggleButton>
                    </ToggleButtonGroup>
                  }
                />
                <Controller
                  control={control}
                  name="statusDate"
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePicker
                        label="?????????????????? ????"
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
              </div>
            </div>
          }
          {
            (typeOfRealty !== '????????/?????????? ????????' && typeOfRealty !== '????????' && typeOfRealty !== '????????????' && typeOfRealty !== '??????????') &&
            <div className='extra__row'>
              <span className="text extra__title"></span>
              <div>
                <FormCheckbox
                  control={control}
                  name='apartments'
                  label='??????????????????????'
                />
              </div>
            </div>
          }
          {
            (typeOfRealty !== '????????/?????????? ????????' && typeOfRealty !== '????????' && typeOfRealty !== '????????????' && typeOfRealty !== '??????????') &&
            <div className='extra__row'>
              <span className="text extra__title"></span>
              <div>
                <FormCheckbox
                  control={control}
                  name='elevator'
                  label='????????'
                />
                <FormCheckbox
                  control={control}
                  name='parking'
                  label='????????????????'
                />
                <FormCheckbox
                  control={control}
                  name='stove'
                  label='??????????'
                />
              </div>
            </div>
          }
          {
            (typeOfRealty === '????????/?????????? ????????' || typeOfRealty === '????????') &&
            <div className='extra__row'>
              <span className="text extra__title"></span>
              <div>
                <FormCheckbox
                  control={control}
                  name='bathroomInside'
                  label='?????????????? ?? ????????'
                />
              </div>
            </div>
          }
          <div className='extra__row'>
            <span className="text extra__title"></span>
            <div>
              {/* {
                sourceValue === '1c' &&
                <div className='extra__value'>
                  <FormCheckbox
                    control={control}
                    name='isReserve'
                    label='???? ???????????????? ??????????????????????????????????'
                  />
                  <FormCheckbox
                    control={control}
                    name='onlyCancel'
                    label='???????????????? ???????????? ????????????????????'
                  />
                </div>
              } */}
              {
                typeOfRealty === '???????????????? - ??????????????????????' &&
                <>
                  <FormCheckbox
                    control={control}
                    name='buildingMortgage'
                    label='??????????????'
                  />
                  <FormCheckbox
                    control={control}
                    name='buildingVoenMortgage'
                    label='?????????????? ??????????????'
                  />
                  <FormCheckbox
                    control={control}
                    name='buildingInstallment'
                    label='??????????????????'
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
                  label='???? ???????????????? ??????????????????'
                />
              </div>
            </div>
          }
          <DialogActions >
            <Button
              onClick={() => { dispatch(setExtra({})), onClose() }}
            >????????????????</Button>
            <Button type='submit'>??????????????????</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </>
  )
}