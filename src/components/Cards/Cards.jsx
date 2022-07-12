import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';

import { Card } from 'components/Card';
import { Sorting } from 'components/Sorting';

export function Cards({ cards }) {
  const [paginationCount, setPaginationCount] = useState(0);
  const [currentPagination, setCurrentPagination] = useState(1);

  //устанавливает максимальное значение для пагинации
  useEffect(() => {
    if (cards.length > 0) {
      let pagination = '';
      pagination = Math.floor(cards.length / 30);
      cards.length - (Math.floor(cards.length / 30) * 30) > 0 && pagination++
      setPaginationCount(pagination);
    }
  }, [cards])

  const handlePagination = (event, value) => {
    setCurrentPagination(value)
  }

  return (
    <>
      {
        cards.length > 0 &&
        <>
          <Sorting />
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            {
              cards.map((card, idx) =>
                (idx >= (currentPagination * 30) - 30 && idx <= currentPagination * 30) &&
                <Card
                  key={card.reqNumber ? card.reqNumber : idx}
                  card={card}
                />
              )

            }
          </div>
          {
            cards.length > 30 &&
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination
                onChange={handlePagination}
                count={paginationCount}
                variant="outlined"
                color="primary"
                page={currentPagination}
              />
            </div>
          }
        </>
      }
    </>
  )
}