import Layout from '../components/Layout';
import { makeStyles } from '@material-ui/core/styles';
import { MDXProvider } from '@mdx-js/react';
import Grid from '@material-ui/core/Grid';

import Highlight from './Highlight';

const Title = props => {
  return (
    <h1
      style={{
        display: 'none'
      }}>
      {props.children}
    </h1>
  );
};

const Pre = props => {
  return (
    <div
      style={{
        backgroundColor: '#1E1E1E',
        padding: 24,
        paddingLeft: 32,
        borderLeft: '5px solid #38bb6c',
        overflowX: 'auto',
        margin: '32px 0px'
      }}>
      {props.children}
    </div>
  );
};

const Code = props => {
  return (
    <code
      style={{
        fontSize: 16,
        padding: 2,
        fontFamily: 'roboto',
        color: props.className ? '#06b6ef' : '#ff5700'
      }}>
      {props.children}
    </code>
  );
};

const components = {
  pre: Pre,
  code: Highlight,
  inlineCode: Code,
  h1: Title
};

export default ({ frontMatter, children }) => {
  const classes = useStyles();

  if (!frontMatter) return <div>No Such File</div>;

  const { title, date, slug } = frontMatter;

  return (
    <MDXProvider components={components}>
      <Layout>
        <Grid item className={classes.wrapGrid}>
          <div className={classes.container}>
            <h1 className={classes.title}>{title}</h1>
            <h4 className={classes.subTitle}>
              <span className={classes.date}>{`${date} - `}</span>
              <a className={classes.editLink} target="_blank" href={`https://github.com/blastZ/next-blog/blob/master/pages${slug}.mdx`}>
                EDIT THIS POST ON GITHUB
              </a>
            </h4>
            <div className={classes.content}>{children}</div>
          </div>
        </Grid>
      </Layout>
    </MDXProvider>
  );
};

const useStyles = makeStyles(theme => ({
  wrapGrid: {
    width: '100%'
  },
  container: {
    [theme.breakpoints.down('md')]: {
      paddingLeft: 20,
      paddingRight: 20,
      marginLeft: 'auto',
      marginRight: 'auto',
      fontSize: 18
    },
    [theme.breakpoints.up('lg')]: {
      width: '66.66666667%',
      marginLeft: '16.66666667%'
    },
    marginTop: 64
  },
  title: {
    textAlign: 'center'
  },
  subTitle: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 20
  },
  date: {
    color: '#777'
  },
  editLink: {
    cursor: 'pointer',
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
      color: '#ff5700'
    }
  },
  content: {
    marginTop: 64,
    wordWrap: 'break-word'
  }
}));
