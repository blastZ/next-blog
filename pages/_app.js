import { useEffect } from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider, makeStyles } from '@material-ui/styles';

import theme from '../src/theme';
import Progress from '../components/Progress';
import { getPostList } from '../utils/post-list';
import useApp, { AppProvider } from '../hooks/useApp';

class MyApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  static async getInitialProps(appContext) {
    const posts = await getPostList();

    return { posts };
  }

  render() {
    const { Component, pageProps, posts } = this.props;

    return (
      <>
        <Head>
          <title>Stack Bunch</title>
        </Head>
        <ThemeProvider theme={theme}>
          <Progress />
          <AppProvider>
            <Container posts={posts}>
              <Component {...pageProps} posts={posts} />
            </Container>
          </AppProvider>
        </ThemeProvider>
      </>
    );
  }
}

const Container = ({ posts, children }) => {
  const classes = useStyles();
  const { initApp } = useApp();

  useEffect(() => {
    initApp(posts);
  }, [posts]);

  return <div>{children}</div>;
};

const useStyles = makeStyles({
  '@global': {
    'html, body': {
      // scrollBehavior: 'smooth',
      overflowX: 'hidden',
      margin: 0
    },
    '*': {
      fontFamily: `-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Helvetica Neue,Helvetica,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif`
    }
  }
});

export default MyApp;
