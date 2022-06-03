import React  from 'react';

import { Header } from 'components/Header';
import { FilterRedux } from 'containers/FilterContainer';
import { CardsRedux } from 'containers/CardsContainer';

import './App.scss';

export function App() {
  return (
    <>
      <Header />
      <FilterRedux/>
      <CardsRedux/>
    </>
  )
}