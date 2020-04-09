import { useEffect } from 'react';
import Head from 'next/head';
import { ThemeProvider, makeStyles } from '@material-ui/styles';

import theme from '../src/theme';
import Progress from '../components/Progress';
import { AppProvider } from '../hooks/useApp';

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
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
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
