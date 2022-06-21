import React from 'react';
import { useSelector } from 'react-redux';

import { Header } from 'components/Header';
import { FilterRedux } from 'containers/FilterContainer';
import { CardsRedux } from 'containers/CardsContainer';
import { MapRedax } from 'containers/MapContainer';

import './App.scss';

export function App() {
  const isMap = useSelector((state) => state.filter.get('isMap'));

  return (
    <>
      <Header />
      <FilterRedux />
      {
        isMap ?
          <MapRedax /> :
          <CardsRedux />
      }
    </>
  )
}