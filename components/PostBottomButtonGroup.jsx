import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import BackIcon from '@material-ui/icons/ArrowBack';
import ForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import useApp from '../hooks/useApp';
import Typography from '@material-ui/core/Typography';

export default () => {
  const { nextPost } = useApp();
  const classes = useStyles();
  const router = useRouter();
  const isPost = router.route.startsWith('/posts/');

  if (!isPost) return null;

  const handleBack = React.useCallback(() => {
    router.back();
  }, [router]);

  const changeRouter = React.useCallback(() => {
    router.replace(nextPost.slug).then(() => {
      window.scrollTo(0, 0);
    });
  }, [router, nextPost]);

  return (
    <div className={classes.container}>
      <ButtonGroup fullWidth aria-label="post bottom button group">
        <Button onClick={handleBack} className={classes.backButton}>
          <Grid container alignItems="center" justify="flex-start" spacing={2}>
            <Grid item xs={3} sm={2} container justify="flex-start" alignItems="center">
              <BackIcon />
            </Grid>
            <Grid item xs={9} sm={10}>
              <Typography variant="subtitle2" align="left">
                Return to all articles
              </Typography>
            </Grid>
          </Grid>
        </Button>
        {!nextPost ? (
          <Button disabled className={classes.forwardButton}>
            <Grid container alignItems="center" justify="flex-end" spacing={2}>
              <Grid item xs={9} sm={10}>
                <Typography variant="subtitle2" align="right">
                  Next article
                </Typography>
              </Grid>
              <Grid item xs={3} sm={2} container justify="flex-end" alignItems="center">
                <ForwardIcon />
              </Grid>
            </Grid>
          </Button>
        ) : (
          <Button onClick={changeRouter} className={classes.forwardButton}>
            <Grid container alignItems="center" justify="flex-end">
              <Grid item xs={9} sm={10}>
                <Typography variant="subtitle2" align="right">
                  Next article
                </Typography>
                <Typography variant="subtitle1" align="right">
                  {nextPost.title}
                </Typography>
              </Grid>
              <Grid item xs={3} sm={2} container justify="flex-end" alignItems="center">
                <ForwardIcon />
              </Grid>
            </Grid>
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
};

const useStyles = makeStyles(() => ({
  container: {
    margin: '88px 0px 64px 0px'
  },
  backButton: {
    padding: 32,
    borderRadius: 0,
    borderLeft: 'none !important'
  },
  forwardButton: {
    padding: 32,
    borderRadius: 0,
    borderRight: 'none !important'
  }
}));
