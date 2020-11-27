import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import PostCard from './PostCard';
import PageButton from '../PageButton';

export default function Posts({ classes, showPosts, page, pageSize }) {
  return (
    <Grid className={classes.posts} item container wrap="nowrap" direction="column" alignItems="center" spacing={6}>
      {showPosts.map(({ id, thumb, title, tags, createdAt, subTitle, slug }) => (
        <Grid key={slug} item>
          <PostCard id={id} data={{ thumb, title, tags, slug, createdAt, subTitle }} />
        </Grid>
      ))}
      <Grid item>
        <Divider />
      </Grid>
      <Grid item container>
        <PageButton page={page} pageSize={pageSize} length={showPosts.length} />
      </Grid>
    </Grid>
  );
}
