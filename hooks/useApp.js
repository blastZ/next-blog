import { createContext, useContext, useReducer, useMemo, useCallback } from 'react';

const AppContext = createContext();

const PAGE_SIZE = 7;

const initState = {
  posts: [],
  page: 0,
  categories: [
    {
      name: 'all',
      num: 0
    }
  ],
  category: 'all',
  currentPost: {},
  nextPost: null
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_POSTS':
      return {
        ...state,
        posts: payload
      };
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: payload
      };
    case 'SET_CATEGORY':
      return {
        ...state,
        category: payload
      };
    case 'SET_CURRENT_POST':
      return {
        ...state,
        currentPost: payload
      };
    case 'SET_NEXT_POST':
      return {
        ...state,
        nextPost: payload
      };
    case 'SET_PAGE':
      return {
        ...state,
        page: payload
      };
  }
};

export const AppProvider = props => {
  const [state, dispatch] = useReducer(reducer, initState);

  const value = useMemo(
    () => ({
      state,
      dispatch
    }),
    [state]
  );

  return <AppContext.Provider value={value} {...props} />;
};

export default function useApp () {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }

  const { state, dispatch } = context;

  const setCategories = useCallback(
    payload => {
      dispatch({
        type: 'SET_CATEGORIES',
        payload
      });
    },
    [dispatch]
  );

  const setCategory = useCallback(payload => () => {
    dispatch({
      type: 'SET_CATEGORY',
      payload
    });
    window.scrollTo(0, 0);
  });

  const setCurrentPost = useCallback(
    payload => {
      const { posts } = state;
      let nextPost = null;

      const currentPostIndex = posts.findIndex(o => o.slug == payload.slug);

      if (currentPostIndex + 1 < posts.length) {
        nextPost = posts[currentPostIndex + 1];
      }

      dispatch({
        type: 'SET_CURRENT_POST',
        payload
      });

      dispatch({
        type: 'SET_NEXT_POST',
        payload: nextPost
      });
    },
    [state.posts, dispatch]
  );

  const initApp = useCallback(
    payload => {
      const posts = payload;

      const categoriesObj = posts.reduce((result, current) => {
        current.tags.map(tag => {
          result[tag] ? (result[tag] += 1) : (result[tag] = 1);
        });

        return result;
      }, {});
      const categories = [{ name: 'all', num: posts.length }].concat(
        Object.keys(categoriesObj).map(key => ({
          name: key,
          num: categoriesObj[key]
        }))
      );

      dispatch({
        type: 'SET_CATEGORIES',
        payload: categories
      });

      dispatch({
        type: 'SET_POSTS',
        payload: posts
      });
    },
    [dispatch]
  );

  return {
    ...state,
    pageSize: PAGE_SIZE,
    setCategories,
    setCategory,
    setCurrentPost,
    initApp
  };
};
