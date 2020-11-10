const { atom, useSetRecoilState, useRecoilValue } = require('recoil');

export const appState = atom({
  key: 'appState',
  default: {
    page: 0,
    pageSize: 7,
  },
});

export const useApp = () => {
  const app = useRecoilValue(appState);

  return () => app;
};
