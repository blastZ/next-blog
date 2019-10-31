import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import BackIcon from '@material-ui/icons/ArrowBack';
import ForwardIcon from '@material-ui/icons/ArrowForward';
import { makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

export default () => {
  const classes = useStyles();
  const router = useRouter();
  const isPost = router.route.startsWith('/posts/');

  if (!isPost) return null;

  const handleBack = React.useCallback(() => {
    router.back();
  }, []);

  return (
    <div className={classes.container}>
      <ButtonGroup fullWidth aria-label="post bottom button group">
        <Button onClick={handleBack} className={classes.backButton}>
          <BackIcon className={classes.backIcon} /> Return to all articles
        </Button>
        <Button disabled className={classes.forwardButton}>
          Next article <ForwardIcon className={classes.forwardIcon} />
        </Button>
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
  },
  backIcon: {
    marginRight: 32
  },
  forwardIcon: {
    marginLeft: 32
  }
}));
