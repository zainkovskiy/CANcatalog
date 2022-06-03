import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { loader } from 'actions/filter';

import { Source } from 'components/Source';
import { Filter } from 'components/Filter';

class FilterContainer extends PureComponent {
  render() {
    const { loader, source } = this.props;
    return (
      <>
        <Source sourceValue={ source }/>
        <Filter />
      </>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    source: state.filter.get('source')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loader: () => dispatch(loader()),
  }
}

export const FilterRedux = connect(mapStateToProps, mapDispatchToProps)(FilterContainer);