import React from "react";
import Dialog from '@mui/material/Dialog';

export function ModalWindow(props) {
  const { onClose, open, children, maxSize } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
      maxWidth={maxSize || 'lg'}
      sx={{ zIndex: 999 }}
    >
      {children}
    </Dialog>
  )
}