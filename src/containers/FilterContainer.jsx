import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { extra, setIsMap } from 'actions/filter';

import Button from '@mui/material/Button';
import { Badge } from '@mui/material';

import { Sorting } from 'components/Sorting';
import { Source } from 'components/Source';
import { ButtonBasket } from 'components/ButtonBasket';
import { Filter } from 'components/Filter';
import { BackdropComponent } from 'components/BackdropComponent';
import { ButtonSearch } from 'components/ButtonSearch';

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
    const { cards, source, basket, setIsMap, isMap } = this.props;
    return (
      <>
        <div className='source-basket'>
          <Source sourceValue={source} />
          <Badge
            badgeContent={basket?.length}
            color="primary"
          >
            <ButtonBasket
              showBasket={this.showBasket}
              basket={basket}
            />
          </Badge>
        </div>
        <Filter
          sourceValue={source}
          builderList={this.state.builderList}
          getBuilderVariants={this.getBuilderVariants}
          clearBuilderList={this.clearBuilderList}
        />
        <div className='setting'>
          <div>
            {
              (cards > 0 && !isMap) &&
              <Sorting />
            }
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Button
              variant="outlined"
              onClick={() => { setIsMap() }}
              size="small"
            >
              {isMap ? 'списком' : 'на карте'}
            </Button>
            <ButtonSearch />
          </div>
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
    isMap: state.filter.get('isMap'),
    cards: state.cards.get('cards').toJS().length,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setIsMap: () => dispatch(setIsMap()),
  }
}

export const FilterRedux = connect(mapStateToProps, mapDispatchToProps)(FilterContainer);