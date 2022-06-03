import React from 'react';
import { useForm } from "react-hook-form";

import { SelectForm } from 'components/SelectForm';
import { Dadata } from 'components/Dadata';

export function Filter() {
  const {
    handleSubmit,
    control
  } = useForm({
    mode: 'onSubmit'
  })
  const onSubmit = (data) => {
    console.log(data);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SelectForm
        control={control}
        name='reqTypeofRealty'
        label='Тип недвижимости'
        multiple={false}
      />
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
      <button>submit</button>
    </form>
  )
}