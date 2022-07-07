import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { MapField } from 'components/MapField';
import { map } from 'actions/filter';

class MapContainer extends PureComponent {
  render() {
    const { cards, setSearchMap } = this.props;
    return (
      <MapField
        cards={cards}
        setSearchMap={setSearchMap}
      />
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    cards: state.cards.get('cards').toJS(),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setSearchMap: (cords) => dispatch(map(cords)),
  }
}

export const MapRedax = connect(mapStateToProps, mapDispatchToProps)(MapContainer);