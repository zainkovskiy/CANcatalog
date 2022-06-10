import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { Linear } from 'components/Linear';
import { Cards } from 'components/Cards';

class CardsContainer extends PureComponent {
  render() {
    const { loader, cards } = this.props;
    console.log(cards);
    return (
      <>
        {
          loader ?
            <Linear /> :
            <Cards
              cards={cards}
            />
        }
      </>
    )
  }
}


function mapStateToProps(state, ownProps) {
  return {
    loader: state.filter.get('isLoading'),
    cards: state.cards.get('cards').toJS(),
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export const CardsRedux = connect(mapStateToProps, mapDispatchToProps)(CardsContainer);