import React, { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Pagination from '@mui/material/Pagination';
import Fab from '@mui/material/Fab';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import { Card } from 'components/Card';
import { Sorting } from 'components/Sorting';

export function Cards({ cards }) {
  const [paginationCount, setPaginationCount] = useState(0);
  const [currentPagination, setCurrentPagination] = useState(1);
  const [showButtonUp, setShowButtonUp] = useState(false);
  const showButtonRef = useRef(false)

  useEffect(() => {
    window.addEventListener('scroll', handlerScroll)
    return () => {
      window.removeEventListener('scroll', handlerScroll)
    }
  }, [])

  const handlerScroll = () => {
    if (window.pageYOffset > 100 && !showButtonRef.current) {
      setShowButtonUp(true);
      showButtonRef.current = true;
    } else if (window.pageYOffset < 100 && showButtonRef.current) {
      setShowButtonUp(false);
      showButtonRef.current = false;
    }
  }

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
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
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
          <AnimatePresence initial={false}>
            {
              showButtonUp &&
              <motion.div
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
                exit={{
                  opacity: 0
                }}
              >
                <Fab
                  style={{ position: 'fixed', bottom: '2rem', right: '6rem' }}
                  color="primary"
                  size="small"
                  onClick={() => window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                  })}
                >
                  <ArrowUpwardIcon />
                </Fab>
              </motion.div>
            }
          </AnimatePresence>
        </>
      }
    </>
  )
}