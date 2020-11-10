const { atom, useSetRecoilState, useRecoilValue } = require('recoil');

export const categoryListState = atom({
  key: 'categoryState',
  default: [],
});

export const currentCategoryState = atom({
  key: 'currentCategoryState',
  default: 'all',
});

export const useSetCurrentCategory = () => {
  const set = useSetRecoilState(currentCategoryState);

  return (category) => set(category);
};

export const useSetCategoryList = () => {
  const set = useSetRecoilState(categoryListState);

  return (categoryList) => set(categoryList);
};

export const useCategoryList = () => {
  const categoryList = useRecoilValue(categoryListState);

  return () => categoryList;
};
