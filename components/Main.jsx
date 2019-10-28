import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

export default ({ children }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      {children}
    </Grid>
  );
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
    paddingTop: 48,
    paddingBottom: 48
  }
}));
