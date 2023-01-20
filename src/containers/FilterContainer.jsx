import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { setIsMap, clearFilter, setLocation, setExtra, setMetro } from 'actions/filter';
import { getCountCart } from 'actions/cards';

import Button from '@mui/material/Button';
import { Badge } from '@mui/material';

import { Source } from 'components/Source';
import { ButtonBasket } from 'components/ButtonBasket';
import { Filter } from 'components/Filter';
import { BackdropComponent } from 'components/BackdropComponent';
import { ButtonSearch } from 'components/ButtonSearch';
import { ButtonTemplate } from 'components/ButtonTemplate';
import { ButtonExtra } from 'components/ButtonExtra';
import { ButtonMetro } from 'components/ButtonMetro';
import { AddressItems } from 'components/AddressItems';

// const userId = 2921;

import './FilterContainer.scss';

class FilterContainer extends PureComponent {
  state = {
    builderList: [],
    renderLayout: false,
    counterClearFilter: 0,
  };
  componentDidMount() {
    this.getCurrentLocation();
    this.getCountObjects();
  }
  getCurrentLocation = async () => {
    const { setLocation } = this.props;
    try {
      const res = await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Filter/Controller.php', {
        action: 'getArea',
        userId: userId
      });
      if (res?.data && res?.data?.area) {
        setLocation(res.data.area);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      this.setState({ renderLayout: true })
    }
  }

  getBuilderVariants = async (value) => {
    try {
      const res = await axios.post(
        'https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Object/FilterGetter.php',
        {
          action: 'blockBuilderName',
          req: value,
        }
      );
      this.setState({
        builderList: res.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  clearBuilderList = () => {
    this.setState({ builderList: [] });
  };

  openWiki = () => {
    window.open(
      'https://docs.google.com/spreadsheets/d/1tLQNmqKHokiHJtwsWZ6zH1WAGa0YqKTXlae14kOLxJQ/edit#gid=1834609678'
    );
  };

  getCountObjects = () => {
    const { getCountCart, stateFilter } = this.props;
    getCountCart(
      {
        filter: stateFilter.filter,
        metro: stateFilter.metro,
        extra: stateFilter.extra,
        map: stateFilter.map,
        source: stateFilter.source,
        userId: userId,
      }
    )
  }

  handlerClearFilter = () => {
    const { clearFilter, setExtra, setMetro } = this.props;
    clearFilter();
    setExtra({});
    setMetro({});
    this.setState((prevState) => ({
      ...prevState,
      counterClearFilter: prevState.counterClearFilter + 1
    }))
  };

  render() {
    const { source, trash, basket, setIsMap, isMap, reqTypeofRealty, address } = this.props;
    return (
      <>
        {
          this.state.renderLayout &&
          <>
            <div className='filter-top'>
              <Source
                sourceValue={source}
                trashValue={trash || false}
                handlerClearFilter={this.handlerClearFilter}
                getCountObjects={this.getCountObjects}
              />
              <div>
                {reqTypeofRealty === 'Квартиры - Новостройки' && (
                  <Button
                    variant='text'
                    size='small'
                    onClick={this.openWiki}
                  >
                    Вики по Новостройкам
                  </Button>
                )}
                <Button
                  variant='text'
                  size='small'
                  onClick={this.handlerClearFilter}
                >
                  очистить фильтр
                </Button>
                <Badge
                  badgeContent={basket?.length}
                  color='primary'
                >
                  <ButtonBasket
                    showBasket={this.showBasket}
                    basket={basket}
                  />
                </Badge>
              </div>
            </div>
            <Filter
              sourceValue={source}
              builderList={this.state.builderList}
              getBuilderVariants={this.getBuilderVariants}
              clearBuilderList={this.clearBuilderList}
              counterClearFilter={this.state.counterClearFilter}
              getCountObjects={this.getCountObjects}
            />
            {
              address.length > 0 &&
              <AddressItems />
            }
            <div className='setting'>
              <div className='setting__buttons'>
                {source !== 'mls' && (
                  <ButtonTemplate
                    sourceValue={source}
                    isMap={isMap}
                  />
                )}
                <ButtonMetro
                  getCountObjects={this.getCountObjects}
                />
                <ButtonExtra
                  sourceValue={source}
                  getCountObjects={this.getCountObjects}
                />
                <Button
                  variant='outlined'
                  onClick={() => {
                    setIsMap();
                  }}
                  size='small'
                >
                  {isMap ? 'списком' : 'на карте'}
                </Button>
              </div>
              <ButtonSearch />
            </div>
            <BackdropComponent />
          </>
        }
      </>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    source: state.filter.get('source'),
    trash: state.filter.get('trash'),
    basket: state.basket.get('basket').toJS(),
    address: state.filter.getIn(['filter', 'address']),
    isMap: state.filter.get('isMap'),
    reqTypeofRealty: state.filter.getIn(['filter', 'reqTypeofRealty']),
    stateFilter: state.filter.toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setIsMap: () => dispatch(setIsMap()),
    clearFilter: () => dispatch(clearFilter()),
    setLocation: (location) => dispatch(setLocation(location)),
    setExtra: (filter) => dispatch(setExtra(filter)),
    setMetro: (filter) => dispatch(setMetro(filter)),
    getCountCart: (filter) => dispatch(getCountCart(filter)),
  };
}

export const FilterRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterContainer);
