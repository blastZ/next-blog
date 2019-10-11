import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider, makeStyles } from '@material-ui/styles';

import theme from '../src/theme';
import Progress from '../components/Progress';

class MyApp extends App {
  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Stack Bunch</title>
        </Head>
        <ThemeProvider theme={theme}>
          <Progress />
          <Container>
            <Component {...pageProps} />
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
