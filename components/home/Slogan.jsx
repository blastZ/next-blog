import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default function Slogan({ classes }) {
  return (
    <Grid className={classes.slogan} item container direction="column" alignItems="center" spacing={3}>
      <Grid item>
        <Typography variant="h3">Blog</Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6">{`Share Everything 📖, Front-End, Back-End, Data Visualization, Linux.`}</Typography>
      </Grid>
    </Grid>
  );
}
