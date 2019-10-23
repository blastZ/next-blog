import React, { useState, useMemo, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import CategoryIcon from '@material-ui/icons/Category';

import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import PageButton from '../components/PageButton';
import Typography from '@material-ui/core/Typography';
import Category from '../components/Category';

export default ({ posts = [] }) => {
  const [categoryButtonAnchor, setCategoryButtonAnchor] = useState(null);
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(0);
  const pageSize = 7;
  const classes = useStyles({
    showCategoryButton: Boolean(!categoryButtonAnchor)
  });

  const openCategoryMenu = useCallback(
    e => {
      console.log(e.currentTarget);
      setCategoryButtonAnchor(e.currentTarget);
    },
    [setCategoryButtonAnchor]
  );

  const closeCategoryMenu = useCallback(() => {
    setCategoryButtonAnchor(null);
  }, []);

  const changeCategory = useCallback(
    category => {
      setCategory(category);
      window.scrollTo(0, 0);
    },
    [setCategory]
  );

  const showPosts = useMemo(() => {
    return posts
      .filter(o => o.published && ((category !== 'all' && o.tags.includes(category)) || category === 'all'))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(page * pageSize, page * pageSize + pageSize);
  }, [posts, category, page, pageSize]);

  return (
    <>
      <Layout>
        <Grid style={{ marginTop: 64 }} container wrap="nowrap" direction="column" alignItems="center">
          <Grid item>
            <Typography variant="h3">Blog</Typography>
          </Grid>
          <Grid className={classes.slogan} item>
            <Typography variant="h6">{`Share Everything 📖, Front-End, Back-End, Data Visualization, Linux.`}</Typography>
          </Grid>
          <Grid className={classes.posts} item container>
            <Grid item container direction="column" wrap="nowrap" spacing={6}>
              {showPosts.map(({ id, thumb, title, tags, date, subTitle, slug }) => (
                <Grid className={classes.cardContainer} key={slug} item>
                  <PostCard id={id} data={{ thumb, title, tags, slug, date, subTitle }} changeCategory={changeCategory} />
                </Grid>
              ))}
            </Grid>
            <Divider light />
            <PageButton page={page} pageSize={pageSize} length={showPosts.length} />
          </Grid>
        </Grid>
        <Fab onClick={openCategoryMenu} variant="extended" aria-label="delete" className={classes.category}>
          <CategoryIcon />
        </Fab>
        <Category handleClose={closeCategoryMenu} anchorEle={categoryButtonAnchor} changeCategory={changeCategory} />
      </Layout>
    </>
  );
};

const useStyles = makeStyles(theme => ({
  slogan: {
    padding: '24px 48px',
    textAlign: 'center'
  },
  posts: {
    [theme.breakpoints.up('md')]: {
      width: '90%'
    },
    padding: '16px 32px 0px 32px',
    margin: '48px 0px',
    minHeight: 400
  },
  cardContainer: {
    width: '100%'
  },
  category: {
    opacity: ({ showCategoryButton }) => (showCategoryButton ? '1' : '0'),
    transition: 'opacity 284ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 189ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    position: 'fixed',
    bottom: 56,
    right: -24,
    paddingRight: 40,
    paddingLeft: 24,
    backgroundColor: 'rgba(255,255,255,0.8)',
    '& svg': {
      color: '#009688'
    }
  }
}));
