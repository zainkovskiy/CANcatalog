import React from 'react';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { selectList } from '../../selectList';

export function SelectSimple(props) {
  return (
    <FormControl fullWidth size='small'>
      <InputLabel id="demo-select-small">{props.label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        {...props}
        onChange={(event) => props.onChange(props.name, event.target.value)}
      >
        {
          props?.source ?
            selectList[props.name][props?.source].map((menu, idx) =>
              <MenuItem
                key={idx}
                value={menu}
              >
                {menu}
              </MenuItem>) :
            selectList[props.name].map((menu, idx) =>
              <MenuItem
                key={idx}
                value={menu}
              >
                {menu}
              </MenuItem>
            )
        }
      </Select>
    </FormControl>
  )
}