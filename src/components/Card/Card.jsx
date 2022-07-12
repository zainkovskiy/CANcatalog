import React from 'react';
import moment from 'moment';
import { motion } from 'framer-motion';

import Button from '@mui/material/Button';

import MetroIcon from 'images/Metro.svg';
const placeholderImg = 'https://crm.centralnoe.ru/dealincom/assets/empty_photo.jpg';

import './Card.scss';

export function Card({ card }) {
  const cardVarints = {
    visible: {
      opacity: 1,
    }, 
    hidden: {
      opacity: 0
    }
  }
  return (
    <motion.div
      className='card'
      onClick={(event) => event.target.tagName === 'BUTTON' ? console.log('') : console.log('')}
      variants={cardVarints}
      initial='hidden'
      animate='visible'
    >
      <img
        alt="photo"
        className='card__img'
        src={card.reqPhoto || placeholderImg}
      />
      <div className='card__info'>
        <div className='card__info-top'>
          <div>
            <div className='card__text_wrap'>
              {card?.reqRoomCount && <span className='text'>{card.reqRoomCount}к</span>}
              {card?.reqStreet && <span className='text'>{card.reqStreet}</span>}
              {card?.reqHouseNumber && <span className='text'>д {card.reqHouseNumber}</span>}
            </div>
            <div className='card__text_wrap'>
              {card?.reqCity && <span className='text card__text'>{card.reqCity}</span>}
              {card?.reqRayon && <span className='text card__text'>{card.reqRayon}</span>}
            </div>
            <div className='card__text_wrap'>
              {card?.nearMetro && <MetroIcon height={15} width={15} style={{ alignSelf: 'flex-end' }} />}
              {card?.nearMetro && <span className='text card__text'>{card.nearMetro}</span>}
              {card?.metroDistance && <span className='text card__text'>&#183; {card.metroDistance} мин. пешком</span>}
            </div>
          </div>
          <div>
            <div>
              {card?.reqFlatTotalArea && <span className='text'>{card.reqFlatTotalArea}/</span>}
              {card?.reqFlatLivingArea && <span className='text'>{card.reqFlatLivingArea}/</span>}
              {card?.reqKitchenArea && <span className='text'>{card.reqKitchenArea}</span>}
            </div>
            <div className='card__text_wrap card__text'>
              {card?.reqFloor && card?.reqFloors && <span className='text'>{card.reqFloor}/{card.reqFloors}эт.</span>}
            </div>
          </div>
          <div>
            <div className='card__text_wrap'>
              {card?.reqPrice && <span className='text'>{card.reqPrice} тыс. ₽</span>}
            </div>
            <div className='card__text_wrap card__text'>
              {(card?.reqPrice && card?.reqFlatTotalArea && card?.reqFlatTotalArea !== 'Земельный участок') && <span className='text'>{((+card.reqPrice / +card.reqFlatTotalArea) * 1000).toFixed(0)} ₽/кв.м</span>}
            </div>
          </div>
        </div>
        <div className='card__bottom'>
          <div className='card__bottom_wrap'>
            <div>
              <div className='card__button'>
                <Button
                  onClick={() => console.log('button')}
                  variant="outlined"
                >
                  В подборку
                </Button>
              </div>
            </div>
            <img className="card__logo" src={card.reqLogo} alt="logo" />
          </div>
          <div className='card__bottom_wrap'>
            {card?.reqDocType && <span className='text card__text'>{card.reqDocType}</span>}
            {card?.reqUpdateTime && <span className='text card__text'>
              Актуализировано {moment(card.reqUpdateTime).locale('ru').format('DD MMMM YYYY')}
            </span>}
          </div>
        </div>
      </div>
    </motion.div>
  )
}