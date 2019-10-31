import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default ({ anchorEle, handleClose, changeCategory, categories }) => {
  const classes = useStyles();

  const handleChange = category => () => {
    changeCategory(category);
    handleClose();
  };

  return (
    <Menu id="simple-menu" anchorEl={anchorEle} keepMounted open={Boolean(anchorEle)} onClose={handleClose}>
      {Object.keys(categories).map(name => (
        <MenuItem className={classes.text} key={name} onClick={handleChange(name)}>{`${name}(${categories[name]})`}</MenuItem>
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
