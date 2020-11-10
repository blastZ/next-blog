import React, { useEffect } from 'react';
import Head from 'next/head';
import createCache from '@emotion/cache';
import { ThemeProvider, makeStyles } from '@material-ui/styles';
import { RecoilRoot } from 'recoil';

import theme from '../src/theme';
import Progress from '../components/Progress';

export const cache = createCache();

export default function MyApp(props) {
  const { Component, pageProps } = props;

  const classes = useStyles();

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Stack Bunch</title>
      </Head>
      <ThemeProvider theme={theme}>
        <Progress />
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}

const useStyles = makeStyles({
  '@global': {
    'html, body': {
      // scrollBehavior: 'smooth',
      overflowX: 'hidden',
      margin: 0,
    },
    '*': {
      fontFamily: `-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Helvetica Neue,Helvetica,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif`,
    },
  },
});
