import { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';

import Menu from './Menu';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const classes = useStyles();

  const toggleMenu = useCallback(
    show => () => {
      setShowMenu(show);
    },
    []
  );

  return (
    <div className={classes.root}>
      <AppBar elevation={1} className={classes.appBar} position="fixed">
        <Toolbar className={classes.toolBar}>
          <Grid container className={classes.grow} alignItems="center" wrap="nowrap">
            <Grid item>
              <img className={classes.logo} src="/favicon.png" />
            </Grid>
            <Grid item>
              <Typography variant="h6" color="inherit">
                StackBunch
              </Typography>
            </Grid>
          </Grid>
          <IconButton onClick={toggleMenu(true)} color="primary" className={classes.button} aria-label="add an alarm">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu toggleMenu={toggleMenu} showMenu={showMenu} />
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  logo: { flexShrink: 0, width: 32, margin: 0, marginRight: 16, marginBottom: -4 },
  appBar: {
    background: 'rgba(255,255,255,1)',
    opacity: 0.98,
    color: '#555',
    paddingRight: `0px !important`
  },
  toolBar: {
    padding: '0 24px',
    minHeight: 56
  },
  button: { padding: 8 }
});

export default Header;
