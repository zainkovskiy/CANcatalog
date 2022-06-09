import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { loader, metro, extra } from 'actions/filter';

import { Source } from 'components/Source';
import { BasketBasket } from 'components/BasketBasket';
import { ButtonExtra } from 'components/ButtonExtra';
import { ButtonMetro } from 'components/ButtonMetro';
import { Filter } from 'components/Filter';

import './FilterContainer.scss';

class FilterContainer extends PureComponent {
  state = {
    builderList: [],
  }

  getBuilderVariants = async (value) => {
    /** заглушка */
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      this.setState({
        builderList: [
          { name: "СЗ Кварталы Немировича", type: "blockBuilderName" },
          { name: "Химметалл", type: "blockBuilderName" },
          { name: "АМГ-ТРАСТ", type: "blockBuilderName" },
          { name: "Акация", type: "blockBuilderName" },
          { name: "Авиатор", type: "blockName" },
          { name: "Азимут", type: "blockName" },
          { name: "Акварельный 3.0", type: "blockName" },
          { name: "Астон.Геометрия", type: "blockName" },
        ]
      })
    } catch (error) {
      console.log(error.message);
    }
  }

  clearBuilderList = () => {
    this.setState({ builderList: [] })
  }

  render() {
    const { loader, source, basket, setMetro, setExtra, metro, extra } = this.props;
    return (
      <>
        <div className='setting'>
          <Source sourceValue={source} />
          <div className='setting-right'>
            <ButtonMetro
              metro={metro}
              setMetro={setMetro}
            />
            <ButtonExtra
              extra={extra}
              setExtra={setExtra}
              sourceValue={source}
            />
            <BasketBasket
              showBasket={this.showBasket}
              basket={basket}
            />
          </div>
        </div>
        <Filter
          sourceValue={source}
          builderList={this.state.builderList}
          getBuilderVariants={this.getBuilderVariants}
          clearBuilderList={this.clearBuilderList}
        />
      </>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    source: state.filter.get('source'),
    basket: state.basket.get('basket').toJS(),
    metro: state.filter.get('metro'),
    extra: state.filter.get('extra')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loader: () => dispatch(loader()),
    setMetro: (filter) => dispatch(metro(filter)),
    setExtra: (filter) => dispatch(extra(filter)),
  }
}

export const FilterRedux = connect(mapStateToProps, mapDispatchToProps)(FilterContainer);