import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Chip from '@mui/material/Chip';

import { removeAddress } from 'actions/filter';

export const AddressItems = () => {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.filter.getIn(['filter', 'address']));
  const handleDelete = (item) => {
    dispatch(removeAddress(item));
  }
  return (
    <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
      {
        address.map((item, idx) =>
          <Chip
            key={idx}
            label={item.value}
            variant="outlined"
            onDelete={() => handleDelete(item)}
          />
        )
      }
    </div>
  )
}