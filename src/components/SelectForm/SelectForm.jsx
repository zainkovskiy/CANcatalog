import React from "react";
import { useController } from "react-hook-form";

import { selectList } from '../../selectList';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export function SelectForm(props) {
  const { control, name, label, multiple, disabled, error, rules } = props;
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules: rules,
    defaultValue: multiple ? [] : "",
  });
  return (
    <FormControl
      fullWidth
      size="small">
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        label={label}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        size='small'
        {...inputProps}
        inputRef={ref}
        multiple={multiple}
        disabled={disabled}
        error={error}
      >
        {
          selectList[name].map((item, idx) => <MenuItem key={idx} value={item}>{item}</MenuItem>)
        }
      </Select>
    </FormControl>
  )
}
