import React from "react";
import Dialog from '@mui/material/Dialog';

export function ModalWindow(props) {
  const { onClose, open, children } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
      maxWidth={'lg'}
      sx={{zIndex: 99}}
    >
      {children}
    </Dialog>
  )
}