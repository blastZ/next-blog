import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const categories = [
  {
    name: 'all',
    num: 4
  },
  {
    name: 'tcp/ip',
    num: 2
  },
  {
    name: 'linux',
    num: 3
  },
  {
    name: 'javascript',
    num: 1
  }
];

export default ({ anchorEle, handleClose, changeCategory }) => {
  const classes = useStyles();

  const handleChange = category => () => {
    changeCategory(category);
    handleClose();
  };

  return (
    <Menu id="simple-menu" anchorEl={anchorEle} keepMounted open={Boolean(anchorEle)} onClose={handleClose}>
      {categories.map(o => (
        <MenuItem className={classes.text} key={o.name} onClick={handleChange(o.name)}>{`${o.name}(${o.num})`}</MenuItem>
      ))}
    </Menu>
  );
};

const useStyles = makeStyles(theme => ({
  text: {
    color: '#009688',
    textAlign: 'center'
  }
}));
