import React, { useState, useEffect, useMemo } from 'react';
import { YMaps, Map, Placemark, Circle, Clusterer, Polygon } from "react-yandex-maps";

import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PolylineOutlinedIcon from '@mui/icons-material/PolylineOutlined';

import Location from 'images/location-pin.svg'

export function MapField(props) {
  const { cards, setSearchMap } = props;
  const [refGeoObject, setRefGeoObject] = useState(null);
  const [isShowCircle, setIsShowCircle] = useState(false)
  const [isShowPolygon, setIsShowPolygon] = useState(false)
  const [geoObjectState, setGeoObjectState] = useState(null)

  useEffect(() => {
    refGeoObject && isDraw(refGeoObject)
    return () => {
      setGeoObjectState(null)
    }
  }, [refGeoObject])

  useEffect(() => {
    setSearchMap(geoObjectState);
  }, [geoObjectState])

  const isDraw = (ref) => {
    ref.editor.startDrawing();

    ref.editor.events.add("statechange", event => {
      isShowCircle && setCircleCords();
      isShowPolygon && setPolygonState();
    });
  };

  const setPolygonState = () => {
    setGeoObjectState({
      source: 'polygon',
      geometry: refGeoObject.geometry.getCoordinates()
    });
  }

  const setCircleCords = () => {
    setGeoObjectState({
      source: 'circle',
      geometry: [refGeoObject.geometry.getCoordinates(), refGeoObject.geometry.getRadius()]
    });
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
              instanceRef={(ref) => setRefGeoObject(ref)}
              geometry={geoObjectState?.geometry || []}
              onClick={(event) => { refGeoObject.editor.stopEditing() }}
              options={{
                editorDrawingCursor: "crosshair",
              }}
            />
          }
          {
            isShowPolygon &&
            <Polygon
              instanceRef={(ref) => setRefGeoObject(ref)}
              geometry={geoObjectState?.geometry || []}
              options={{
                editorMaxPoints: 5,
              }}
            />
          }
        </Map>
      </YMaps>
      {
        !isShowPolygon &&
        <Tooltip
          title={isShowCircle ? 'Очистить область' : 'Указать на карте (круг)'}
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
      }
      {
        !isShowCircle &&
        <Tooltip
          title={isShowPolygon ? 'Очистить область' : 'Указать на карте (полигон)'}
        >
          <Fab
            aria-label="add"
            size='small'
            sx={{
              position: 'absolute',
              top: 60,
              right: 10,
              zIndex: 0
            }}
            onClick={() => setIsShowPolygon(!isShowPolygon)}
          >
            {
              isShowPolygon ?
                <CancelOutlinedIcon /> :
                <PolylineOutlinedIcon height={20} />
            }
          </Fab>
        </Tooltip>
      }
    </div>
  )
}
