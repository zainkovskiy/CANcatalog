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
            сортировка
          </div>
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            {
              cards.map((card, idx) =>
                <Card
                  key={card.reqNumber ? card.reqNumber : idx}
                  card={card}
                  idx={idx}
                />)
            }
          </div>
          {
            cards.length > 30 &&
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination
                onChange={(event) => { console.log(event) }}
                count={10}
                variant="outlined"
                color="primary"
                defaultPage={1}
              />
            </div>
          }
        </>
      }
    </>
  )
}