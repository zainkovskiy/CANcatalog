import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import { sortMinMax, sortMaxMin, sortDefault, sortDate, setSortIndex } from 'actions/cards';

import ArrowSort from 'images/sort-svgrepo-com.svg'

const optionsTest = [
{
  text: 'Сортировка по умолчанию',
  action: sortDefault(),
  sortName: 'default'
},
{
  text: 'По дате обновления',
  action: sortDate('createtime'),
  sortName: 'date'
},
{
  text: 'Цена от низкой к высокой',
  action: sortMinMax('reqPrice'),
  sortName: 'price'
},
{
  text: 'Цена от высокой к низкой',
  action: sortMaxMin('reqPrice'),
  sortName: 'price'
},
{
  text: 'Площадь от меньшей к большей',
  action: sortMinMax('reqFlatTotalArea'),
  sortName: 'area'
},
{
  text: 'Площадь от большей к меньшей',
  action: sortMaxMin('reqFlatTotalArea'),
  sortName: 'area'
},
{
  text: 'Адрес от А до Я',
  action: sortMinMax('reqStreet'),
  sortName: 'street'
},
{
  text: 'Адрес от Я до А',
  action: sortMaxMin('reqStreet'),
  sortName: 'street'
},
];

export function Sorting() {
  const dispatch = useDispatch();
  const currentIndex = useSelector((state) => state.cards.get('defaultSortIndex'));
  const [anchorEl, setAnchorEl] = useState(null);
  // const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);


  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    // setSelectedIndex(index);
    setAnchorEl(null);
    dispatch(optionsTest[index].action)
    dispatch(setSortIndex(index))
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <List
        component="nav"
        aria-label="Device settings"
        sx={{ bgcolor: "background.paper", width: 'max-content', padding: 0 }}
      >
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}
          sx={{ padding: '0 0.5rem' }}
        >
          <ListItemText
            primary={optionsTest[currentIndex].text}
          />
          <ArrowSort
            height={16}
            style={{ margin: '0 0 0 0.5rem' }}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox"
        }}
      >
        {optionsTest.map((option, index) => (
          <MenuItem
            key={index}
            selected={index === currentIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}