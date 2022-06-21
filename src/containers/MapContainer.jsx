import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { MapField } from 'components/MapField';

class MapContainer extends PureComponent {
  render() {
    const { cards } = this.props;
    return (
      <MapField
        cards={cards}
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

  }
}

export const MapRedax = connect(mapStateToProps, mapDispatchToProps)(MapContainer);