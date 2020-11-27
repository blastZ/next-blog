import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import Divider from '@material-ui/core/Divider';

const RecentPosts = () => {
  const classes = useStyles();

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Typography variant="h6">RECENT POSTS</Typography>
      </Grid>
      {[
        {
          slug: '/posts/c++-class-summary',
          title: 'C++类总结',
          createdAt: '2020/01/05',
        },
        {
          slug: '/posts/typescript-utility-type-partial',
          title: 'Typescript 工具类（一）',
          createdAt: '2019/12/14',
        },
        {
          slug: '/posts/linux-basic-file-permission',
          title: 'Linux 基础之文件权限',
          createdAt: '2019/09/25',
        },
      ].map((o, index) => (
        <Grid key={o.slug} item container alignItems="center" wrap="nowrap">
          <Grid className={classes.index} item />
          <Grid className={classes.postA} item>
            <Link href={o.slug}>
              <a className={classes.postA}>{`${o.createdAt} ${o.title}`}</a>
            </Link>
          </Grid>
          {index !== 2 && <Divider className={classes.divider} />}
        </Grid>
      ))}
    </Grid>
  );
};

const useStyles = makeStyles({
  index: {
    width: 10,
    height: 10,
    background: '#000',
    marginLeft: 8,
    marginRight: 16,
    borderRadius: '50%',
  },
  divider: {
    maxWidth: 360,
  },
  postA: {
    color: 'rgba(0,150,136,1) !important',
    transition: 'transform 300ms ease',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
});

export default RecentPosts;
