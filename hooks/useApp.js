import { createContext, useContext, useReducer, useMemo, useCallback } from 'react';

const AppContext = createContext();

const initState = {
  categories: [
    {
      name: 'all',
      num: 0
    }
  ],
  category: 'all'
};

const reducer = (state, { type, payload }) => {
  switch (type) {
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

export default () => {
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

  return {
    ...state,
    setCategories,
    setCategory
  };
};
