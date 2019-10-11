import { makeStyles } from '@material-ui/core/styles';

export default ({ children }) => {
  const classes = useStyles();

  return <div className={classes.container}>{children}</div>;
};

const useStyles = makeStyles(theme => ({
  container: {
    [theme.breakpoints.down('md')]: {
      maxWidth: 650
    },
    [theme.breakpoints.between('md', 'lg')]: {
      maxWidth: 750
    },
    [theme.breakpoints.between('lg', 'xl')]: {
      maxWidth: 970
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: 1170
    },
    margin: '0 auto',
    paddingTop: 48
  }
}));
