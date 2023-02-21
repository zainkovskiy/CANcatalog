import React, { useEffect, useState } from 'react';
import axios from 'axios';

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Chip from '@mui/material/Chip';

const userId = 2921;

export function ModalBasket({ onClose, selectDeal }) {
  const [deals, setDeals] = useState(null);
  useEffect(() => {
    getDeals();
  }, [])
  const getDeals = async () => {
    try {
      const res = await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Filter/Selection.php', {
        action: "getDeals",
        userId: userId
      })
      res?.data?.data?.length > 0 && setDeals(res.data.data)
    } catch (err) {
      console.log(err);
    }
  }
  const handleClick = (deal) =>{
    selectDeal(deal);
  } 
  return (
    <>
      <DialogTitle
        sx={{ fontFamily: 'Montserrat', fontWeight: 700, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        Выберете сделку
        <IconButton
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}
        >
          {
            deals ?
              deals.map(deal =>
                <Chip
                  key={deal.UID}
                  label={`${deal.UID} ${deal.DealName}`} 
                  variant="outlined"
                  onClick={() => handleClick(deal.UID)}
                />
              ) :
              <span className="text">Нет сделок</span>
          }
        </div>
      </DialogContent>
    </>
  )
}
