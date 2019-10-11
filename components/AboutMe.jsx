import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import RecentPost from './RecentPosts';

export default () => {
  const classes = useStyles();

  return (
    <Grid className={classes.container} container>
      <Grid className={classes.recentContainer} item xs={12} md={7}>
        <RecentPost />
      </Grid>
      <Grid className={classes.meContainer} item xs={12} md={5} container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h6">ABOUT ME</Typography>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item xs={3}>
            <picture>
              <source
                srcSet="https://res.cloudinary.com/stackbunch/image/upload/c_scale,q_auto/v1562934532/blog-assets/avatar_j7ixf0.webp"
                type="image/webp"
              />
              <source
                srcSet="https://res.cloudinary.com/stackbunch/image/upload/c_scale,q_auto/v1562934532/blog-assets/avatar_j7ixf0.jpg"
                type="image/jpeg"
              />
              <img
                src="https://res.cloudinary.com/stackbunch/image/upload/c_scale,q_auto/v1562934532/blog-assets/avatar_j7ixf0.jpg"
                alt="avatars"
              />
            </picture>
          </Grid>
          <Grid item xs={9}>
            <Typography variant="body1">
              Hi, I'm blastz - A Chinese Full-Stack Engineer. From HangZhou, ZheJiang. Have a look at my social media profiles below.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    paddingLeft: 32,
    paddingRight: 32,
    maxWidth: 1170,
    margin: '0 auto'
  },
  recentContainer: {
    paddingTop: 48,
    paddingBottom: 48,
    [theme.breakpoints.down('md')]: {
      display: 'none'
    },
    [theme.breakpoints.up('md')]: {
      display: 'block'
    }
  },
  meContainer: {
    paddingTop: 48,
    paddingBottom: 48
  }
}));
