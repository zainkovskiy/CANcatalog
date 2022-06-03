import React from "react";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export function Linear() {
  return (
    <div className='liner'>
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
        <p className="text"
          style={{
            fontWeight: '400',
            textAlign: 'center'
          }}
        >
          Идет загрузка...</p>
      </Box>
    </div>
  );
}