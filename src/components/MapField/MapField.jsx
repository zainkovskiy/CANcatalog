import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { YMaps, Map, Placemark, Circle, Clusterer, Polygon, FullscreenControl, Button } from "react-yandex-maps";

import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PolylineOutlinedIcon from '@mui/icons-material/PolylineOutlined';

import { setSideBarCards } from 'actions/cards';

import { MapSideBar } from 'components/MapSideBar';

import Location from 'images/location-pin.svg'

const keyTypeofRealty = {
  'Квартиры - Вторичка': 'appartment',
  'Квартиры - Новостройки': 'new',
  'Комнаты': 'rooms',
  'Комнаты/Доли': 'rooms',
  'Дома/Часть дома': 'house',
  'Дома': 'house',
  'Земля': 'land',
  'Гаражи': 'garage',
}

export function MapField(props) {
  const dispatch = useDispatch();
  const { cards, setSearchMap } = props;
  const [refGeoObject, setRefGeoObject] = useState(null);
  const [isShowCircle, setIsShowCircle] = useState(false)
  const [isShowPolygon, setIsShowPolygon] = useState(false)
  const [geoObjectState, setGeoObjectState] = useState(null)
  const [fullScreen, setFullscreen] = useState(false);

  const source = useSelector((state) => state.filter.get('source'));
  const mapDisabledAPI = useSelector((state) => state.cards.get('mapDisabledAPI'));
  const typeOfRealty = useSelector((state) => state.filter.get('filter').reqTypeofRealty);
  const basketList = useSelector((state) => state.basket.get('basket'));

  const firstUpdate = useRef(true);
  const mapRef = useRef(null);
  const ymapRef = useRef(null);
  const objectManagerRef = useRef(null);

  //смотрит на source и менят ключ в API карты
  useEffect(() => {
    if (objectManagerRef.current && !mapDisabledAPI) {
      mapRef.current.geoObjects.remove(objectManagerRef.current)
      init()
    }
  }, [source, typeOfRealty])

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
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return
    }
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

  const openObject = (obj) => {
    dispatch(setSideBarCards([obj]));
  }

  const openCluster = (list, source) => {
    let sideBarList = [];

    if (source === 'API') {
      for (let item of list.features) {
        sideBarList.push(item.extra)
      }
    }
    if (source === 'local') {
      for (let item of list) {
        sideBarList.push(item.properties._data.data)
      }
    }

    dispatch(setSideBarCards(sideBarList));
  }

  const toggleFullScreen = () => {
    setFullscreen(!fullScreen);
  }

  const init = () => {
    const loadingObjectManager = new ymapRef.current.LoadingObjectManager('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Filter/bBox.php?bbox=%b', {
      // Включаем кластеризацию.
      clusterize: true,
      // Опции кластеров задаются с префиксом cluster.
      clusterHasBalloon: false,
      // Опции объектов задаются с префиксом geoObject.
      geoObjectOpenBalloonOnClick: false,
      // Отключает zoom при клике
      clusterDisableClickZoom: true,
      paddingTemplate: source === '1c' ? `onec_${keyTypeofRealty[typeOfRealty]}` : `${source}_${keyTypeofRealty[typeOfRealty]}`
    })
    objectManagerRef.current = loadingObjectManager;

    function onObjectClick(e) {
      const objectId = e.get('objectId');
      const object = loadingObjectManager.objects.getById(objectId);
      openObject(object.extra)
    }

    function onClickCluster(e) {
      const clustertId = e.get('objectId');
      const cluster = loadingObjectManager.clusters.getById(clustertId);
      openCluster(cluster, 'API')
    }

    loadingObjectManager.objects.events.add(['click'], onObjectClick);
    loadingObjectManager.clusters.events.add(['click'], onClickCluster);
    mapRef.current.geoObjects.add(objectManagerRef.current);
  }

  return (
    <div style={{ position: 'relative' }}>
      <YMaps
        query={{
          apikey: '4ed55148-64dc-447c-a240-f3f034053bbf',
          // load: 'package.full' 
        }}
      >
        <Map
          width='100%'
          height={500}
          defaultState={{ center: [55.030204, 82.920430], zoom: 14 }}
          modules={["geoObject.addon.editor", 'LoadingObjectManager']}
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
            <Clusterer
              options={{
                // preset: 'islands#invertedVioletClusterIcons',
                clusterDisableClickZoom: true,
                clusterHideIconOnBalloonOpen: false,
                geoObjectHideIconOnBalloonOpen: false
              }}
              onClick={(event) => {
                event.get('target').options._name === 'cluster' && openCluster(event.get('target').getGeoObjects(), 'local')
              }}
            >
              {
                cards.map((mark, idx) =>
                  <Placemark
                    key={mark.reqNumber ? mark.reqNumber : idx}
                    geometry={[mark.lat, mark.lng]}
                    options={{
                      iconColor: basketList.toJS().find(item => item.reqNumber === mark.reqNumber) ? 'green' : `#0c54a0`
                    }}
                    properties={{
                      data: mark
                    }}
                    onClick={() => { openObject(mark) }}
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
          <FullscreenControl onClick={toggleFullScreen} />
            <Button
              data={{
                image: `${
                  isShowCircle ? 
                  'https://crm.centralnoe.ru/dealincom/assets/img/remove_icon.png' :
                  'https://crm.centralnoe.ru/dealincom/assets/svg/location-pin-svgrepo-com.svg'
                }`,
                title: `${isShowCircle ? 'Очистить область' : 'Указать на карте (круг)'}`,
              }}
              options={{
                visible: !isShowPolygon,
                float: 'left',
                position: {
                  left: 10,
                  top: 10
                }
              }}
              onClick={() => { setIsShowCircle(!isShowCircle) }}
            />
            <Button
              data={{
                image: `${
                  isShowPolygon ? 
                  'https://crm.centralnoe.ru/dealincom/assets/img/remove_icon.png' :
                  'https://crm.centralnoe.ru/dealincom/assets/svg/pol.svg'
                }`,
                title: `${isShowCircle ? 'Очистить область' : 'Указать на карте (полигон)'}`,
              }}
              onClick={() => setIsShowPolygon(!isShowPolygon)}
              options={{
                visible: !isShowCircle,
                float: 'left',
                position: {
                  left: 10,
                  top: 50
                }
              }}
              />
        </Map>
      </YMaps>
      {/* {
        !isShowPolygon &&
        <Tooltip
          title={isShowCircle ? 'Очистить область' : 'Указать на карте (круг)'}
          placement='left'
        >
          <Fab
            aria-label="add"
            size='small'
            sx={{
              position: fullScreen ? 'fixed' : 'absolute',
              bottom: 60,
              right: 10,
              zIndex: 99999
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
          placement='left'
        >
          <Fab
            aria-label="add"
            size='small'
            sx={{
              position: fullScreen ? 'fixed' : 'absolute',
              bottom: 10,
              right: 10,
              zIndex: 99999
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
      } */}
      <MapSideBar />
    </div>
  )
}
