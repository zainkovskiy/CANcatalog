import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { setIsMap, clearFilter, setLocation } from 'actions/filter';

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

import './FilterContainer.scss';

class FilterContainer extends PureComponent {
  state = {
    builderList: [],
    filterReload: true,
    renderLayout: false
  };
  componentDidMount() {
    this.getCurrentLocation();
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

  handlerClearFilter = () => {
    const { clearFilter } = this.props;
    this.setState({ filterReload: false }, () =>
      this.setState({ filterReload: true })
    );
    clearFilter({
      reqTypeofRealty: 'Квартиры',
      address: [],
    });
  };

  render() {
    const { source, basket, setIsMap, isMap, reqTypeofRealty, address } = this.props;
    return (
      <>
        {
          this.state.renderLayout &&
          <>
            <div className='filter-top'>
              <Source
                sourceValue={source}
                handlerClearFilter={this.handlerClearFilter}
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
            {this.state.filterReload && (
              <Filter
                sourceValue={source}
                builderList={this.state.builderList}
                getBuilderVariants={this.getBuilderVariants}
                clearBuilderList={this.clearBuilderList}
              />
            )}
            {
              address.length > 0 &&
              <AddressItems />
            }
            <div className='setting'>
              <div>
                {source !== 'mls' && (
                  <ButtonTemplate
                    sourceValue={source}
                    isMap={isMap}
                  />
                )}
              </div>
              <div className='setting__buttons'>
                <ButtonMetro />
                <ButtonExtra sourceValue={source} />
                <Button
                  variant='outlined'
                  onClick={() => {
                    setIsMap();
                  }}
                  size='small'
                >
                  {isMap ? 'списком' : 'на карте'}
                </Button>
                <ButtonSearch />
              </div>
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
    basket: state.basket.get('basket').toJS(),
    address: state.filter.getIn(['filter', 'address']),
    isMap: state.filter.get('isMap'),
    reqTypeofRealty: state.filter.getIn(['filter', 'reqTypeofRealty']),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setIsMap: () => dispatch(setIsMap()),
    clearFilter: (clearfilter) => dispatch(clearFilter(clearfilter)),
    setLocation: (location) => dispatch(setLocation(location)),
  };
}

export const FilterRedux = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterContainer);
