import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
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

  const source = useSelector((state) => state.filter.get('source'));
  const mapDisabledAPI = useSelector((state) => state.cards.get('mapDisabledAPI'));

  const mapRef = useRef(null);
  const ymapRef = useRef(null);
  const objectManagerRef = useRef(null);

  //смотрит на source и менят ключ в API карты 
  useEffect(() => {
    if (objectManagerRef.current && !mapDisabledAPI) {
      mapRef.current.geoObjects.remove(objectManagerRef.current)
      init()
    }
  }, [source])

  //при отправке запроса на сервер через фильтр блокирует API yandex
  useEffect(() => {
    if (objectManagerRef.current && mapDisabledAPI) {
      mapRef.current.geoObjects.remove(objectManagerRef.current)
    }
  }, [mapDisabledAPI])

  //запускает рисование геоОбектов
  useEffect(() => {
    refGeoObject && isDraw(refGeoObject)
    return () => {
      setGeoObjectState(null)
    }
  }, [refGeoObject])

  //Устанавливвает диапазон координат при их наличии
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

  const init = () => {
    const loadingObjectManager = new ymapRef.current.LoadingObjectManager('https://hs-01.centralnoe.ru/Project-Selket-Main/bBox.php?bbox=%b', {
      // Включаем кластеризацию.
      clusterize: true,
      // Опции кластеров задаются с префиксом cluster.
      clusterHasBalloon: false,
      // Опции объектов задаются с префиксом geoObject.
      geoObjectOpenBalloonOnClick: false,
      paddingTemplate: source === '1c' ? 'onec' : source
    })
    objectManagerRef.current = loadingObjectManager;
    // function onObjectClick(e) {
    //   const cords = ['55.0086, 82.9369']
    //   const objectId = e.get('objectId');
    //   const object = loadingObjectManager.objects.getById(objectId);
    //   if (cords === object.geometry.coordinates) {
    //     e.get('target').options.set('preset', 'islands#redIcon')
    //   }
    // }
    // loadingObjectManager.objects.events.add(['add'], onObjectClick);
    mapRef.current.geoObjects.add(objectManagerRef.current);
  }

  return (
    <div style={{ position: 'relative' }}>
      <YMaps
        query={{
          apikey: '9b339b12-4d97-4522-b2e5-da5a5da1c7f6',
          load: 'package.full'
        }}
      >
        <Map
          width='100%'
          height={500}
          defaultState={{ center: [55.030204, 82.920430], zoom: 11 }}
          // modules={["geoObject.addon.editor", 'LoadingObjectManager']}
          onLoad={ymaps => {
            if (!mapDisabledAPI) {
              ymaps.ready(() => {
                ymapRef.current = ymaps;
                init()
              });
            }
          }}
          instanceRef={yaMap => {
            if (yaMap) {
              mapRef.current = yaMap;
            }
          }}
        >
          {
            cards.length > 0 &&
            <Clusterer options={{
              preset: 'islands#invertedVioletClusterIcons',
            }}>
              {
                cards.map((mark, idx) =>
                  idx < 100 &&
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
