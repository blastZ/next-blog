import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import GithubIcon from './icons/Github';

export default () => {
  const classes = useStyles();

  return (
    <Grid className={classes.container} container alignItems="center" justify="center">
      <Grid className={classes.contentContainer} container alignItems="center" justify="center">
        <Grid className={classes.links} container alignItems="center" justify="center">
          <a style={{ display: 'flex' }} href="https://github.com/blastZ" target="_blank">
            <GithubIcon />
          </a>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(theme => ({
  contentContainer: {
    padding: '24px 8px'
  },
  links: {
    [theme.breakpoints.down('md')]: {
      width: 650
    },
    [theme.breakpoints.between('md', 'lg')]: {
      width: 750
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      width: 970
    },
    [theme.breakpoints.up('xl')]: {
      width: 1170
    }
  },
  owner: {
    color: 'hsla(0,0%,100%,.7)',
    margin: 0,
    fontSize: 15
  },
  button: {
    color: 'white',
    fontSize: 15,
    visibility: 'hidden',
    background: 'rgba(255,255,255,0.1) !important'
  }
}));
