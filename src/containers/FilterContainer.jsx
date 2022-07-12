import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { metro, extra, setIsMap } from 'actions/filter';

import Button from '@mui/material/Button';

import { Source } from 'components/Source';
import { BasketBasket } from 'components/BasketBasket';
import { ButtonExtra } from 'components/ButtonExtra';
import { ButtonMetro } from 'components/ButtonMetro';

import { Filter } from 'components/Filter';
import { BackdropComponent } from 'components/BackdropComponent';

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
    const { source, basket, setMetro, setExtra, metro, extra, setIsMap, isMap } = this.props;
    return (
      <>
        <div className='source-basket'>
          <Source sourceValue={source} />
          <BasketBasket
            showBasket={this.showBasket}
            basket={basket}
          />
        </div>
        <Filter
          sourceValue={source}
          builderList={this.state.builderList}
          getBuilderVariants={this.getBuilderVariants}
          clearBuilderList={this.clearBuilderList}
        />
        <div className='setting'>
          <ButtonMetro
            metro={metro}
            setMetro={setMetro}
          />
          <ButtonExtra
            extra={extra}
            setExtra={setExtra}
            sourceValue={source}
          />
          <Button
            variant="outlined"
            onClick={() => { setIsMap() }}
          >
            {isMap ? 'списком' : 'на карте'}
          </Button>
        </div>
        <BackdropComponent />
      </>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    source: state.filter.get('source'),
    basket: state.basket.get('basket').toJS(),
    metro: state.filter.get('metro'),
    extra: state.filter.get('extra'),
    isMap: state.filter.get('isMap'),
    cards: state.cards.get('cards').toJS().length,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setMetro: (filter) => dispatch(metro(filter)),
    setExtra: (filter) => dispatch(extra(filter)),
    setIsMap: () => dispatch(setIsMap()),
  }
}

export const FilterRedux = connect(mapStateToProps, mapDispatchToProps)(FilterContainer);