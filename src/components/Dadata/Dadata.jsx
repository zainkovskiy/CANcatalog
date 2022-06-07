import React from "react";
import { useController } from "react-hook-form";

import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

import './Dadata.scss';

export function Dadata(props) {
  const { control, name } = props;
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    defaultValue: '',
  });
  return (
      <AddressSuggestions
        token="408e6651c0b9bfc8e2f487383d45353973f3285c"
        type='metro'
        // filterFromBound={'region'}
        filterToBound={'house'}
        {...inputProps}
        inputRef={ref}
        inputProps={
          {
            placeholder: 'Введите адрес',
            className: 'dadata__input',
            onChange: e => console.log(e)
          }
        }
      />
  )
}
