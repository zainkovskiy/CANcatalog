import React from 'react';
import Pagination from '@mui/material/Pagination';

import { Card } from 'components/Card';

export function Cards({ cards, pagination }) {
  return (
    <>
      {
        cards.length > 0 &&
        <>
          <div>
            сортировка, пагинация
          </div>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            {
              cards.map((card, idx) =>
                <Card
                  key={card.reqNumber}
                  card={card}
                  idx={idx}
                />)
            }
          </div>
          <Pagination count={10} variant="outlined" color="primary" />
        </>
      }
    </>
  )
}