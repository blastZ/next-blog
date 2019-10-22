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
      margin: 0
    },
    html: {
      boxSizing: 'border-box'
    },
    '*': {
      boxSizing: 'inherit',
      fontFamily: `-apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,sans-serif`
    },
    '*:before': {
      boxSizing: 'inherit'
    },
    '*:after': {
      boxSizing: 'inherit'
    },
    body: {
      color: 'rgb(53,53,53)',
      wordWrap: 'break-word',
      fontKerning: 'normal',
      fontFeatureSettings: "'kern', 'liga', 'clig', 'calt'"
    },
    a: {
      color: '#ff5700',
      textDecoration: 'none'
    },
    ul: {
      margin: 0,
      marginLeft: '1.65rem',
      marginBottom: '1.32rem',
      padding: 0,
      listStylePosition: 'outside',
      listStyleImage: 'none'
    },
    'ul li': {
      paddingLeft: 0
    },
    li: {
      marginBottom: 'calc(1.32rem / 2)'
    },
    'li > ul': {
      marginLeft: '1.65rem',
      marginBottom: 'calc(1.32rem / 2)',
      marginTop: 'calc(1.32rem / 2)'
    },
    'li *:last-child': {
      marginBottom: 0
    },
    'li > p': {
      marginBottom: 'calc(1.32rem / 2)'
    },
    img: {
      maxWidth: '100%'
    },
    p: {
      margin: 0,
      padding: 0,
      marginBottom: 32
    },
    table: {
      margin: 0,
      marginBottom: '1.32rem',
      fontSize: '1rem',
      lineHeight: '1.65rem',
      borderCollapse: 'collapse',
      width: '100%'
    },
    thead: {
      textAlign: 'left'
    },
    'td, th': {
      textAlign: 'left',
      borderBottom: '1px solid hsla(0, 0%, 0%, 0.12)',
      fontFeatureSettings: 'tnum',
      paddingLeft: '1.1rem',
      paddingRight: '1.1rem',
      paddingTop: '0.825rem',
      paddingBottom: 'calc(0.825rem - 1px)'
    },
    'th:first-child, td:first-child': {
      paddingLeft: 0
    },
    'th:last-child, td:last-child': {
      paddingRight: 0
    }
  }
});

export default MyApp;
