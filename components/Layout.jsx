import React from 'react';
import Divider from '@material-ui/core/Divider';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AboutMe from './AboutMe';
import PostBottomButtonGroup from './PostBottomButtonGroup';

const Layout = ({ children }) => {
  return (
    <>
      <Header siteTitle={'Stack Bunch'} />
      <Main>{children}</Main>
      <PostBottomButtonGroup />
      <Divider />
      <AboutMe />
      <Divider />
      <Footer />
    </>
  );
};

export default Layout;
