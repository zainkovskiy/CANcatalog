import React from "react";
import { useSelector } from 'react-redux';

import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

import './Dadata.scss';

export function Dadata({ onChange }) {
  const isMap = useSelector((state) => state.filter.get('isMap'));
  
  return (
      <AddressSuggestions
        token="408e6651c0b9bfc8e2f487383d45353973f3285c"
        type='metro'
        name='address'
        onChange={(e) => { onChange('address', e) }}
        // filterFromBound={'region'}
        filterToBound={'house'}
        inputProps={
          {
            placeholder: 'Введите адрес',
            className: 'dadata__input',
            disabled: isMap
          }
        }
      />
  )
}
