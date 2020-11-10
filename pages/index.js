import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import fs from 'fs';
import path from 'path';

import Layout from '../components/common/Layout';
import Posts from '../components/home/Posts';
import Slogan from '../components/home/Slogan';

import { useSetCategoryList, useFilteredPostList, useSetPosts, useApp } from '../store';

export default function HomePage({ posts = [], categories = [] }) {
  const classes = useStyles();
  const { page, pageSize } = useApp();
  const setPosts = useSetPosts();
  const setCategoryList = useSetCategoryList();
  const showPosts = useFilteredPostList()();

  useEffect(() => {
    setPosts(posts);
  }, [posts]);

  useEffect(() => {
    setCategoryList(categories);
  }, [categories]);

  return (
    <Layout>
      <Slogan classes={classes} />
      <Posts classes={classes} showPosts={showPosts} page={page} pageSize={pageSize} />
    </Layout>
  );
}

export async function getStaticProps() {
  const postNames = fs.readdirSync(path.resolve('./pages/posts'));

  const posts = postNames
    .filter((o) => path.extname(o) === '.mdx')
    .map((name) => {
      const frontMatter = require(`./posts/${name}`).frontMatter;

      return frontMatter;
    })
    .filter((o) => o && o.published)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const categoriesObj = posts.reduce((result, current) => {
    current.tags.map((tag) => {
      result[tag] ? (result[tag] += 1) : (result[tag] = 1);
    });

    return result;
  }, {});

  const categories = [{ name: 'all', num: posts.length }].concat(
    Object.keys(categoriesObj).map((key) => ({
      name: key,
      num: categoriesObj[key],
    })),
  );

  return {
    props: {
      posts,
      categories,
    },
  };
}

const useStyles = makeStyles((theme) => ({
  slogan: {
    marginTop: 56,
    paddingLeft: 48,
    paddingRight: 48,
    textAlign: 'center',
  },
  posts: {
    [theme.breakpoints.up('md')]: {
      width: '90%',
    },
    padding: 16,
    margin: '0px auto',
    marginTop: 48,
    minHeight: 400,
    '& > div': {
      width: '100%',
    },
  },
}));
