import React from 'react';
import { Controller } from 'react-hook-form';

import Checkbox from '@mui/material/Checkbox';

const styleLabel = {
  fontFamily: "Montserrat",
  fontSize: 12,
  color: 'grey',
  cursor: 'pointer',
}

export function FormCheckbox({ control, name, label }) {
  return (
    <label style={styleLabel}>
      <Controller
        control={control}
        name={name}
        render={({ field }) =>
          <Checkbox
            checked={field.value}
            {...field}
          />
        }
      />
      {label}
    </label>
  )
}