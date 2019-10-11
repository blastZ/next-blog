import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Subscribe = ({ classes }) => {
  return (
    <Grid container justify="center" direction="column" alignItems="center">
      <Grid className={classes.emailContainer} item>
        <TextField
          fullWidth
          id="outlined-email-input"
          label="Email"
          InputLabelProps={{
            classes: {
              root: classes.emailInputLabel,
              focused: classes.emailInputLabel
            }
          }}
          InputProps={{
            classes: {
              root: classes.emailInputInner,
              notchedOutline: classes.emailInputInnerBorder
            }
          }}
          className={classes.emailInput}
          type="email"
          name="email"
          autoComplete="email"
          margin="normal"
          variant="outlined"
        />
      </Grid>
      <Grid item>
        <Button className={classes.subscribButton} variant="outlined" color="primary">
          Subscribe
        </Button>
      </Grid>
    </Grid>
  );
};

const styles = () => ({
  emailContainer: {
    width: '100%',
    maxWidth: 300
  },
  emailInput: {
    margin: '40px 0px 24px 0px'
  },
  emailInputInner: {
    color: 'white'
  },
  emailInputInnerBorder: {
    borderColor: 'white !important'
  },
  emailInputLabel: {
    color: 'white !important'
  },
  subscribButton: {
    marginTop: 16,
    padding: '10px 32px',
    color: 'white',
    borderColor: 'white',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)'
    }
  }
});

export default withStyles(styles)(Subscribe);
