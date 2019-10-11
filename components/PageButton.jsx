import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const PageButton = ({ page, pageSize, length }) => {
  const classes = useStyles();

  return (
    <Grid className={classes.container} container justify="space-between">
      <CustomButton text="NEWER" disabled={page === 0} />
      <CustomButton text="OLDER" disabled={page * pageSize + pageSize >= length} />
    </Grid>
  );
};

const CustomButton = ({ text, disabled }) => {
  const classes = useStyles();

  return (
    <Button className={classes.customButton} color="primary" variant="outlined" disabled={disabled}>
      {text}
    </Button>
  );
};

const useStyles = makeStyles({
  container: {
    margin: '32px 0px'
  },
  customButton: {
    borderRadius: 1
  }
});

export default PageButton;
