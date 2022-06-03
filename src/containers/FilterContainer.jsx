import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { loader } from 'actions/filter';

import { Source } from 'components/Source';
import { Filter } from 'components/Filter';

class FilterContainer extends PureComponent {
  render() {
    const { loader } = this.props;
    return (
      <>
        <Source />
        <Filter />
      </>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
    loader: () => dispatch(loader()),
  }
}

export const FilterRedux = connect(mapStateToProps, mapDispatchToProps)(FilterContainer);