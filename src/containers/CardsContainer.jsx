import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { Linear } from 'components/Linear'

class CardsContainer extends PureComponent{
  render(){
    const { loader } = this.props;
    return(
      <div>
        {
          loader &&
          <Linear/>
        }
        cards
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  return{
    loader: state.catalog.get('isLoading'),
  }
}

function mapDispatchToProps(dispatch){
  return{
  }
}

export const CardsRedux = connect(mapStateToProps, mapDispatchToProps)(CardsContainer);