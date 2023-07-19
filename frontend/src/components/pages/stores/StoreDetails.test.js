import React from 'react';
import { RecoilRoot } from 'recoil';
// import { BrowserRouter } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
import { render, fireEvent, screen } from '@testing-library/react';
import {
  RecoilObserverWithAuth,
  renderWithRouter,
} from '../../../utils/test-utils';

import StoreDetails from './StoreDetails';

const testOwner = {
  _id: 'test-owner-id',
  username: 'test_user',
  full_name: 'Test User',
  email: 'test@email.com',
  stores: [],
};

const testStore = {
  _id: 'test-store-id',
  url: 'test',
  access_token: 'test',
  name: 'test',
  address: 'test',
  products: [],
};

describe('StoreDetails', () => {
  //   it('renders the titles', () => {
  //     const onChange = jest.fn();

  //     const {getByText, getByRole} = renderWithRouter(
  //         <RecoilRoot>
  //             <RecoilObserverWithAuth onChange={onChange}/>
  //         </RecoilRoot>
  //     )
  //   });

  describe('DiscardChanges', () => {
    it('renders correctly', async () => {
      const onChange = jest.fn();

      const { getByText, getByRole } = renderWithRouter(
        <RecoilRoot>
          <RecoilObserverWithAuth onChange={onChange} />
          <StoreDetails />
        </RecoilRoot>
      );
      await fireEvent.click(getByRole('button', { name: /delete/i }));
      expect(
        getByRole('heading', /are you sure you want to delete your store\?/i)
      );
      expect(
        getByText(
          /by clicking 'discard all changes', your store will be deleted\./i
        )
      );
      expect(getByRole('button', { name: /discard all changes/i }));
      expect(getByRole('button', { name: /continue editing/i }));
    });

    it('calls handleDiscard', async () => {
      const onChange = jest.fn();
      const discardHandler = jest.fn();

      const { getByText, getByRole } = renderWithRouter(
        <RecoilRoot>
          <RecoilObserverWithAuth onChange={onChange} />
          <StoreDetails handleDiscard={discardHandler} />
        </RecoilRoot>
      );

      await fireEvent.click(getByRole('button', { name: /delete/i }));
      await fireEvent.click(
        getByRole('button', { name: /discard all changes/i })
      );
      expect(discardHandler).toHaveBeenCalled();
    });
  });
});
