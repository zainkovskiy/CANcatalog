import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { SelectForm } from 'components/SelectForm';
import { SearchField } from 'components/SearchField';
import { Dadata } from 'components/Dadata';

import './Filter.scss';

export function Filter(props) {
  const { getBuilderVariants, sourceValue, builderList, clearBuilderList } = props;
  const [openBuild, setOpenBuild] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');
  const [price, setPrice] = useState('');
  const priceRef = useRef(null);
  const {
    handleSubmit,
    control,
    register,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      builder: '',
    },
    mode: 'onSubmit'
  })

  useEffect(() => {
    document.addEventListener('click', checkSelectList);
    return () => {
      document.removeEventListener('click', checkSelectList)
    }
  }, [])

  useEffect(() => {
    if (openPrice) {
      priceRef.current.focus()
    }
  }, [openPrice])

  const onSubmit = (data) => {
    console.log(data);
  }

  const handlerInput = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === 'builder') {
      setOpenBuild(true);
      getBuilderVariants(value);
    }
  }

  const closeBuilderList = () => {
    setOpenBuild(false);
    clearBuilderList();
  }

  const checkSelectList = () => {
    if (event.target.dataset.search !== 'yes') {
      closeBuilderList();
      setOpenPrice(false);
    }
  }

  const setPriceValue = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if(name === 'priceFrom') {
      setPriceFrom(value)
    } else if (name === 'setPriceTo') {
      setPriceTo(value)
    }
    console.log(value);
  }
  
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='filter'
    >
      {
        sourceValue === 'mls' ?
          <Controller
            name='builder'
            control={control}
            render={({ field }) =>
              <div style={{ position: 'relative' }}>
                <TextField
                  autoComplete='off'
                  id="outlined-basic"
                  label="Застройщик/ЖК"
                  ariant="outlined"
                  size='small'
                  name='builder'
                  value={field.value}
                  onChange={(event) => { field.onChange(event), handlerInput(event) }}
                  inputRef={field.ref}
                />
                <AnimatePresence>
                  {
                    openBuild && builderList.length > 0 &&
                    <SearchField
                      searchList={builderList}
                      handlerSelect={field.onChange}
                      closeBuilderList={closeBuilderList}
                    />
                  }
                </AnimatePresence>
              </div>
            }
          /> :
          <SelectForm
            control={control}
            name='reqTypeofRealty'
            label='Тип недвижимости'
            multiple={false}
          />
      }
      <Dadata
        control={control}
        name='address'
      />
      <SelectForm
        control={control}
        name='reqRoomCount'
        label='Комнаты'
        multiple={true}
      />
      <div style={{ position: 'relative' }}>
        <TextField
          autoComplete='off'
          id="outlined-basic"
          label="Цена"
          ariant="outlined"
          size='small'
          name='price'
          value={price}
          inputProps={
            {
              readOnly: true,
              'data-search': 'yes',
            }
          }
          onClick={() => { setOpenPrice(!openPrice) }}
          // onFocus={() => { priceRef.current.focus() }}  
          fullWidth
        />
        <AnimatePresence>
          {
            openPrice &&
            <motion.div
              className="search"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              data-search='yes'
            >
              <TextField
                autoComplete='off'
                id="outlined-basic"
                label="От"
                ariant="outlined"
                size='small'
                name='priceFrom'
                inputRef={priceRef}
                inputProps={
                  {
                    'data-search': 'yes'
                  }
                }
                {
                  ...register('priceFrom', {
                    onChange: (event) => { setValue('priceFrom', event.target.value.replace(/[^\d]/g, '')), setPriceValue(event) },
                  })
                }
              />
              <TextField
                autoComplete='off'
                id="outlined-basic"
                label="До"
                ariant="outlined"
                size='small'
                name='priceTo'
                sx={{margin: '0.5rem 0 0 0'}}
                inputProps={
                  {
                    'data-search': 'yes',
                  }
                }
                {
                  ...register('priceTo', {
                    onChange: (event) => { setValue('priceTo', event.target.value.replace(/[^\d]/g, '')), setPriceValue(event) },
                  })
                }
              />
            </motion.div>
          }
        </AnimatePresence>
      </div>
      <Button
        variant="contained"
        size='small'
        type='submit'
      >submit</Button>
    </form>
  )
}