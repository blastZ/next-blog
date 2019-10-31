import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider, makeStyles } from '@material-ui/styles';

import theme from '../src/theme';
import Progress from '../components/Progress';
import { getPostList } from '../utils/post-list';

class MyApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  static async getInitialProps(appContext) {
    const posts = await getPostList();
    const categories = posts.reduce((result, current) => {
      current.tags.map(tag => {
        result[tag] ? (result[tag] += 1) : (result[tag] = 1);
      });

      return result;
    }, {});

    categories['all'] = posts.length;

    return { posts, categories };
  }

  render() {
    const { Component, pageProps, posts, categories } = this.props;

    return (
      <>
        <Head>
          <title>Stack Bunch</title>
        </Head>
        <ThemeProvider theme={theme}>
          <Progress />
          <Container>
            <Component {...pageProps} posts={posts} categories={categories} />
          </Container>
        </ThemeProvider>
      </>
    );
  }
}

const Container = props => {
  const classes = useStyles();

  return <div>{props.children}</div>;
};

const useStyles = makeStyles({
  '@global': {
    'html, body': {
      // scrollBehavior: 'smooth',
      overflowX: 'hidden',
      margin: 0,
      paddingRight: '0px !important'
    },
    '*': {
      fontFamily: `-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif`
    }
    // '@font-face': {
    //   fontFamily: 'Ali-Regular',
    //   src: `local('Alibaba-PuHuiTi-Regular'),
    //     url('https://res.cloudinary.com/stackbunch/raw/upload/v1565955456/blog-assets/Alibaba-PuHuiTi-Regular_dp8dam.woff2')`,
    //   fontDisplay: 'swap'
    // }
  }
});

export default MyApp;
