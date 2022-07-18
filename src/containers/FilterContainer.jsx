import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { setIsMap, clearFilter } from 'actions/filter';

import Button from '@mui/material/Button';
import { Badge } from '@mui/material';

import { Source } from 'components/Source';
import { ButtonBasket } from 'components/ButtonBasket';
import { Filter } from 'components/Filter';
import { BackdropComponent } from 'components/BackdropComponent';
import { ButtonSearch } from 'components/ButtonSearch';

import './FilterContainer.scss';

class FilterContainer extends PureComponent {
  state = {
    builderList: [],
    filterReload: true,
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

  handlerClearFilter = () => {
    const { clearFilter } = this.props;
    this.setState({ filterReload: false },
      () => this.setState({ filterReload: true })
    )
    clearFilter({
      reqTypeofRealty: 'Вторичка',
    });
  }

  render() {
    const { source, basket, setIsMap, isMap } = this.props;
    return (
      <>
        <div className='filter-top'>
          <Source sourceValue={source} />
          <div>
            <Button
              variant="text"
              size='small'
              onClick={ this.handlerClearFilter }
            >
              очистить фильтр
            </Button>
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
        </div>
        {
          this.state.filterReload &&
          <Filter
            sourceValue={source}
            builderList={this.state.builderList}
            getBuilderVariants={this.getBuilderVariants}
            clearBuilderList={this.clearBuilderList}
          />
        }
        <div className='setting'>
          <Button
            variant="outlined"
            size="small"
          >
            доп настройки
          </Button>
          <div className='setting__buttons'>
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
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setIsMap: () => dispatch(setIsMap()),
    clearFilter: (clearfilter) => dispatch(clearFilter(clearfilter)),
  }
}

export const FilterRedux = connect(mapStateToProps, mapDispatchToProps)(FilterContainer);