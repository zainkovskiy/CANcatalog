import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark, Circle, Clusterer } from "react-yandex-maps";

import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import Location from 'images/location-pin.svg'

export function MapField(props) {
  const { cards, setSearchMap } = props;
  const [refCircle, setRefCircle] = useState(null);
  const [isShowCircle, setIsShowCircle] = useState(false)
  const [circleState, setCircleState] = useState([])

  useEffect(() => {
    refCircle && isDraw(refCircle)
    return () => {
      setCircleState([])
    }
  }, [refCircle])

  useEffect(() => {
    setSearchMap(circleState);
  }, [circleState])

  const isDraw = (ref) => {
    ref.editor.startDrawing();
  };

  const setCircleCords = (event) => {
    setCircleState([event.get('target').geometry.getCoordinates(), event.get('target').geometry.getRadius()])
  }

  return (
    <div style={{ position: 'relative' }}>
      <YMaps
        query={{
          apikey: '9b339b12-4d97-4522-b2e5-da5a5da1c7f6',
        }}
      >
        <Map
          width='100%'
          height={500}
          defaultState={{ center: [55.030204, 82.920430], zoom: 11 }}
          modules={["geoObject.addon.editor"]}
        >
          {
            cards.length > 0 &&
            <Clusterer options={{
              preset: 'islands#invertedVioletClusterIcons',
            }}>
              {
                cards.map((mark, idx) => 
                  <Placemark
                    key={mark.reqNumber ? mark.reqNumber : idx}
                    geometry={[mark.lat, mark.lng]}
                    options={{ iconColor: `#0c54a0` }}
                  />
                )
              }
            </Clusterer>
          }
          {
            isShowCircle &&
            <Circle
              instanceRef={(ref) => setRefCircle(ref)}
              geometry={circleState}
              /** истина где то рядом, true is somewhere there */
              onClick={(event) => { refCircle.editor.stopEditing(), setCircleCords(event) }}
              options={{
                editorDrawingCursor: "crosshair",
              }}
            />
          }
        </Map>
      </YMaps>
      <Tooltip
        title={isShowCircle ? 'Очистить область' : 'Указать на карте'}
      >
        <Fab
          aria-label="add"
          size='small'
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 0
          }}
          onClick={() => { setIsShowCircle(!isShowCircle) }}
        >
          {
            isShowCircle ?
              <CancelOutlinedIcon /> :
              <Location height={20} />
          }
        </Fab>
      </Tooltip>
    </div>
  )
}