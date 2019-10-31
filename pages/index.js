import { useState, useMemo, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import PageButton from '../components/PageButton';
import useApp from '../hooks/useApp';

export default ({ posts = [] }) => {
  const { category } = useApp();
  const [page, setPage] = useState(0);
  const pageSize = 7;
  const classes = useStyles();

  const showPosts = useMemo(() => {
    return posts
      .filter(o => (category !== 'all' && o.tags.includes(category)) || category === 'all')
      .slice(page * pageSize, page * pageSize + pageSize);
  }, [posts, category, page, pageSize]);

  return (
    <>
      <Layout>
        <Slogan classes={classes} />
        <Posts classes={classes} showPosts={showPosts} page={page} pageSize={pageSize} />
      </Layout>
    </>
  );
};

const Slogan = ({ classes }) => (
  <Grid className={classes.slogan} item container direction="column" alignItems="center" spacing={3}>
    <Grid item>
      <Typography variant="h3">Blog</Typography>
    </Grid>
    <Grid item>
      <Typography variant="h6">{`Share Everything 📖, Front-End, Back-End, Data Visualization, Linux.`}</Typography>
    </Grid>
  </Grid>
);

const Posts = ({ classes, showPosts, page, pageSize }) => (
  <Grid className={classes.posts} item container wrap="nowrap" direction="column" alignItems="center" spacing={6}>
    {showPosts.map(({ id, thumb, title, tags, date, subTitle, slug }) => (
      <Grid key={slug} item>
        <PostCard id={id} data={{ thumb, title, tags, slug, date, subTitle }} />
      </Grid>
    ))}
    <Grid item>
      <Divider />
    </Grid>
    <Grid item container>
      <PageButton page={page} pageSize={pageSize} length={showPosts.length} />
    </Grid>
  </Grid>
);

const useStyles = makeStyles(theme => ({
  slogan: {
    marginTop: 56,
    paddingLeft: 48,
    paddingRight: 48,
    textAlign: 'center'
  },
  posts: {
    [theme.breakpoints.up('md')]: {
      width: '90%'
    },
    padding: 16,
    margin: '0px auto',
    marginTop: 48,
    minHeight: 400,
    '& > div': {
      width: '100%'
    }
  }
}));
