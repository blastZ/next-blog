import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const PageButton = ({ page, pageSize, length }) => {
  return (
    <Grid item container justify="space-between">
      <Grid item>
        <CustomButton text="NEWER" disabled={page === 0} />
      </Grid>
      <Grid item>
        <CustomButton text="OLDER" disabled={page * pageSize + pageSize >= length} />
      </Grid>
    </Grid>
  );
};

const CustomButton = ({ text, disabled }) => {
  return (
    <Button color="primary" variant="outlined" disabled={disabled}>
      {text}
    </Button>
  );
};

export default PageButton;
