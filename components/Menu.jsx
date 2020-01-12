import { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FaceIcon from '@material-ui/icons/Face';
import BookIcon from '@material-ui/icons/Book';
import AppsIcon from '@material-ui/icons/Apps';
import ReportIcon from '@material-ui/icons/Report';
import { useRouter } from 'next/router';

import useApp from '../hooks/useApp';

export default ({ toggleMenu: toggle, showMenu: show }) => {
  const classes = useStyles();
  const router = useRouter();
  const { categories, setCategory } = useApp();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const goTo = useCallback(
    path => () => {
      router.push(path).then(() => {
        window.scrollTo(0, 0);
      });
    },
    []
  );

  const subList = () => {
    if (router.route === '/') return blogList();
    if (router.route.startsWith('/posts/')) return postList();
  };

  const sideList = () => (
    <div className={classes.list} role="presentation" onClick={toggle(false)} onKeyDown={toggle(false)}>
      <List>
        <ListItem onClick={goTo('/')} button>
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
          <ListItemText primary={'Blog'} />
        </ListItem>
        <ListItem button disabled>
          <ListItemIcon>
            <AppsIcon />
          </ListItemIcon>
          <ListItemText primary={'Case'} />
        </ListItem>
        <ListItem button disabled>
          <ListItemIcon>
            <FaceIcon />
          </ListItemIcon>
          <ListItemText primary={'About'} />
        </ListItem>
      </List>
      <Divider />
      <List>{subList()}</List>
    </div>
  );

  const blogList = () =>
    categories.map(o => (
      <ListItem onClick={setCategory(o.name)} button key={o.name}>
        <ListItemText className={classes.subListItemText} primary={`${o.name}(${o.num})`} />
      </ListItem>
    ));

  return (
    <SwipeableDrawer
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      anchor="right"
      open={show}
      onClose={toggle(false)}
      onOpen={toggle(true)}>
      {sideList()}
    </SwipeableDrawer>
  );
};

const postList = () => {
  const { currentPost } = useApp();

  const scrollIntoView = useCallback(
    id => () => {
      const ele = document.getElementById(`${id}`);
      if (ele) {
        ele.scrollIntoView();
      }
    },
    []
  );

  return (
    <>
      {Array.isArray(currentPost.anchors) && (
        <List>
          {currentPost.anchors.map((o, index) => (
            <ListItem key={o} button>
              <ListItemText
                style={{ color: '#009688' }}
                primaryTypographyProps={{
                  display: 'block',
                  noWrap: true
                }}
                onClick={scrollIntoView(index)}
                primary={o}
              />
            </ListItem>
          ))}
        </List>
      )}
      {Array.isArray(currentPost.anchors) && <Divider />}
      <List>
        <ListItem button>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>

          <ListItemText
            onClick={() => {
              window.open('https://github.com/blastZ/next-blog/issues');
            }}
            primary={'Report'}
          />
        </ListItem>
      </List>
    </>
  );
};

const useStyles = makeStyles({
  text: {
    color: '#009688',
    textAlign: 'center'
  },
  list: {
    width: 250
  },
  subListItemText: {
    color: '#009688'
  }
});
