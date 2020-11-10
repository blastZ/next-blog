import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CalendarIcon from '@material-ui/icons/CalendarTodayOutlined';
import Link from '@material-ui/core/Link';
import NextLink from 'next/link';

import { useSetCurrentCategory } from '../../store';

const PostCard = ({ data: { title, date, tags, slug, subTitle, thumb } }) => {
  const classes = useStyles();
  const setCategory = useSetCurrentCategory();

  return (
    <Card className={classes.card}>
      <NextLink href={slug}>
        <CardMedia className={classes.cover} image={thumb} title={title} />
      </NextLink>
      <CardContent className={classes.content}>
        <NextLink href={slug}>
          <Link className={classes.title} variant="h5">
            {title}
          </Link>
        </NextLink>
        <Grid className={classes.infoContainer} container justify="space-between" wrap="nowrap">
          <Grid item>
            IN
            <Link onClick={() => setCategory(tags[0])} className={classes.category}>
              {tags[0].toUpperCase()}
            </Link>
          </Grid>
          <Grid item>
            <CalendarIcon className={classes.calendarIcon} />
            {date}
          </Grid>
        </Grid>
        <Typography variant="subtitle1" className={classes.subTitle}>
          {subTitle}
        </Typography>
        <NextLink href={slug}>
          <Button color="primary" className={classes.readButton} variant="outlined">
            Read
          </Button>
        </NextLink>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: 480,
    '&:hover': {
      boxShadow: `0 2px 4px -1px rgba(0,0,0,0.2), 0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12)`,
    },
    [theme.breakpoints.up('lg')]: {
      height: 240,
      flexDirection: 'row',
    },
  },
  cover: {
    width: '100%',
    height: 208,
    flexShrink: 0,
    cursor: 'pointer',
    transition: 'opacity 0.6s ease',
    '&:hover': {
      opacity: 0.8,
    },
    [theme.breakpoints.up('sm')]: {
      height: 240,
    },
    [theme.breakpoints.up('lg')]: {
      width: 320,
    },
  },
  calendarIcon: {
    fontSize: '1em',
    marginRight: 4,
    marginBottom: -1,
  },
  content: {
    width: '100%',
  },
  subTitle: {
    color: '#5f6368',
  },
  readButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  title: {
    whiteSpace: 'nowrap',
    color: '#555555',
    cursor: 'pointer',
    textUnderlinePosition: 'under',
    '&:hover': {
      color: '#009688 !important',
    },
  },
  category: {
    cursor: 'pointer',
    color: '#009688',
    marginLeft: 4,
    '&:hover': {
      color: '#009688 !important',
    },
  },
  infoContainer: {
    fontSize: '0.8em',
    padding: '8px 0px',
    color: '#999999',
  },
}));

export default PostCard;
