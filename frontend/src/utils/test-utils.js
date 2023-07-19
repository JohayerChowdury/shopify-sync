import React, { useEffect } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { RecoilRoot, useRecoilValue } from 'recoil';

import { render } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import { authAtom } from '../states';

const RecoilObserver = ({ node, onChange }) => {
  const value = useRecoilValue(node);
  useEffect(() => onChange(value), [onChange, value]);
  return null;
};

const RecoilObserverWithAuth = ({ onChange }) => {
  <RecoilObserver node={authAtom} onChange={onChange} />;
};

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return {
    ...render(ui, { wrapper: MemoryRouter, initialEntries: [route] }),
  };
};

//TODO: refactor to add RecoilRoot
// const renderWithRouterAndRecoil = (ui, { route = '/' } = {}) => {
//     window.history.pushState({}, 'Test page', route);

//     return {
//       ...render(ui, {
//         wrapper: ({ children }) => <RecoilRoot>{children}</RecoilRoot>,
//         initialEntries: [route],
//       }),
//     };
//   };

export { RecoilObserver, RecoilObserverWithAuth, renderWithRouter };
export * from '@testing-library/react';
