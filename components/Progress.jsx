import { useEffect, useState, useCallback } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import Router from 'next/router';

export default () => {
  const [show, setShow] = useState(false);
  const classes = useStyles();

  const showProgress = useCallback(() => {
    setShow(true);
  }, [setShow]);

  const hideProgress = useCallback(() => {
    setShow(false);
  }, [setShow]);

  useEffect(() => {
    Router.events.on('routeChangeStart', showProgress);
    return () => {
      Router.events.off('routeChangeStart', showProgress);
    };
  }, []);

  useEffect(() => {
    Router.events.on('routeChangeComplete', hideProgress);
    return () => {
      Router.events.off('routeChangeComplete', hideProgress);
    };
  }, []);

  if (!show) return null;

  return (
    <div className={classes.root}>
      <LinearProgress className={classes.progress} />
    </div>
  );
};

const useStyles = makeStyles(() => ({
  root: {
    width: '100vw',
    position: 'fixed',
    top: 0,
    zIndex: 9999999
  },
  progress: {
    height: 3
  }
}));
