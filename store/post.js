import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';
import { appState } from './app';
import { currentCategoryState } from './category';

export const postListState = atom({
  key: 'postListState',
  default: [],
});

export const currentPostState = atom({
  key: 'currentPostState',
  default: null,
});

export const nextPostState = atom({
  key: 'nextPostState',
  default: null,
});

export const filteredPostListState = selector({
  key: 'filteredPostListState',
  get: ({ get }) => {
    const postList = get(postListState);
    const category = get(currentCategoryState);
    const { page, pageSize } = get(appState);

    return postList
      .filter((o) => (category !== 'all' && o.tags.includes(category)) || category === 'all')
      .slice(page * pageSize, page * pageSize + pageSize);
  },
});

export const useSetPosts = () => {
  const setPosts = useSetRecoilState(postListState);

  return (posts) => setPosts(posts);
};

export const useFilteredPostList = () => {
  const list = useRecoilValue(filteredPostListState);

  return () => list;
};

export const useSetCurrentPost = () => {
  const set = useSetRecoilState(currentPostState);
  const setNext = useSetRecoilState(nextPostState);
  const posts = useRecoilValue(postListState);

  return (post) => {
    let nextPost = null;
    const currentPostIndex = posts.findIndex((o) => o.slug === post.slug);

    if (currentPostIndex + 1 < posts.length) {
      nextPost = posts[currentPostIndex + 1];
    }

    set(post);
    setNext(nextPost);
  };
};

export const useCurrentPost = () => {
  const post = useRecoilValue(currentPostState);

  return () => post;
};

export const useNextPost = () => {
  const post = useRecoilValue(nextPostState);

  return () => post;
};
