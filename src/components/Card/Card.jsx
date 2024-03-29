import React from 'react';
import moment from 'moment';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';

import Button from '@mui/material/Button';

import MetroIcon from 'images/Metro.svg';
const placeholderImg = 'https://crm.centralnoe.ru/dealincom/assets/empty_photo.jpg';

import { addToBasket, removeFromBasket } from 'actions/basket';

import './Card.scss';

const cardVarints = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0
  }
}

export function Card({ card }) {
  const dispatch = useDispatch();
  const basketList = useSelector((state) => state.basket.get('basket').toJS());

  const hasFromBasket = () => {
    if (basketList.find(item => item.reqNumber === card.reqNumber)) {
      return true
    }
    return false
  }

  const openCard = () => {
    BX.SidePanel.Instance.open(`https://crm.centralnoe.ru/cardObject/?login=yes&source=${card.source}&reqNumber=${card.reqNumber}`, { animationDuration: 300, width: document.getElementById('root').clientWidth })
  }

  const handlerBasket = () => {
    hasFromBasket() ? dispatch(removeFromBasket(card)) : dispatch(addToBasket(card));
  }
  return (
    <motion.div
      className='card'
      onClick={(event) => event.target.tagName !== 'BUTTON' && openCard()}
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
          <div className='card__info-top__address'>
            {
              (card?.reqRoomCount || card?.reqTypeofRealty) &&
              <span className='text'>
                {card?.reqRoomCount ? `${card?.reqRoomCount}к. ` : ''}
                {card?.reqTypeofRealty ? `${card?.reqTypeofRealty}` : ''}
              </span>
            }
            {
              (card?.reqStreet || card?.reqHouseNumber) &&
              <span className='text'>
                {card?.reqStreet ? `ул.${card?.reqStreet} ` : ''}
                {card?.reqHouseNumber ? `д.${card?.reqHouseNumber}` : ''}
              </span>
            }
            <div className='card__text_wrap'>
              {card?.reqCity && <span className='text card__text'>{card.reqCity}</span>}
              {card?.reqRayon && <span className='text card__text'>{card.reqRayon}</span>}
            </div>
            <div className='card__text_wrap'>
              {card?.nearMetro && <MetroIcon height={15} width={15} style={{ alignSelf: 'flex-end' }} />}
              {card?.nearMetro && <span className='text card__text'>{card.nearMetro}</span>}
            </div>
            {card?.metroDistance && <span className='text card__text'>&#183; {card.metroDistance} мин. пешком</span>}
          </div>
          <div>
            <div>
              {card?.reqFlatTotalArea &&
                <Tooltip
                  title="Общая площадь"
                  placement="top"
                  arrow
                >
                  <span className='text card__text'>{card?.reqFlatTotalArea}</span>
                </Tooltip>
              }
              {(card?.reqFlatTotalArea && card?.reqFlatLivingArea) && <span className='text card__text'>/</span>}

              {card?.reqFlatLivingArea &&
                <Tooltip
                  title="Жилая площадь"
                  placement="top"
                  arrow
                >
                  <span className='text card__text'>{card?.reqFlatLivingArea}</span>
                </Tooltip>
              }

              {(card?.reqFlatLivingArea && card?.reqKitchenArea) && <span className='text card__text'>/</span>}
              {card?.reqKitchenArea &&
                <Tooltip
                  title="Площадь кухни"
                  placement="top"
                  arrow
                >
                  <span className='text card__text'>{card?.reqKitchenArea}</span>
                </Tooltip>
              }
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
        {
          (card?.source === 'mlsn' && card?.comission) &&
          <p className='text' style={{ textAlign: 'end', margin: 0 }}>
            Ваша комиссия: {card?.comission}₽
          </p>
        }
        <div className='card__bottom'>
          <div className='card__bottom_wrap'>
            <div>
              <div className='card__button'>
                <Button
                  onClick={handlerBasket}
                  variant="outlined"
                  color={hasFromBasket() ? 'error' : "success"}
                >
                  {
                    hasFromBasket() ? 'убрать' : 'добавить'
                  }
                </Button>
              </div>
            </div>
            <div className='card__logo-name'>
              {
                (card?.source === 'mlsn' && card?.developer) &&
                <span className="text card__text">{card?.developer}</span>
              }
              <img className="card__logo" src={card.reqLogo} alt="logo" />
            </div>
          </div>
          {
            (card?.hasComission && card.hasComission !== '0') &&
            <span className='text card__text'>Готов делиться комиссией</span>
          }
          <div className='card__bottom_wrap'>
            {card?.reqDocType && <span className='text card__text'>{card.reqDocType}</span>}
            {card?.reqUpdateTime && <span className='text card__text'>
              Актуализировано {moment(card.reqUpdateTime).locale('ru').format('DD MMMM YYYY')}
            </span>}
          </div>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {
          hasFromBasket() &&
          <motion.span
            className='card__select'
            initial={{ scale: 0 }}
            exit={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
          ></motion.span>
        }
      </AnimatePresence>
    </motion.div>
  )
}