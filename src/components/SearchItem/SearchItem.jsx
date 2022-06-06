import React from "react";

import './SearchItem.scss';

export function SearchItem(props) {
  const { item, handlerSelect, closeBuilderList } = props;
  return (
    <>
      <div
        data-search='yes'
      >
        <span
          data-search='yes'
          className="text search__text">
          {item.type === 'blockName' ? 'ЖК' : 'Застройщик'}
        </span>
        <input
          type="text"
          name='builder'
          className='search__item'
          readOnly={true}
          value={item.name}
          onClick={(event) => { handlerSelect(event), closeBuilderList() }}
          data-search='yes'
        />
      </div>
    </>
  )
}