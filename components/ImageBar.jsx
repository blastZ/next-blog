import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const ImageBar = ({ slogan = false, title, height = 464, children }) => {
  const classes = useStyles({ height });
  const URL = `https://res.cloudinary.com/stackbunch/image/upload/q_auto/v1562933119/blog-assets/blog-cover_cr9eqc.jpg`;
  return (
    <Grid className={classes.container} container direction="column" alignItems="center" justify="center" wrap="nowrap">
      <picture>
        <source
          srcSet="https://res.cloudinary.com/stackbunch/image/upload/c_scale,q_auto,w_639/v1562933119/blog-assets/blog-cover_cr9eqc.webp"
          media="(max-width: 639px)"
          type="image/webp"
        />
        <source
          srcSet="https://res.cloudinary.com/stackbunch/image/upload/c_scale,q_auto,w_1024/v1562933119/blog-assets/blog-cover_cr9eqc.webp"
          media="(min-width: 640px) and (max-width: 1024px)"
          type="image/webp"
        />
        <source
          srcSet="https://res.cloudinary.com/stackbunch/image/upload/c_scale,q_auto,w_1440/v1562933119/blog-assets/blog-cover_cr9eqc.webp"
          media="(min-width: 1025px) and (max-width: 1440px)"
          type="image/webp"
        />
        <source
          srcSet="https://res.cloudinary.com/stackbunch/image/upload/c_scale,q_auto/v1562933119/blog-assets/blog-cover_cr9eqc.webp"
          media="(min-width: 1441px)"
          type="image/webp"
        />
        <source
          srcSet="https://res.cloudinary.com/stackbunch/image/upload/c_scale,q_auto,w_639/v1562933119/blog-assets/blog-cover_cr9eqc.jpg"
          media="(max-width: 639px)"
          type="image/jpeg"
        />
        <source
          srcSet="https://res.cloudinary.com/stackbunch/image/upload/c_scale,q_auto,w_1024/v1562933119/blog-assets/blog-cover_cr9eqc.jpg"
          media="(min-width: 640px) and (max-width: 1024px)"
          type="image/jpeg"
        />
        <source
          srcSet="https://res.cloudinary.com/stackbunch/image/upload/c_scale,q_auto,w_1440/v1562933119/blog-assets/blog-cover_cr9eqc.jpg"
          media="(min-width: 1025px) and (max-width: 1440px)"
          type="image/jpeg"
        />
        <source
          srcSet="https://res.cloudinary.com/stackbunch/image/upload/c_scale,q_auto/v1562933119/blog-assets/blog-cover_cr9eqc.jpg"
          media="(min-width: 1441px)"
          type="image/jpeg"
        />
        <img
          className={classes.background}
          src="https://res.cloudinary.com/stackbunch/image/upload/c_scale,q_auto/v1562933119/blog-assets/blog-cover_cr9eqc.jpg"
          alt="cover"
        />
      </picture>
      {slogan ? <Slogan className={classes.slogan} /> : null}
      <Title className={classes.title} text={title} />
      {children}
    </Grid>
  );
};

const Slogan = ({ className }) => (
  <Typography className={className} variant="h5">
    {'< Web ❤ />'}
  </Typography>
);

const Title = ({ text, className }) => (
  <Typography className={className} variant="h5">
    {text}
  </Typography>
);

const useStyles = makeStyles({
  container: {
    width: '100%',
    height: (props) => props.height,
    padding: '56px 16px',
    background: '#090a0b',
    position: 'relative',
  },
  background: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: (props) => props.height,
    objectFit: 'cover',
  },
  slogan: {
    color: '#fff',
    margin: '16px 0px',
    zIndex: 1,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    zIndex: 1,
  },
});

export default ImageBar;
