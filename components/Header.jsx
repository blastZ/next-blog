import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';

const Header = () => {
  const router = useRouter();
  const isIndex = router.route === '/';
  const classes = useStyles({
    isIndex
  });

  const handleClick = useCallback(() => {
    router.push('/');
  }, []);

  return (
    <div className={classes.root}>
      <AppBar elevation={1} className={classes.appBar} position="fixed">
        <Toolbar className={classes.toolBar}>
          <Grid container className={classes.grow} alignItems="center" wrap="nowrap">
            <Grid item>
              <img style={{ flexShrink: 0, width: 30, margin: 0, marginRight: 8, marginBottom: -4 }} src="/favicon.png" />
            </Grid>
            <Grid item>
              <Typography variant="h6" color="inherit">
                StackBunch
              </Typography>
            </Grid>
          </Grid>

          <LinkButton primary isIndex={isIndex} onClick={handleClick}>
            <Typography variant="subtitle2" color="inherit">
              BLOG
            </Typography>
          </LinkButton>
          <LinkButton isIndex={isIndex} disabled>
            <Typography variant="subtitle2" color="inherit">
              CASE
            </Typography>
          </LinkButton>
          <LinkButton isIndex={isIndex} primary={true} disabled>
            <Typography variant="subtitle2" color="inherit">
              ABOUT
            </Typography>
          </LinkButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

const LinkButton = ({ children, primary = null, onClick, disabled = false, isIndex }) => (
  <Button onClick={onClick} color={primary ? 'primary' : 'default'} disabled={disabled}>
    {children}
  </Button>
);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  appBar: {
    background: 'rgba(255,255,255,1)',
    opacity: 0.98,
    color: '#555',
    paddingRight: `0px !important`
  },
  toolBar: {
    padding: '0 24px'
  },
  toolbarButton: {
    marginLeft: -12,
    marginRight: 20
  }
}));

export default Header;
