import React, { useState, useRef } from 'react';
import { YMaps, Map, Placemark, Circle } from "react-yandex-maps";

export function MapField(props) {
  const { cards } = props;
  const [area, setArea] = useState([]);
  const [radius, setRadius] = useState(0);
  const [draw, setDraw] = useState(false);
  const [move, setMove] = useState(false);
  const mapRef = useRef(null);
  const ymapRef = useRef(null);

  const handlerClick = (event) => {
    setRadius(0);
    if (draw){
      setArea(event.get('coords'));
      setMove(true);
      mapRef.current.behaviors.disable('drag')
    } else{
      setArea([]);
      mapRef.current.behaviors.enable('drag')
    }
  }

  const handlerRadius = (event) => {
    if (move && draw && area.length > 0) {
      ymapRef.current.route([area, event.get('coords')]).then((route) => {
        const prefix = new RegExp(/км/, 'g');
        let radius = '';

        if(prefix.test(route.getHumanLength())){
          radius = parseInt(route.getHumanLength().replace('&#160;км', ' ') * 1000);
        } else{
          radius = parseInt(route.getHumanLength().replace('&#160;м', ' '));
        }

        if(Number.isInteger(radius)){
          setRadius(radius);
        } else {return}

        console.log(radius)
      })
    }
  }

  return (
    <div>
      <YMaps 
      query={{
        apikey: '9b339b12-4d97-4522-b2e5-da5a5da1c7f6',
        load: ['route']
      }}
      >
        <Map
          width='100%'
          height={500}
          defaultState={{ center: [55.030204, 82.920430], zoom: 11 }}
          onMouseDown={(event) => { handlerClick(event) }}
          onMouseUp={() => { setMove(false) }}
          onMouseMove={(event) => { handlerRadius(event) }}
          instanceRef={(map) => { mapRef.current = map} }
          onLoad={ymaps => { ymapRef.current = ymaps}}
        >
          {
            cards.length > 0 &&
            cards.map(mark =>
              <Placemark
                key={mark.reqNumber}
                geometry={[mark.lat, mark.lng]}
                options={{ iconColor: `#0c54a0` }}
              />
            )
          }
          {
            area.length > 0 &&
            <Circle
              geometry={[area, radius]}
            />
          }
        </Map>
      </YMaps>
      <button
        onClick={ () => setDraw(!draw) }
      >draw</button>
    </div>
  )
}