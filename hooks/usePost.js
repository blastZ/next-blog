import Post from '../components/Post';

const usePost = (frontMatter) => (props) => <Post frontMatter={frontMatter} {...props} />;

export default usePost;
