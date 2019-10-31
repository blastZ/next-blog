import Divider from '@material-ui/core/Divider';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AboutMe from './AboutMe';
import PostBottomButtonGroup from './PostBottomButtonGroup';

const Layout = props => {
  return (
    <>
      <Header />
      <Main {...props} />
      <PostBottomButtonGroup />
      <Divider />
      <AboutMe />
      <Divider />
      <Footer />
    </>
  );
};

export default Layout;
